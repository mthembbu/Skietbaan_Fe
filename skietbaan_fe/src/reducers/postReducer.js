import { FETCH_POSTS,CREATEGROUP,PASS_ID,GETGROUP,NEW_POST,UPDATENAME, UPDATE_GROUPNAME,FETCH_LEADERBOARDFILTER_DATA ,FETCH_LEADERBOARDTABLE_DATA,PASS_ID,CREATEGROUP } from '../actions/types';


import { combineReducers } from 'redux';

const initialState = {
  selectedItem: {},
  allItems: [],
  selectedItem: {},
  groupName: "",
  allGroups:[]
};

export const thenameofthegroup = (xxx=null, action) =>{
  switch(action.type){
    case UPDATENAME:
    return action.payload
    };
  return xxx;
  }

//the function to detect the state change
export const sendId = (id=null, action) =>{
  switch(action.type){
    case PASS_ID:
    return action.payload
    };
  return id;
}
export const alldatareducer = (state=initialState,action) =>  {
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
  thename:thenameofthegroup,
  theID:sendId
});

