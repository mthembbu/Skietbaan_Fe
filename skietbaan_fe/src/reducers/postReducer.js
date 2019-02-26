import {
  FETCH_POSTS,
  NEW_POST,
  UPDATENAME,
  CREATEGROUP,
  GETGROUP,
  PASS_ID
} from "../actions/types";
import { combineReducers } from 'redux';

const initialState = {
  allItems: [],
  selectedItem: [],
  groupName: '',
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
    case CREATEGROUP:
      return {
        ...state,
        selectedItem: action.payload
      };
    case GETGROUP:
      return {
        ...state,
        allGroups: action.payload
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

