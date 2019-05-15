import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "skietbaan",
  storage: storage,
  blacklist: ["compOBJ"]
};

const pReducer = persistReducer(persistConfig, rootReducer);
const initialState = {};
const middleware = [thunk];
export const store = createStore(
  pReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);