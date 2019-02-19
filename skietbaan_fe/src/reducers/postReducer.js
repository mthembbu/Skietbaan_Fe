import { FETCH_POSTS, NEW_POST, GROUPNAME,UPDATENAME } from '../actions/types';
const initialState = {
	allItems: [],
	selectedItem: {}, 
	groupName:'',
	highlighted:''
};
//the function to detect the state change
export default function(state = initialState, action) {

	switch (action.type) {
		case FETCH_POSTS:
			return {
				...state,
				allItems: action.payload
			};
		case GROUPNAME:
			return {
				...state,
				groupName: action.payload
			};
		case NEW_POST:
		
			return {
				...state,
				selectedItem: action.payload
			};
		case UPDATENAME:
		
			return {
				...state,
				groupName:action.payload
			}
			
		default:
		
			return state;
	}

}
