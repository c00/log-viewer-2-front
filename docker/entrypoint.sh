#!/bin/sh
set -e

# BASE HREF STUFF #
BASE_HREF_DEFAULT=/lv2/
BASE_HREF_PLACEHOLDER=/placeholder-base-href/
BASE_HREF="${ANGULAR_BASE_HREF:-$BASE_HREF_DEFAULT}"
# Escaped for regex
BASE_HREF_PLACEHOLDER_ESC="$(echo "$BASE_HREF_PLACEHOLDER" | sed 's/[^-A-Za-z0-9_]/\\&/g')"
BASE_HREF_ESC="$(echo "$BASE_HREF" | sed 's/[^-A-Za-z0-9_]/\\&/g')"

# API URL STUFF #
API_DEFAULT=api/
API_PLACEHOLDER=lv2_api_url_placeholder
API="${ANGULAR_API_URL:-$API_DEFAULT}"
# Escaped for regex
API_ESC="$(echo "$API" | sed 's/[^-A-Za-z0-9_]/\\&/g')"

echo Log Viewer 2 - Angular App
echo Using base href: $BASE_HREF 
echo API location: $API

# Replace base href
sed -i /app/lv2/index.html -e "s/${BASE_HREF_PLACEHOLDER_ESC}/${BASE_HREF_ESC}/g"
sed -i /etc/nginx/conf.d/default.conf -e "s/${BASE_HREF_PLACEHOLDER_ESC}/${BASE_HREF_ESC}/g"

# Replace API Url
sed -i /app/lv2/main.*.js -e "s/${API_PLACEHOLDER}/${API_ESC}/g"

# Move files to new base href location.
if [ "$BASE_HREF" != "$BASE_HREF_DEFAULT" ]
then
	# WARNING: This shit will fail if base href does not end in a slash.
	
	# We should create that folder, and move all content there.
	mkdir -p "/app${BASE_HREF}"
	cp -r /app$BASE_HREF_DEFAULT* "/app${BASE_HREF}"
fi

exec "$@"