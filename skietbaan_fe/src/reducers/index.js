import { combineReducers } from "redux";
import simpleReducer from "./simpleReducer";
import postReducer from "./postReducer";
import competition from "./createcomp.reducer";
import login from "./loginReducer";

export default combineReducers({
  posts: postReducer,
  simpleReducer,
  compOBJ: competition,
  loginState: login
});
