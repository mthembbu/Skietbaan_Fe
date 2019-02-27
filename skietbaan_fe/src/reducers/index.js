import { combineReducers } from 'redux';
import postReducer from './postReducer';
import competition from './createcomp.reducer';

export default combineReducers({
	groupData: postReducer,
	comps: competition
});
