import {
  SCORES_PAGE,
  PAGE
} from "./types";

export const scoresSelectedPage = page => {
  return dispatch => {
    dispatch({
      type: SCORES_PAGE,
      payload: page
    });
  };
};

export const pageStateScore = id => {
  return dispatch => {
    dispatch({
      type: PAGE,
      payload: id
    });
  };
};
