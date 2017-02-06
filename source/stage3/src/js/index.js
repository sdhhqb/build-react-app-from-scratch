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
