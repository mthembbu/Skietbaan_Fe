import {
  FETCH_NOTIFICATION,
  UPDATE_IS_READ,
  BASE_URL,
  DATA_LOADING,
  FETCH_NUMBER_OF_NOTIFICATIONS,
  USER_LOGS,
  USER_LOS,
  DOCCIE_SENT,
  IS_CLICKED,
  EXPIRED_IS_CLICKED,
  MEMBER_IS_CLICKED,
  USER_IS_CLICKED,
  EXPORT_CSV,
  ADD_FILTER_NAME
} from "../actions/types";
import confirmation from "../components/Notification-Img/confirmation.png";
import renewal from "../components/Notification-Img/renewal.png";
import leaderboard from "../components/Notification-Img/leaderboard-unselected.png";
import document from "../components/Notification-Img/document-unselected.png";
import award from "../components/Notification-Img/award-unselected.png";
import announcement from "../components/Notification-Img/announcement-unselected.png";

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
    })
    .catch(err => {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
};

export const fetchNumberOfNotification = token => dispatch => {
  fetch(BASE_URL + "/api/Notification/GetNumberOfNotifications?token=" + token)
    .then(response => response.json())
    .then(data =>
      dispatch({
        type: FETCH_NUMBER_OF_NOTIFICATIONS,
        payload: data
      })
    )
    .catch(err => {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
};

export const getNotifications = token => dispatch => {
  dispatch({ type: DATA_LOADING });
  fetch(BASE_URL + "/api/Notification/GetNotificationsByUser?token=" + token)
    .then(response => response.json())
    .then(data => {
      const newArray = data.map(notification => {
        notification.markedForDeletion = false;
        if (
          notification.typeOfNotification === "Confirmation" ||
          notification.typeOfNotification === "Renewal"
        ) {
          notification.images = confirmation;
        } else if (
          notification.typeOfNotification === "Competition" ||
          notification.typeOfNotification === "Group"
        ) {
          notification.images = leaderboard;
        } else if (notification.typeOfNotification === "Award") {
          notification.images = award;
        } else if (notification.typeOfNotification === "Document") {
          notification.images = document;
        } else if (notification.typeOfNotification === "Expiry") {
          notification.images = renewal;
        } else if (notification.typeOfNotification === "Announcement") {
          notification.images = announcement;
        }
        return notification;
      });
      dispatch({
        type: FETCH_NOTIFICATION,
        payload: newArray
      });
    })
    .catch(err => {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
};

export const updateUserLOGS = status => {
  return dispatch => {
    dispatch({
      type: USER_LOGS,
      payload: status
    });
  };
};

export const updateUserLOS = status => {
  return dispatch => {
    dispatch({
      type: USER_LOS,
      payload: status
    });
  };
};

export const sent = status => {
  return dispatch => {
    dispatch({
      type: DOCCIE_SENT,
      payload: status
    });
  };
};

export const exportIsClicked = () => {
  return dispatch => {
    dispatch({
      type: IS_CLICKED
    });
  };
};

export const userIsClicked = () => {
  return dispatch => {
    dispatch({
      type: USER_IS_CLICKED
    });
  };
};

export const memberIsClicked = () => {
  return dispatch => {
    dispatch({
      type: MEMBER_IS_CLICKED
    });
  };
};

export const expiredIsClicked = () => {
  return dispatch => {
    dispatch({
      type: EXPIRED_IS_CLICKED
    })
  }
}

export const exportCSV = (filterData) => dispatch => {
  fetch(BASE_URL + "/api/features/generateCSV", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(filterData)
  })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type:  EXPORT_CSV,
        payload: filterData
      });
    })
    .catch(err => {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
}

export const filterName = (fName) => {
  return dispatch => {
    dispatch({
      type: ADD_FILTER_NAME,
      payload: fName
    });
  };
};

