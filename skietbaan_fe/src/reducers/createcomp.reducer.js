import {NEW_COMP, 
		FETCH_COMP,
		UPDATE_COMP_STATUS,
		PARTICIPANTS_PER_COMP 
	} 
	from '../actions/types';
const initialState = {
	allComps: [],
	selectedComp: {},
	updatedComp:{},
	participants:[],
	dict : {},
	isExist: false,
	
};
/** A function to detect the state change*/
export default function(state = initialState, action){
	switch(action.type)
	{
		case NEW_COMP:
			return {
				...state,
				isExist: action.payload
			};
		case FETCH_COMP:
			return {
				...state,
				allComps: action.payload
			};
		case UPDATE_COMP_STATUS:
			return{
				...state,
				updatedComp: action.payload
			}
		case PARTICIPANTS_PER_COMP:
		return{
				...state,
				dict : action.payload	
		}		
		default :
			return state;	
	}
}