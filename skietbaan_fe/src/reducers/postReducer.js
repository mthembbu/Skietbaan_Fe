import { FETCH_POSTS, UPDATE_GROUPNAME,FETCH_LEADERBOARDFILTER_DATA ,FETCH_LEADERBOARDTABLE_DATA,PASS_ID,CREATEGROUP } from '../actions/types';
  FETCH_POSTS,
  NEW_POST,
  UPDATENAME,
  CREATEGROUP,
  GETGROUP,
  PASS_ID
} from "../actions/types";
import { combineReducers } from 'redux';

const initialState = {
  selectedItem: {},
  allItems: [],
  selectedItem: {},
  groupName: "",
  allGroups:[]
};

export const selectedSongReducer = (xxx=null, action) =>{
  switch(action.type){
    case UPDATENAME:
    return action.payload
    };
  return xxx;
}
export const sendId = (xxx=null, action) =>{
  switch(action.type){
    case PASS_ID:
    return action.payload
        "average": 0
	}
    };
  return xxx;
}
export const selectedGroupReducer = (id=null, action) =>{
  switch(action.type){
    case PASS_ID:
    return action.payload
    };
  return id;
}


//the function to detect the state change
export const alldatareducer =(state=initialState,action)=> {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        allItems: action.payload
      };
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
    case CREATEGROUP:
      return {
        ...state,
        selectedItem: action.payload
      };

			case PASS_ID:
			return {
				...state,
				groupId:action.payload
			};
		case FETCH_POSTS:
			return {
				...state,
				groupId:action.payload
			};
			case FETCH_LEADERBOARDFILTER_DATA:
			return {
				...state,
				leaderboardGroups: action.payload.groups1,
				leaderboardCompetitions: action.payload.competitions1
			};
		case FETCH_LEADERBOARDTABLE_DATA:
			return {
				...state,
				leaderboardTableData: action.payload.rankResults,
				leaderboardUserData: action.payload.userResults
			};
    default:
      return state;
		}
}


export default combineReducers({
  thereducer: alldatareducer,
  thename:selectedSongReducer,
  theID:sendId
});

