<?php

/**
 * Plugin Name: Block Library for Project
 */


namespace App;

require dirname( __FILE__ ) . '/block-library/class-assets.php';

/**
 * Init
 */

add_action( 'init', function() {
	new Assets();
});
