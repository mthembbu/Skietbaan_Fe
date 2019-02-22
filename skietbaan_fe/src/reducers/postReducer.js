
import { FETCH_POSTS, NEW_POST, UPDATE_GROUPNAME,CREATEGROUP,FETCH_LEADERBOARDFILTER_DATA ,FETCH_LEADERBOARDTABLE_DATA } from "../actions/types";
const initialState = {
  allItems: [],
  selectedItem: {},
  groupName: "",
	leaderboardGroups:[],
	leaderboardCompetitions:[],
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
    default:
      return state;
  }
//the function to detect the state change
export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_POSTS:
			return {
				...state,
				allItems: action.payload
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
