import { combineReducers } from "redux";
import simpleReducer from "./simpleReducer";
import postReducer from "./postReducer";
import competition from "./createcomp.reducer";
import notification from "./notificationReducer";
import userProfileReducer from "./userProfileReducer";

export default combineReducers({
  posts: postReducer,
  simpleReducer,
  compOBJ: competition,
  notificationOBJ: notification,
  profile: userProfileReducer
});
