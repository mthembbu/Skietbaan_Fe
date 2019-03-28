import { FETCH_NOTIFICATION, UPDATE_IS_READ } from "../actions/types";

const initialState = {
  notificationsArray: [],
  updatedNotification: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATION:
      return {
        ...state,
        notificationsArray: action.payload
      };

    case UPDATE_IS_READ:
      return {
        ...state,
        updatedNotification: action.payload
      };
    default:
      return state;
  }
}
