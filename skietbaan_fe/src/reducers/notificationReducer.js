import { FETCH_NOTIFICATION } from "../actions/types";

const initialState = {
	notificationsArray: []
};
export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_NOTIFICATION:
			return {
				...state,
				notificationsArray: action.payload
			};
		default:
			return state;
	}
}
