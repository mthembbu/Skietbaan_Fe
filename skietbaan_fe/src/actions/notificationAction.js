import { FETCH_NOTIFICATION, BASE_URL } from "../actions/types";

export const fetchNotifications = token => dispatch => {
  fetch(BASE_URL + "/api/Notification/GetNotificationsByUser?" + token)
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
