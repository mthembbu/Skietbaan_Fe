import {
  FETCH_NOTIFICATION,
  UPDATE_IS_READ,
  DATA_LOADING,
  FETCH_NUMBER_OF_NOTIFICATIONS
} from "../actions/types";

const initialState = {
  notificationsArray: [],
  updatedNotification: {},
  numberOfNotifications: 0,
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

    case FETCH_NUMBER_OF_NOTIFICATIONS:
      return {
        ...state,
        numberOfNotifications: action.payload
      };
    default:
      return state;
  }
}
