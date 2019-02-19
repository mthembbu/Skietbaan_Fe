import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import postReducer from './postReducer';
import competition from './createcomp.reducer';
export default combineReducers({
	groupData: postReducer,
	simpleReducer,
	comps: competition
});
