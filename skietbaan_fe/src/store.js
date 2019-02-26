import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState={};

const middleware=[thunk];

const Store=createStore(
    rootReducer,
    initialState,
    compose(
    applyMiddleware(...middleware)),
    window.__REDUX__DEVTOOLS__EXTENSION__  &&  window.__REDUX__DEVTOOLS__EXTENSION__()
    );

export default Store;