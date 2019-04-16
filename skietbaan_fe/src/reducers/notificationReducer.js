import {
  FETCH_NOTIFICATION,
  UPDATE_IS_READ,
  DATA_LOADING
} from "../actions/types";

const initialState = {
  notificationsArray: [],
  updatedNotification: {},
  loading: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATION:
      return {
        ...state,
        notificationsArray: action.payload,
        loading: true
      };

    case UPDATE_IS_READ:
      return {
        ...state,
        updatedNotification: action.payload
      };

    case DATA_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
