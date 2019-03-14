import {LOGINTYPE} from '../actions/types';

const initialState = {
    type: false
};

export default function(state = initialState, action) {
    switch (action.type) {
     case LOGINTYPE:
      return {
          ...state,
       type: action.payload
      };
     default:
      return state;
    }
}
