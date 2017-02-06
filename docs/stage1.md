##第一阶段

###需求

假设项目需求如下：

一个单页面应用，包含有”首页”，”信息”，”关于”三个页面。
其中，信息页面需要通过ajax请求api接口，获取数据保存到redux的store中，并显示在页面上。


###步骤一

创建项目目录，添加package.json来管理依赖包。

1.在磁盘根目录创建一个learn目录。

2.打开cmd，定位到learn目录中，执行npm init创建package.json文件(可以执行npm init –y生成一个默认选项的package.json)。


###步骤二(1)

安装依赖包。

1.安装目前必须的依赖包，其他的依赖包需要时再安装。
```
npm install react --save
npm install react-dom –save
npm install react-router –save
npm i redux –S (简写)
…

npm install webpack –save-dev
npm install webpack –save-dev
npm i babel-core –D(简写)
…
```


###步骤二(2)

安装依赖包。

1.安装到dependencies中
react, react-dom, react-router, redux, react-router-redux, react-redux

1.安装到devDependencies中
babel-core, babel-loader, babel-preset-es2015, babel-preset-react, babel-preset-stage-0, webpack

```
注：如果依赖包安装缓慢，可以使用国内镜像安装。推荐使用nrm来切换镜像，建议选择cnpm，或taobao镜像。
安装nrm(从镜像安装): npm install nrm -g --registry=http://r.cnpmjs.org/
使用方法： https://github.com/Pana/nrm
```


###步骤三(1)

创建项目源码目录。

1.按以下结构创建目录
```
├──myLearn
│  ├──image
│  ├──src
│  │  ├──actions
│  │  ├──components
│  │  ├──reducers
│  │  ├──routes
|  │  └──index.js
|  └──template.html
├──index.html
└──package.json 
```


###步骤三(2)

创建项目源码目录。

1.在myLearn/index.html中添加以下内容

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>learn</title>
  </head>
  <body>
    <div id="reactapp"></div>

    <script src="./build/js/bundle.js"></script>
  </body>
</html>
```


###步骤三(3)

创建项目源码目录。

1.在myLearn/src/js/index.js中添加以下内容

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>hello wolrd! {new Date().toLocaleString()}</div>
    );
  }
}
ReactDOM.render(<App></App>, document.getElementById('reactapp'));
```


###步骤四(1)

配置dev环境

1.在myLearn/中创建webpack.config.js并添加以下内容

```js
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/js/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
```


###步骤四(2)

配置dev环境

1.在myLearn/中创建.babelrc并添加以下内容
```
{
  "presets": ["es2015", "stage-0", "react"]
}
```

2.在myLearn/package.json的scripts项中添加以下内容
```
"scripts": {
  "build": "webpack",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```


###步骤四(3)

配置dev环境

1.打开cmd，定位到myLearn目录下，执行npm run build

2.用浏览器打开myLearn/index.html，查看效果。





