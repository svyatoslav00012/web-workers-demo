const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
		ignored: /node_modules/,
	},
	devServer: {
		compress: true,
		port: 3001,
		historyApiFallback: true,
		open: true,
		proxy: {
			'/api': {
				target: 'http://localhost:5000',
				// target: 'https://rdexample.scalamandra.com',
				// changeOrigin: true
			},
			'/socket.io': {
				ws: true,
				target: 'http://localhost:5000',
				// target: 'https://rdexample.scalamandra.com',
				// changeOrigin: true
			},
		},
	},
	devtool: "eval-cheap-source-map",
});
