#!/bin/bash

#
# Variables
#
WP_VERSION="latest"
WP_THEME="twentynineteen"
WP_ADMIN_USER="admin"
WP_ADMIN_PASS="admin"
WP_PORT=80

ROOT=$(cd $(dirname $0);cd ../;pwd)
ENV=${ROOT}/.env

# override variables.
eval "$(cat ${ENV} <(echo) <(declare -x))"

sleep 10

#
# Install WordPress
#
if ! $(wp core is-installed); then

	if [[ ${WP_PORT} = 80 ]]; then
		wp core install --url="http://localhost" --title="WordPress Dev" --admin_user="$WP_ADMIN_USER" --admin_password="$WP_ADMIN_PASS" --admin_email="admin@example.com" --path="/var/www/html"
	else
		wp core install --url="http://localhost:$WP_PORT" --title="WordPress Dev" --admin_user="$WP_ADMIN_USER" --admin_password="$WP_ADMIN_PASS" --admin_email="admin@example.com" --path="/var/www/html"
	fi




	wp config set WP_DEBUG true --raw --type=constant
	wp config set JETPACK_DEV_DEBUG true --raw --type=constant
	#wp config set SCRIPT_DEBUG true --raw --type=constant

	wp rewrite structure "/archive/%post_id%/"

	#wp core update --version=${WP_VERSION} --locale=ja

	#
	# Localize.
	#
	wp language core install ja
	wp language core activate ja
	wp language core update
	wp option update timezone_string 'Asia/Tokyo'

	#
	# Remove Bundled Plugin.
	#
	wp plugin uninstall akismet
	wp plugin uninstall hello

	wp plugin activate --all
	wp theme activate ${WP_THEME}

	#curl https://raw.githubusercontent.com/jawordpressorg/theme-test-data-ja/master/wordpress-theme-test-date-ja.xml > /tmp/wordpress-theme-test-date-ja.xml
#	wp import /tmp/wordpress-theme-test-date-ja.xml --authors=create  --quiet
#
#	#wp option update posts_per_page 5
#	#wp option update page_comments 1
#	#wp option update comments_per_page 5
#	wp option update show_on_front page
#	wp option update page_on_front 701
#	wp option update page_for_posts 703


fi

