#!/usr/bin/env bash

#
# Variables
#
WP_VERSION="latest"
WP_THEME="twentyseventeen"
WP_PORT=80

ROOT=$(cd $(dirname $0);cd ../;pwd)
ENV=${ROOT}/.env

# override variables.
eval "$(cat ${ENV} <(echo) <(declare -x))"

TARGET=${1-staging}
STAGING_HOST="www-bacardijapan-jp-staging.bacardistaging.com"
PRODUCTION_HOST="www.bacardijapan.jp"
HOST=${STAGING_HOST}

if [ ${TARGET} = production ]; then
	HOST=${PRODUCTION_HOST}
fi

if [ ${WP_PORT} = 80 ]; then
	LOCAL="localhost"
else
	LOCAL="localhost:$WP_PORT"
fi

wp search-replace "http://$LOCAL" "https://$HOST" --quiet
wp search-replace "$LOCAL" "$HOST" --quiet
wp db export /home/www-data/app/${TARGET}.sql
wp search-replace "https://$HOST" "http://$LOCAL" --quiet
wp search-replace "$HOST" "$LOCAL" --quiet
