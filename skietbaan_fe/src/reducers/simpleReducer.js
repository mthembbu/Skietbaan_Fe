

/*
 src/reducers/simpleReducer.js
*/

/**
 * Create a Redux store that holds the app state.
 */
export default  (state = {}, action) => {
    switch (action.type) {
     case 'SIMPLE_ACTION':
      return {
       result: action.payload
      }
     default:
      return state
    }
   }