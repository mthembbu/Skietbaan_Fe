import { FETCH_POSTS, NEW_POST, UPDATE_GROUPNAME } from '../actions/types';
const initialState = {
	allItems: [],
	selectedItem: {},
	groupName: "",
};
//the function to detect the state change
export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_POSTS:
			return {
				...state,
				allItems: action.payload
			};
		case UPDATE_GROUPNAME:
			return {
				...state,
				groupName: action.payload
			};
		case NEW_POST:
			return {
				...state,
				selectedItem: action.payload
			};
		default:
			return state;
	}
}
