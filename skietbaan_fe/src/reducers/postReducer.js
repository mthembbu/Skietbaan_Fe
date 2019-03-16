import {
  FETCH_POSTS,
  UPDATE_GROUPNAME,
  FETCH_LEADERBOARDFILTER_DATA,
  FETCH_LEADERBOARDTABLE_DATA,
  PASS_ID,
  CREATEGROUP,
  EDITGROUPUSERS,
  ADDMEMBERS,
  FETCH_GROUPS,UPDATEARRAY
} from "../actions/types";

const initialState = {
  selectedItem: {},
  allItems: [],
  selectedItem: {},
  groupName: "",
  editGroup:[],
  groupsList:[],
  existing:[],
  leaderboardGroups: [],
  leaderboardCompetitions: [],
  groupId: "",
  groupName: "",
  leaderboardScoreTypes: [
    { label: "Average", value: 1 },
    { label: "Total", value: 2 },
    { label: "Best", value: 3 }
  ],
  leaderboardTableData: [],
  leaderboardUserData: {
    rank: 0,
    username: "N/A",
    bestScore: 0,
    total: 0,
    average: 0
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
    case FETCH_GROUPS:
    console.log("backend data ",action.payload)
      return {
        ...state,
        groupsList: action.payload
      };

    case UPDATE_GROUPNAME:
      return {
        ...state,
        groupName: action.payload
      };
    case ADDMEMBERS:
      return {
        ...state,
        existing: action.payload
      };
    case EDITGROUPUSERS:
      return {
        ...state,
        editGroup: action.payload
      };
    case UPDATEARRAY:
      return {
        ...state,
        editGroup: action.payload
      };

    case CREATEGROUP:
      return {
        ...state,
        selectedItem: action.payload
      };
    case PASS_ID:
      return {
        ...state,
        groupId: action.payload
      };
    case FETCH_POSTS:
      return {
        ...state,
        groupId: action.payload
      };
    case FETCH_GROUPS:
      return {
        ...state,
        groupsList: action.payload
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
