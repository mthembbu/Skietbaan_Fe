

/*
 src/reducers/rootReducer.js
*/
import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import postReducer from './postReducer';
export default combineReducers({
    posts: postReducer,
 simpleReducer
});