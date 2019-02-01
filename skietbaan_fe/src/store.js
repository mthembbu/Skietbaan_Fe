

/*
 * src/store.js
 * With initialState
*/
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
/*import {composeWithDevTools} from 'redux-devtools-extension';
import { builtinModules } from 'module';*/

//const composeEnhancers = composeWithDevTools({});

//const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)
  // other store enhancers if any
  //));

export default function configureStore(initialState={}) {
 return createStore(
   rootReducer,
   initialState,
   applyMiddleware(thunk)
 );
}