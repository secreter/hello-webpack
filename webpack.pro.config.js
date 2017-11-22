const webpack=require('webpack')
const merge=require('webpack-merge')
const baseConfig=require('./webpack.base.config')
// 导入非 webpack 默认自带插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Create multiple instances
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');

module.exports=merge(baseConfig,{
	module: {
	    rules: [
	      {
	        test: /\.css$/,
	        use: ExtractTextPlugin.extract({
	          fallback: "style-loader",
	          use: "css-loader"
	        })
	      },
	      {
	        test: /\.less$/,
	        use: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ])
	      },
	    ]
	},
	plugins:[
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		//提取css到单独文件
		new ExtractTextPlugin('styles.css'),
		//自动创建html模板
		new HtmlWebpackPlugin({
			template:'app/index.tpl'
		})
	]
})