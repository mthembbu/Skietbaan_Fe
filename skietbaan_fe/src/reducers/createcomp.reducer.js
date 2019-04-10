import {NEW_COMP, 
		FETCH_COMP,
		UPDATE_COMP_STATUS,
		PARTICIPANTS_PER_COMP,
		FETCH_REQ,
		UPDATE_REQ,
		COMP_PAGE 
	} 
	from '../actions/types';
const initialState = {
	allComps: [],
	selectedComp: {},
	updatedComp:{},
	participants:[],
	dict : {},
	compSelectedPage:1,
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
		case FETCH_REQ:
		return{
				...state,
				requirements: action.payload	
		}	
		case UPDATE_REQ:
		return{
				...state,
				updated: action.payload
		}
		case COMP_PAGE:
			return {
				...state,
				compSelectedPage: action.payload
			};
		default :
			return state;	
	}
}