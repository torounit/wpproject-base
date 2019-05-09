<?php
namespace App;

class Assets {
	/**
	 * Assets constructor.
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_styles'] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_styles'] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_scripts'] );
	}

	/**
	 * styles
	 */
	public function enqueue_styles() {
		wp_enqueue_style( 'app-blocks-style', plugins_url( 'dist/main.css', __FILE__ ), false, 1 );
	}

	/**
	 * scripts
	 */
	public function enqueue_scripts() {
		$deps = [
			'wp-api-fetch',
			'wp-blocks',
			'wp-components',
			'wp-data',
			'wp-element',
			'wp-editor',
			'wp-edit-post',
			'wp-i18n',
			'wp-plugins',
		];
		wp_enqueue_script( 'app-blocks-script', plugins_url( 'dist/main.js', __FILE__ ), $deps, 1, true );
	}
}
