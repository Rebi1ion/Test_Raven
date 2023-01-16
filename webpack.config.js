const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const globule = require("globule");
// const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const paths = globule.find(["src/*.html"]);

const optimize = () => {
	const optimizeConfig = {
		splitChunks: {				// Выносит повторяющийся код библиотек в отдельный файл
			chunks: 'all',
		},
	};

	if (isProd) {
		optimizeConfig.minimize = true;
		optimizeConfig.minimizer = [
			new CssMinimizerPlugin(),
			new TerserPlugin(),
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						// Lossless optimization with custom option
						// Feel free to experiment with options for better result for you
						plugins: [
							["gifsicle", { interlaced: true }],
							["jpegtran", { progressive: true }],
							["optipng", { optimizationLevel: 5 }],
							// Svgo configuration here https://github.com/svg/svgo#configuration
							[
								"svgo",
								{
									plugins: [
										{
											name: "preset-default",
											params: {
												overrides: {
													removeViewBox: false,
													addAttributesToSVGElement: {
														params: {
															attributes: [
																{ xmlns: "http://www.w3.org/2000/svg" },
															],
														},
													},
												},
											},
										},
									],
								},
							],
						],
					},
				},
			}),
		];
	}

	return optimizeConfig;
}

// const convertToCriticalPages = (page) => {
// 	let pageName = `${page.split(/\/|.html/).splice(-2, 1)}`;
// 	if (isProd) {
// 		return new HtmlCriticalWebpackPlugin({
// 			base: path.resolve(__dirname, 'dist'),
// 			src: `${pageName}.html`,
// 			dest: `${pageName}.html`,
// 			inline: true,
// 			minify: true,
// 			extract: false, //true для многостраничного сайта
// 			// width: 1000,
// 			// height: 1000,
// 			penthouse: {
// 				blockJSRequests: false,
// 			}
// 		});
// 	}
// 	return function () { };
// }


module.exports = {
	// context: path.resolve(__dirname, 'src'),
	entry: {
		// можно добавить несколько файлов для их получения в папке dist
		main: './src/js/index.js',
		// расскомментировать для подключения babel polyfill
		// main: ['@babel/polyfill', './js/index.js'],
		//secondary: ['@babel/polyfill', './js/second.js'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
	},
	resolve: {
		extensions: ['.js', '.json', '.scss'], // Позволяет не указывать заданные расширения файлов при импорте в js
		alias: {								// Позволяет задать алиас, для указания сокращенного пути 
			"@": path.resolve(__dirname, "./src"),
			"@styles": path.resolve(__dirname, "./src/styles"),
			"@img": path.resolve(__dirname, "./src/assets/img"),
		},
	},
	optimization: optimize(),
	devServer: {
		static: {
			directory: path.join(__dirname, 'src'),
		},
		compress: true,
		port: 4200,
		open: true,
	},
	devtool: isDev ? 'eval-cheap-module-source-map' : false, // или source-map для production
	plugins: [
		...paths.map((path) => {
			let pageName = `${path.split(/\/|.html/).splice(-2, 1)}.html`;
			return new HtmlWebpackPlugin({
				template: `./src/${pageName}`,
				filename: pageName,
			});
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets/img'),
					to: path.resolve(__dirname, 'dist/assets/img/'),
				},
				{
					from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist'),
				}
			]
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
		}),
		new ImageminWebpWebpackPlugin({
			config: [{
				test: /\.(jpe?g|png)/,
				options: {
					quality: 75
				}
			}],
			overrideExtension: true,
			detailedLogs: false,
			silent: false,
			strict: true
		}),
		// ...paths.map((item) => {
		// 	return convertToCriticalPages(item);
		// }),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{
					loader: MiniCssExtractPlugin.loader,
				}, 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/,
				use: [{
					loader: MiniCssExtractPlugin.loader,
				}, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.xml$/,
				use: ['xml-loader'],
			},
			{
				test: /\.csv$/,
				use: ['csv-loader'],
			},

			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: "asset",
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				}
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				}
			},
			{
				test: /\.(png|jpe?g|svg|gif|webp)$/,

				type: 'asset/resource',
				generator: {
					filename: 'assets/img/[name][ext]'
				}
			},
			{
				test: /\.(woff|woff2|ttf|otf|eot)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]'
				}
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				exclude: /(node_modules|bower_components)/,
			},
		],
	}
};