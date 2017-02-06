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