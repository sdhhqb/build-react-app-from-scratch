##第二阶段

###编码(1)

模块划分

1.第一阶段完成了一个简单的hello world示例，第二阶段正式按照我们的需求开始编码。再回去看一遍需求，发现我们的导航菜单有”首页”, ”信息”, “关于”三个选项，目前分别对应三个页面。考虑到项目以后可能会扩展，我们分别把它们当成一个模块来处理。

modules：home, info, about

2.在myLearn/components目录下创建home, info, about三个目录，在每个目录中创建一个index.js。

3.在components下创建App.js文件。

###编码(2)

设置app组件和三个页面组件的内容

App.js
```jsx
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>child pages</div>
    );
  }
}
export default App;
```

home/index.js
```jsx
import React from 'react';

// home页面
class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>这里是首页页面。</div>
    );
  }
}
export default Home;
```

这两个js中的内容类似于home/index.js，需要修改注释中的home，组件名Home，以及render返回的内容
```
info/index.js
about/index.js
```

###编码(3)

在页面上展示App根组件

1.修改js/index.js为
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
  <App></App>, 
  document.getElementById('reactapp')
);
```

2.执行npm run build，刷新查看效果。

###编码(4)

配置webpack-dev-server

1.目前为止每次修改了代码都需要执行npm run build，借助webpack-dev-server，可以实现修改后自动编译。(参考：https://github.com/webpack/webpack-dev-server http://webpack.github.io/docs/webpack-dev-server.html)
```
1.1安装webpack-dev-server：npm i webpack-dev-server –D

1.2修改myLearn/package.json，在scripts中添加"dev": "webpack-dev-server --inline --history-api-fallback“

1.3修改myLearn/index.html中的script标签为：<script src="/js/bundle.js"></script>

1.4在cmd执行npm run dev，浏览器访问localhost:8080。

1.5尝试修改App.js的render方法返回的内容，浏览器会自动刷新。
```

###编码(5)

路由配置(1)

1.现在访问页面看到的是App组件的render方法返回的内容。为了显示子页面，我们可以在App.js中引入home, info, about这三个组件，然后通过state中的状态来决定在render中返回哪个组件。
但是这样对于页面多了之后管理起来很麻烦，而且不能保存书签，我们希望能够通过url的方式来导航到指定的页面，因此可以引入react-router来帮我们管理。

&emsp;&emsp;在阶段一中应该已经安装了react-router，配置参考：https://github.com/ReactTraining/react-router

2.react-router有两种配置方式，JSX和Plain Routes，建议采用Plain Routes方式，这样便于应对以后需要做按需加载的情况。

3.在src/js/routes目录中新建index.js。因为这个项目子页面比较少，暂时采用一级路由。对于页面比较多的项目，可以采用两级路由，为每个模块再建一个目录。

###编码(6)

路由配置(2)

1.在src/js/routes/index.js中添加以下内容
```jsx
import App from '../components/App';
import Home from '../components/home';
import Info from '../components/info';
import About from '../components/about';

const routes = {
  path: '/',
  component: App,
  indexRoute: {
    component: Home
  },
  childRoutes: [
    {path: '/home', component: Home},
    {path: '/info', component: Info},
    {path: '/about', component: About}
  ]
}
export default routes;
```

###编码(7)

路由配置(3)

1.修改src/js/index.js为以下内容
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

ReactDOM.render(
  <Router history={browserHistory} routes={routes}></Router>, 
  document.getElementById('reactapp')
);
```

2.执行npm run dev，访问[http://localhost:8080/info][1]查看效果

###编码(8)

添加公共header和导航按钮

1.修改src/js/App.js为以下内容
```jsx
import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="header">
          <Link activeClassName="active" to="/home">首页</Link>
          <Link activeClassName="active" to="/info">信息</Link>
          <Link activeClassName="active" to="/about">关于</Link>
        </div>
        {this.props.children}
      </div>
    )
  }
}
export default App;
```

###编码(9)

添加样式(使用sass/scss做css预处理)(1)

1.安装依赖包到devDependencies中
```
sass-loader, node-sass, style-loader, css-loader, url-loader, file-loader
```

2.配置webpack.config.js，在loaders中添加以下内容
```js
{
  test: /\.scss$/,
  loaders: ["style", "css", "sass"]
},
{
  test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'url?limit=512&&name=image/[name].[ext]?[hash]'
}
```

3.在src/js/components目录下添加style.scss文件，在src/image目录中添加一个名为logo.jpg的图片。

###编码(10)

添加样式(使用sass/scss做css预处理)(2)

1.修改src/js/components/style.scss为以下内容
```sass
html, body, div {
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
  font-family: Arial,"Microsoft YaHei","\5b8b\4f53";
  font-size: 14px;
}
.header {
  padding: 0 10px 0 60px;
  height: 40px;
  line-height: 40px;
  background: url(../../image/logo.jpg) 10px center no-repeat;
  background-size: 40px auto;
  background-color: #333;

  a {
    margin: 0 5px;
    color: #ccc;
    text-decoration: none;

    &.active {
      color: #fff;
    }
  }
}
```

###编码(11)

添加样式(使用sass/scss做css预处理)(3)

1.修改src/js/components/App.js，紧接在其他import下面，添加一行。
```js
import './style.scss';
```

2.在components目录下的home, info, about目录中各建一个style.scss文件。

3.一般来说App根组件和每个页面组件建一个style.scss就可以了。

4.重新执行npm run dev查看效果。

###编码(12)

添加页面内容

1.目前为止，我们已经可以通过url访问不同的子页面，并且已经引入了样式。但是三个页面目前都还很简陋，是时候为页面添加一些内容了。

2.添加什么内容？大家自己发挥想象吧。







[1]: http://localhost:8080/info

