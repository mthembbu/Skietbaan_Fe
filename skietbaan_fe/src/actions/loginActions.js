import {LOGINTYPE} from './types';

export const logUser = () => dispatch => {
        dispatch({
          type: LOGINTYPE,
          payload: false
        });
  };
  export const logAdmin = () => dispatch => {
    dispatch({
      type: LOGINTYPE,
      payload: true
    });
};