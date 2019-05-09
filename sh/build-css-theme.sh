#!/bin/bash

#
# Variables
#
WP_VERSION="latest"
WP_THEME="twentynineteen"


ROOT=$(cd $(dirname $0);cd ../;pwd)
ENV=${ROOT}/.env

# override variables.
eval "$(cat ${ENV} <(echo) <(declare -x))"

if [ -d ./htdocs/wp-content/themes/${WP_THEME}/src/css ]; then
	node_modules/.bin/postcss ./htdocs/wp-content/themes/${WP_THEME}/src/css/[^_]*.css --dir ./htdocs/wp-content/themes/${WP_THEME}/dist/css --verbose
fi


