import { FETCH_NOTIFICATION, UPDATE_IS_READ, BASE_URL } from "../actions/types";

export const fetchNotifications = token => dispatch => {
  fetch(BASE_URL + "/api/Notification/GetNumberOfNotifications?" + token)
    .then(response => response.json())
    .then(data => {
      const newArray = data.map(notification => {
        notification.markedForDeletion = false;
        return notification;
      });
      dispatch({
        type: FETCH_NOTIFICATION,
        payload: newArray
      });
    });
};

export const updateIsReadProperty = id => dispatch => {
  fetch(BASE_URL + "/api/Notification/UpdateIsReadProperty/" + id, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: UPDATE_IS_READ,
        payload: data
      });
    });
};
