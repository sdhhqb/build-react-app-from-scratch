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