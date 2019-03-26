import {
  FETCH_POSTS,
  UPDATE_GROUPNAME,
  FETCH_LEADERBOARDFILTER_DATA,
  FETCH_LEADERBOARDTABLE_DATA,
  PASS_ID,
  CREATEGROUP,
  PAGE,
  EMPTY,
  NEWGROUPSTATE,
  EDITGROUPUSERS,
  UPDATE_SELECTED_COMPETITION,
  UPDATE_SELECTED_GROUP,
  GROUPDICT,
  ADDMEMBERS,
  FETCH_GROUPS
} from "../actions/types";

const initialState = {
  selectedItem: {},
  leaderboardSelectedCompetitionName: [],
  selectedItem: {},
  groupDict:{},
 upName: "",
  editGroup:[],
  groupsList:[],
  page:"",
  existing:[],
  leaderboardGroups: [],
  leaderboardCompetitions: [],
  leaderboardSelectedCompetitionName:"",
  leaderboardSelectedGroupName:"",
  leaderboardTableData: [],
  leaderboardUserData: {
    rank: 0,
    username: "N/A",
    bestScore: 0,
    total: 0,
    average: 0
  },
  groupId: "",
  groupName: "",
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
      return {
        ...state,
        groupsList: action.payload
      };
  
    case GROUPDICT:
      return {
        ...state,
        groupDict: action.payload
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
    case NEWGROUPSTATE:
      return {
        ...state,
        groupsList: action.payload
      };

    case EDITGROUPUSERS:
      return {
        ...state,
        editGroup: action.payload
      };
    case EMPTY:
      return {
        ...state,
        editGroup:action.payload
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
    case PAGE:
      return {
        ...state,
        page: action.payload
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
    case UPDATE_SELECTED_COMPETITION:
      return {
        ...state,
        leaderboardSelectedCompetitionName: action.payload
      };
    case UPDATE_SELECTED_GROUP:
      return {
        ...state,
        leaderboardSelectedGroupName: action.payload
      };
      
    default:
      return state;
  }
}