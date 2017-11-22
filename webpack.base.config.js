const webpack=require('webpack')


module.exports={
	devtool: 'eval-source-map',                  //配置生成Source Maps，选择合适的选项
	entry:{
		filename:__dirname+"/app/main.js"        //入口文件
	},
	output:{
		path:__dirname+"/public",                //输出位置
		filename:"bundle.js"
	},
	module:{
		noParse: /jquery|lodash/,               //防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。
		//每个规则可以分为三部分 - 条件(condition)，结果(result)和嵌套规则(nested rule)。
		//条件有两种输入值:resource：请求文件的绝对路径。2.issuer: 被请求资源(requested the resource)的模块文件的绝对路径。
		//在规则中，属性 test, include, exclude 和 resource 对 resource 匹配，并且属性 issuer 对 issuer 匹配。
		rules:[
			//数组元素是一个rule对象
			{
				test:/\.json$/,
				use:[
					//元素是一个UseEntry
					{
					    loader:'json-loader',     //必须
					    options: {                //可选
					      
					    }
				    },
				]
			},
			{
				test:/\.js$/,
				exclude: /node_modules/,
				use:[
					{
						loader:'babel-loader',
						// 可以提取出来放在.babelrc 文件里
						options:{                    //历史别名query ，值可以传递到 loader 中，将其理解为 loader 选项。
							presets:['es2015','react']
						}
					}
				]
			},
			
		],
	},
	plugins:[
		// 构建优化插件
	    new webpack.optimize.CommonsChunkPlugin({
		  name: "commons",
		  // (the commons chunk name)

		  filename: "commons.js",
		  // (the filename of the commons chunk)

		  // minChunks: 3,
		  // (Modules must be shared between 3 entries)

		  // chunks: ["pageA", "pageB"],
		  // (Only use these entries)
		}),
		
  ]
}