import {NEW_COMP, FETCH_COMP, UPDATE_COMP_STATUS} from '../actions/types';
const initialState = {
	allComps: [],
	selectedComp: {},
	updatedComp:{}
};
/** A function to detect the state change*/
export default function(state = initialState, action){
	switch(action.type)
	{
		case NEW_COMP:
			return {
				...state,
				selectedComp: action.payload
			};
		case FETCH_COMP:
			return {
				...state,
				allComps: action.payload
			};
		case UPDATE_COMP_STATUS:
			return{
				...state,
				allComps: action.payload
			}	
		default :
			return state;	
	}
}