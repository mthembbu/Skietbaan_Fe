import {
  FETCH_NOTIFICATION,
  UPDATE_IS_READ,
  DATA_LOADING,
  FETCH_NUMBER_OF_NOTIFICATIONS,
  USER_LOGS,
  USER_LOS,
  DOCCIE_SENT
} from "../actions/types";

const initialState = {
  notificationsArray: [],
  doccieSent: false,
  userLOGS: false,
  userLOS: false,
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
    
    case USER_LOGS:
      return {
        ...state,
        userLOGS: action.payload
      };
    
    case USER_LOS:
      return {
        ...state,
        userLOS: action.payload
      };
    
    case DOCCIE_SENT:
      return {
        ...state,
        doccieSent: action.payload
      };
    
    default:
      return state;
  }
}
