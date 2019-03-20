import { combineReducers } from "redux";
import simpleReducer from "./simpleReducer";
import postReducer from "./postReducer";
import competition from "./createcomp.reducer";

export default combineReducers({
	posts: postReducer,
	simpleReducer,
	compOBJ: competition
});
