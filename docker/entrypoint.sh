#!/bin/sh
set -e

# BASE HREF STUFF #
BASE_HREF_DEFAULT=/lv2/
BASE_HREF_PLACEHOLDER=/placeholder-base-href/
BASE_HREF="${ANGULAR_BASE_HREF:-$BASE_HREF_DEFAULT}"

# API URL STUFF #
API_DEFAULT=api/
API_PLACEHOLDER=lv2_api_url_placeholder
API="${ANGULAR_API_URL:-$API_DEFAULT}"

# Php FPM Upstream
PHP_HOST_DEFAULT="php-upstream-name"
PHP_HOST="${ANGULAR_PHP_HOST:-$PHP_HOST_DEFAULT}"

# Function to replace text in files.
replace() 
{
	# Takes 'filename', 'search_for', 'replace_with'
	ESC2="$(echo "$2" | sed 's/[^-A-Za-z0-9_]/\\&/g')"
	ESC3="$(echo "$3" | sed 's/[^-A-Za-z0-9_]/\\&/g')"
	sed -i $1 -e "s/${ESC2}/${ESC3}/g"
}

echo Log Viewer 2 - Angular App
echo Using base href: $BASE_HREF 
echo API location: $API
echo PHP FPM host: $PHP_HOST

# Replace base href
replace /app/lv2/index.html $BASE_HREF_PLACEHOLDER $BASE_HREF
replace /etc/nginx/conf.d/default.conf $BASE_HREF_PLACEHOLDER $BASE_HREF
# Replace upstream
replace /etc/nginx/conf.d/default.conf $PHP_HOST_DEFAULT $PHP_HOST
# Replace API Url
replace /app/lv2/main.*.js $API_PLACEHOLDER $API


# Move files to new base href location.
if [ "$BASE_HREF" != "$BASE_HREF_DEFAULT" ]
then
	# WARNING: This shit will fail if base href does not end in a slash.
	
	# We should create that folder, and move all content there.
	mkdir -p "/app${BASE_HREF}"
	cp -r /app$BASE_HREF_DEFAULT* "/app${BASE_HREF}"
fi

exec "$@"