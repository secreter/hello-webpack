const webpack=require('webpack')
const merge=require('webpack-merge')                   //merge config
const baseConfig=require('./webpack.base.config')
const path=require('path')
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports=merge.strategy({
	plugins:'append',                   //merge 策略，plugins是数组，不能替换
})(baseConfig,{
	module: {
	    rules: [
	      {
	        test: /\.css$/,
	        use: [ 'style-loader','css-loader' ]
	      },
	      {
	        test: /\.less$/,
	        use: [ 'style-loader','css-loader', 'less-loader' ]
	      },
	    ]
	},
	plugins:[
		// 定义全局变量插件
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}),
		// webpack-dev-server 强化插件,显示更加cool，win10才行
  		new DashboardPlugin(),
	],
	//webpack服务器
    devServer: {
        historyApiFallback: true,    //不跳转
        inline: true,                //实时刷新,
        disableHostCheck: true,      //禁止同源检查
        port: 9000,                  //端口
        publicPath: '/assets/',      //此路径下的打包文件可在浏览器中访问。存放静态资源
        contentBase: path.join(__dirname, "public"),
        // proxy: {                     //代理
        //     "*": {
        //         target : 'http://localhost:3001',
        //         bypass: function(req, res, proxyOptions) {
        //         	//满足条件的转发
        //             if(/^\/public\//.test(req.url)){
        //                 return req.url;
        //             }
        //         }
        //     }
        // }
    }
})

