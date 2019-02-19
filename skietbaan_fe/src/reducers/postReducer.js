import { FETCH_POSTS, NEW_POST,FETCH_LEADERBOARDFILTER_DATA ,FETCH_LEADERBOARDTABLE_DATA } from '../actions/types';
const initialState = {
	allItems: [],
	selectedItem: {},
	leaderboardGroups:[],
	leaderboardCompetitions:[],
	leaderboardScoreTypes: [
		{ label: "Average", value: 1 },
		{ label: "TOTAL", value: 2 },
		{ label: "BEST", value: 3 }],
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
		case NEW_POST:
			return {
				...state,
				selectedItem: action.payload
			};
			case FETCH_LEADERBOARDFILTER_DATA:
		console.log("fetching filter data");
		console.log(action.payload);
			return {
				...state,
				leaderboardGroups: action.payload.groups1,
				leaderboardCompetitions: action.payload.competitions1
			};
		case FETCH_LEADERBOARDTABLE_DATA:
		console.log("fetching table data");
		console.log(action.payload);
			return {
				...state,
				leaderboardTableData: action.payload.rankResults,
				leaderboardUserData: action.payload.userResults
			};
		default:
			return state;
	}
}
