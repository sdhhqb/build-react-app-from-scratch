##第三阶段

###编码(13)

引入redux

1.在上一个阶段中完成了几个页面，这个阶段来介绍一下redux和react结合使用。会演示在信息页面通过请求api接口获取数据并显示在页面上。

2.建议先阅读一些react，redux相关文档，以及flux结构相关内容。
https://facebook.github.io/react/tutorial/tutorial.html
http://redux.js.org/
https://github.com/facebook/flux

###编码(14)

引入redux

1.安装依赖包
```
安装redux, react-redux, redux-thunk, redux-logger, react-router-redux, isomorphic-fetch到dependencies中。
```

2.创建action文件,在js/actions/info目录下创建actions.js和actiontypes.js文件。

###编码(15)

添加action

1.在actions.js中添加以下内容
```js
import * as ActionTypes from './actionTypes';
import fetch from 'isomorphic-fetch';
// 获取天气预报数据
export function getForecast(city) {
  return function(dispatch) {
    var url = 'https://free-api.heweather.com/v5/forecast?key=0874df2ce3104c3b99a282986da43c83&city='+city;
    fetch(url, {method: 'get'}).then(function (response) {
      return response.json();
    }).then(function (json) {
      dispatch({
        type: ActionTypes.INFO_GET_FORECAST,
        status: 200,
        data: json
      });
    }).catch(function (err) {
      console.log(err);
    });
  }
}
```

###编码(16)

添加action

1.在actiontypes.js中添加以下内容
```js
export const INFO_GET_FORECAST = 'INFO_GET_FORECAST';

```

###编码(17)

添加reducer

1.在js/reducers目录中创建index.js和js/info/index.js文件

2.在js/reducers/info/index.js文件中添加以下内容
```jsx
import * as ActionTypes from '../../actions/info/actionTypes';

var initialState = {
  desc: 'info',
  // 天气数据
  wData: null
};
export default function(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.INFO_GET_FORECAST:
      return Object.assign({}, state, {wData: action.data.HeWeather5});

    default:
      return state;
  }
}
```

###编码(18)

添加reducer

1.在js/reducers/index.js文件中添加以下内容
```jsx
import { combineReducers } from 'redux';
import info from './info';

// 合并各模块的reducer
var appReducer = combineReducers({
    info
});

export default appReducer;
```

2.修改js/index.js为以下内容
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';
import configStore from './configStore';
var store = configStore();

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes}></Router>
	</Provider>,
  document.getElementById('reactapp')
);
```

###编码(19)

连接到redux store

1.修改js/components/info/index.js，在顶部增加引入
```jsx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/info/actions';
```

2.在底部增加以下内容
```jsx
// 映射state到props
const mapStateToProps = (state, ownProps) => {
  return {
    info: state.app.info
  }
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
  var boundActionCreators = bindActionCreators(actions, dispatch);
  return {
    actions: boundActionCreators
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
```

###编码(20)

显示接口返回内容

1.修改js/components/info/index.js,在componentDidMount中调用action方法
```jsx
  componentDidMount() {
    console.log('get forecast data');
    this.props.actions.getForecast("chengdu");
  }
```

2.修改render
```jsx
render() {
    var info = this.props.info;
    var wData = info.wData && info.wData[0] || null;
    var infoList = [];

    if (!wData) {
      return (
        <div>这里是信息页面。</div>
      );
    }

    return (
      <div>
        <div>这里是信息页面。</div>
        <p>更新时间：{wData.basic.update.loc}</p>
        <p>城市：{wData.basic.city}</p>
        <p>白天：{wData.daily_forecast[0].cond.txt_d}</p>
        <p>夜间：{wData.daily_forecast[0].cond.txt_n}</p>
        <p>温度：{wData.daily_forecast[0].tmp.min} 到 {wData.daily_forecast[0].tmp.max} ℃</p>
        <p>---</p>
        <p>明天：{wData.daily_forecast[1].cond.txt_d} {wData.daily_forecast[1].tmp.min} 到 {wData.daily_forecast[1].tmp.max} ℃</p>
      </div>
    );
  }
```

###编码(21)

显示接口返回内容

1.现在信息页面应该可以显示城市的天气信息了，可以通过开发者工具中的react扩展和redux扩展查看组件中的数据，以及接口请求时触发的action。

2.关于免费天气接口的文档可以查看
[http://www.heweather.com/][1]，可以尝试修改为可以查看指定城市的天气情况，以及显示更多天气内容



[1]: http://www.heweather.com/
