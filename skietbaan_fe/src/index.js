import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { createStore} from 'redux';
import reducers from './reducers/postReducer'
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';


/**
 * The Provider is the Applications new ROOT-COMPONENT, that houses all of the 
 * JS objects from the rootReducer through the store from the './store file'
 */

const initialState={};
const middleware=[thunk];
ReactDOM.render(
	 <Provider store={createStore(reducers,  initialState,
		compose(
		applyMiddleware(...middleware)))}>
		<App />
	 </Provider>
	,
	document.getElementById('root')
);
serviceWorker.register();
