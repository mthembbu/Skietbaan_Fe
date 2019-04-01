import {NEW_COMP, 
		FETCH_COMP,
		UPDATE_COMP_STATUS,
		PARTICIPANTS_PER_COMP,
		FETCH_REQ,
		UPDATE_REQ 
	} 
	from '../actions/types';
const initialState = {
	allComps: [],
	selectedComp: {},
	updatedComp:{},
	participants:[],
	dict : {},
	requirements:[{id: '',"competition": null,standard: "",accuracy: '',total: ''},
					{id: '',"competition": null,standard: "",accuracy: '',total: ''},
					{id: '',"competition": null,standard: "",accuracy: '',total: ''}
				],
	updated: false,
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
		default :
			return state;	
	}
}