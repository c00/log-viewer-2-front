#!/bin/bash
### A SIMPLE DEPLOYMENT SCRIPT FOR ANGULAR 5+ 
# 
# Author: Co van Leeuwen (github.com/c00)
# Version: 1.2
#
# This script builds an angular project locally and then copies
# the output to a remote over SSH.
#
# It uses symlinks to update the current release. 
# NOTE: It does not delete old releases.

### VARIABLES / DEFAULTS ###
# The remote SSH server to connect to. Can be an alias if so defined in your ~/.ssh/config
REMOTE=bessy
# The remote path to create the release in (The release will have its own directory in here)
REMOTE_PATH=/var/www/bessy/log-viewer-2

#Don't touch anything below here
SKIP_BUILD=
NEW=$(date +"%Y%m%d-%H%M%S")

while getopts "r:p:e:b:s" opt; do
    case $opt in
    r) REMOTE=$OPTARG ;; 
	  p) REMOTE_PATH=$OPTARG ;;
    s) SKIP_BUILD=1 ;;
    ?) echo "Parameter error."; exit ;;
    esac
done

if [ -z "$SKIP_BUILD" ]
then
    echo "Making dist"
    node dist || { echo 'Creating "dist" failed.' ; exit 1; }
else
    echo "Skipping local build..."
fi

# Zip files first for quicker transfer
if [ -f "dist/.build.zip" ]; then
   echo "Removing old zip file..."
   rm dist/.build.zip
fi
echo Compressing files...
cd dist && zip -r .build.zip * . >/dev/null && cd .. || { echo 'Compressing files failed.' ; exit 1; }

echo Deploying to $REMOTE in $REMOTE_PATH...
# Create remote dir
ssh $REMOTE "mkdir $REMOTE_PATH/$NEW" || { echo 'Create remote dir failed.' ; exit 1; }

# Copy archive
scp dist/.build.zip $REMOTE:$REMOTE_PATH/$NEW || { echo 'SCP deploy failed.' ; exit 1; }

# Unpack remotely and remove zip file.
ssh $REMOTE "cd $REMOTE_PATH/$NEW && unzip .build.zip >/dev/null && rm .build.zip" || { echo 'Decompressing files failed.' ; exit 1; }

# symlink settings file
ssh $REMOTE "cd $REMOTE_PATH/$NEW && ln -s $REMOTE_PATH/settings.json settings.json" || { echo 'Creating symlink failed.' ; exit 1; }

# Create symlink
ssh $REMOTE "cd $REMOTE_PATH && touch current && rm current && ln -s $NEW current" || { echo 'Creating symlink failed.' ; exit 1; }

# Remove local zip file.
rm dist/.build.zip >/dev/null

echo "Deployment complete!"
