import { FETCH_POSTS, NEW_POST,FETCH_LEADERBOARDFILTER_DATA ,FETCH_LEADERBOARDTABLE_DATA,PASS_ID,UPDATENAME } from '../actions/types';
const initialState = {
  selectedItem: {},
  allItems: [],
  selectedItem: {},
  groupName: "",
	leaderboardGroups:[],
	leaderboardCompetitions:[],
	groupId:0,
	groupName:"",
	leaderboardScoreTypes: [
		{ label: "Average", value: 1 },
		{ label: "Total", value: 2 },
		{ label: "Best", value: 3 }],
	leaderboardTableData:[],
	leaderboardUserData:{
		"rank": 0,
        "username": "N/A",
        "bestScore": 0,
        "total": 0,
        "average": 0
	}
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
    case CREATEGROUP:
      return {
        ...state,
        selectedItem: action.payload
      };
      return {
        ...state,
      };

		case PASS_ID:
    default:
      return state;
  }
	switch (action.type) {
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


