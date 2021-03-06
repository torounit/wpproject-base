require( 'dotenv' ).config();
const port = process.env.WP_PORT;
const theme = process.env.WP_THEME;
module.exports = {
	proxy: `localhost:${ port }`,
	files: [
		'./htdocs/wp-content/mu-plugins/block-library/dist/**/*.*',
		`./htdocs/wp-content/themes/${ theme }/dist/**/*.*`,
		`./htdocs/wp-content/themes/${ theme }/**/*.{jpg,jpeg,gif,png,svg,php}`,
	],
};
