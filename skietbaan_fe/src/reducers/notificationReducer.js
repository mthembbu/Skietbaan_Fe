import {
  FETCH_NOTIFICATION,
  UPDATE_IS_READ,
  DATA_LOADING,
  FETCH_NUMBER_OF_NOTIFICATIONS,
  USER_LOGS,
  USER_LOS,
  DOCCIE_SENT,
  IS_CLICKED,
  EXPIRED_IS_CLICKED,
  MEMBER_IS_CLICKED,
  USER_IS_CLICKED,
  EXPORT_CSV,
  TEXT_S,
  ADD_FILTER_NAME
} from "../actions/types";

const initialState = {
  notificationsArray: [],
  filterData: [],
  filterName: [],
  isClicked: false,
  expiredIsClicked: false,
  userIsClicked: false,
  memberIsClicked: false,
  doccieSent: false,
  userLOGS: false,
  userLOS: false,
  updatedNotification: {},
  numberOfNotifications: 0,
  loading: null,
  writtenText:""
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
    
    case IS_CLICKED:
      return {
        ...state,
        isClicked: !state.isClicked,
        userIsClicked: false,
        memberIsClicked: false,
        expiredIsClicked: false
      };
    
    case EXPIRED_IS_CLICKED:
      return {
        ...state,
        expiredIsClicked: !state.expiredIsClicked
      };
    
    case TEXT_S:
      return {
        ...state,
        writtenText: action.payload
      };
    
    case MEMBER_IS_CLICKED:
      return {
        ...state,
        memberIsClicked: !state.memberIsClicked
      };
    
    case USER_IS_CLICKED:
      return {
        ...state,
        userIsClicked: !state.userIsClicked
      };
    
    case EXPORT_CSV:
      return {
        ...state,
        filterData: action.payload,
        isClicked: !state.isClicked,
        userIsClicked: !state.userIsClicked,
        memberIsClicked: !state.memberIsClicked,
        expiredIsClicked: !state.expiredIsClicked
      };  

      case ADD_FILTER_NAME:
      return {
        ...state,
        filterName: action.payload
      };  
    
    
    default:
      return state;
  }
}
