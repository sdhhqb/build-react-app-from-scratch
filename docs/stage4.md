##第四阶段

###打包(1)

关于打包的配置

1.react项目一般采用前后端分离的方式来开发，前端负责页面展示，后端负责提供api接口。当项目发布时，需要将前端的源代码进行打包，交给后端的同事部署到服务器上去。

2.第四阶段简单介绍一下关于项目打包的内容，实际开发项目时还有更多细节的地方需要考虑的，可以多参考文档和网上的教程。

###打包(2)

安装依赖包

1.安装以下依赖包
```
npm i extract-text-webpack-plugin -D
npm i html-webpack-plugin –D
npm i cross-env –D
```

2.在myLearn目录总创建打包时的配置文件webpack.prod.config.js

3.修改package.json的scripts字段中的build项为
```js
"build": "cross-env NODE_ENV=production webpack --config webpack.prod.config.js"
```

###打包(3)

webpack.prod.config.js参考配置，更多内容参考webpack文档和网上相关教程

```js
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: {
    app: "./src/js/index.js",
    vendor: ['react', 'react-dom', 'react-router', 'react-router-redux', 'react-redux', 'redux']
  },

  output: {
    path: './build/',
    filename: 'js/[hash].[name].js',
    publicPath: '/',
    chunkFilename: "js/[id].[hash].bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          [
            'css?sourceMap=true',
            'sass?sourceMap=true'
          ]
        )
      },

      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=512&name=image/[name].[ext]?[hash]'
      }
    ]
  },

  plugins: [
    // react、react-router、redux等单独打包到vendor包里面
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor"],
      minChunks: Infinity
    }),

    // 将代码中的process.env.NODE_ENV替换为production，方便webpack压缩代码
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),

    // 压缩js代码
    new webpack.optimize.UglifyJsPlugin(),

    // 提取css
    new ExtractTextPlugin('app.css'),

    // 更新index.html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/template.html',
      inject: 'body'
    })
  ],

  devtool: "source-map"
};

var env = process.env.NODE_ENV;
console.log("node env: \x1b[32m" + env + "\x1b[0m");

module.exports = config;
```

###打包(4)

打包

1.在myLearn目录下执行npm run build

2.打包完成，查看build目录中的内容

###打包(5)

本地服务器简单测试打包的代码

1.安装依赖包
```
npm i express
```

2.在myLearn目录下创建localserver.js，添加以下内容
```js
var express = require('express');
var path = require('path');
var app = express();
var port = 8082;

// 加载静态文件
app.use(express.static('./build'));

// 带路由地址刷新，返回index.html
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});
app.listen(port, function () {
  console.log('serve path, '+ __dirname);
  console.log("app listening on port \x1b[32m"+port+"\x1b[0m");
});
```

3.执行node localserver，访问localhost:8082查看，注意引入资源的文件名，以及css和js的source-map。

##总结

至此，我们完整的演示了怎样从零开始构建一个react的项目，如果需要深入的了解，请参考相关文档和教程。
