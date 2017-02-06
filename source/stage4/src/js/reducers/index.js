import { combineReducers } from 'redux';
import info from './info';

// 合并各模块的reducer
var appReducer = combineReducers({
	info
});

export default appReducer;