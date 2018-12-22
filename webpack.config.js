require( 'dotenv' ).config();
const nodeEnv = process.env.NODE_ENV;
const theme = process.env.WP_THEME;

const mode = nodeEnv ? nodeEnv : 'development';

function camelCaseDash( string ) {
	return string.replace(
		/-([a-z])/g,
		( match, letter ) => letter.toUpperCase()
	);
}

const gutenbergPackages = [
	'a11y',
	'annotations',
	'api-fetch',
	'autop',
	'blob',
	'block-library',
	'block-serialization-default-parser',
	'block-serialization-spec-parser',
	'blocks',
	'components',
	'compose',
	'core-data',
	'data',
	'date',
	'deprecated',
	'dom',
	'dom-ready',
	'edit-post',
	'editor',
	'element',
	'escape-html',
	'format-library',
	'hooks',
	'html-entities',
	'i18n',
	'is-shallow-equal',
	'keycodes',
	'list-reusable-blocks',
	'notices',
	'nux',
	'plugins',
	'redux-routine',
	'rich-text',
	'shortcode',
	'token-list',
	'url',
	'viewport',
	'wordcount',
];

const externals = {
	react: 'React',
	'react-dom': 'ReactDOM',
	tinymce: 'tinymce',
	moment: 'moment',
	jquery: 'jQuery',
	lodash: 'lodash',
	'lodash-es': 'lodash',
};

gutenbergPackages.forEach( ( name ) => {
	externals[ `@wordpress/${ name }` ] = {
		window: [ 'wp', camelCaseDash( name ) ],
	};
} );

const enableSouceMap = mode === 'development' ? 'source-map' : false;
//const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const config = {
	mode: mode,
	module: {
		rules: [
			// {
			// 	test: /\.css$/,
			// 	use: [
			// 		{ loader: MiniCssExtractPlugin.loader, options: { sourceMap: !! enableSouceMap } },
			// 		{ loader: 'css-loader', options: { sourceMap: !! enableSouceMap } },
			// 		{ loader: 'postcss-loader', options: { sourceMap: !! enableSouceMap } },
			// 	],
			// },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	// plugins: [
	// 	new MiniCssExtractPlugin( {
	// 		filename: 'main.css',
	// 	} ),
	// ],
	devtool: enableSouceMap,
	externals,
	resolve: {
		extensions: [ '.js', '.jsx' ],
	},
	performance: { hints: false },
};

module.exports = [
	{
		...config,
		...{
			entry: {
				main: [ './htdocs/wp-content/mu-plugins/age-gate/src/index.js' ],
			},
			output: {
				library: [ 'wp', '[name]' ],
				libraryTarget: 'window',
				path: __dirname + '/htdocs/wp-content/mu-plugins/age-gate/dist',
				publicPath: '/wp-content/mu-plugins/age-gate/dist/',
			},
		},
	},
	{
		...config,
		...{
			entry: {
				main: [ './htdocs/wp-content/mu-plugins/blocks/src/index.js' ],
			},
			output: {
				library: [ 'wp', '[name]' ],
				libraryTarget: 'window',
				path: __dirname + '/htdocs/wp-content/mu-plugins/blocks/dist',
				publicPath: '/wp-content/mu-plugins/blocks/dist/',
			},
		},
	},
	{
		...config,
		...{
			entry: {
				main: [ `./htdocs/wp-content/themes/${ theme }/src/js/index.js` ],
			},
			output: {
				library: [ 'wp', '[name]' ],
				libraryTarget: 'window',
				path: __dirname + `/htdocs/wp-content/themes/${ theme }/dist/js`,
				publicPath: `/wp-content/themes/${ theme }/dist/js/`,
			},

		},
	},
];

