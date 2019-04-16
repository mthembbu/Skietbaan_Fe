import { CHECK_ADMIN, BASE_URL } from "./types";

export const checkUserType = token => dispatch => {
  fetch(BASE_URL + "/api/features/getuserbytoken/" + token, {
    method: "Get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      data.admin;
      dispatch({
        type: CHECK_ADMIN,
        payload: data
      });
    })
    .catch(err => {
      //catch error
    });
};
