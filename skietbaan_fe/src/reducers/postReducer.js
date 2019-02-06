import { FETCH_POSTS, NEW_POST } from '../actions/types';

const initialState = {
    allItems: [],
    selectedItem: {}
}
//the function to detect the state change
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                allItems: action.payload
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