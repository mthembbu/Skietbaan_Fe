import {
  NEW_COMP,
  FETCH_COMP,
  UPDATE_COMP_STATUS,
  PARTICIPANTS_PER_COMP,
  URL,
  FETCH_REQ,
  UPDATE_REQ
} from "./types";
//fetch the array of competitions
export const fetchcomp = () => dispatch => {
  fetch(URL + "/api/Competition/all")
    .then(res => res.json())
    .then(compData => {
      dispatch({
        type: FETCH_COMP,
        payload: compData
      });
    });
};
//fetch the competition requiremets as per Competition ID
export const fetchRequirements = CompID => dispatch => {
  let obj = {
    id: "",
    competition: null,
    standard: "",
    accuracy: "",
    total: ""
  };
  fetch(URL + "/R/" + CompID)
    .then(response => response.json())
    .then(requirementsData => {
      dispatch({
        type: FETCH_REQ,
        payload: requirementsData
      });
    });
};
export const updateRequirements = (compID, rData) => dispatch => {
  fetch(URL + "/Requirements/" + compID, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(rData)
  })
    .then(res => {
      res.json();
    })
    .then(ReqData => {
      dispatch({
        type: UPDATE_REQ,
        payload: ReqData
      });
    });
};

/** A method to update an existing competition and posts comps data to the designated url /api/competition/{Id}*/
export const updateByIdComp = (compData, Id) => dispatch => {
  fetch(URL + "/api/Competition/" + Id, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(compData)
  })
    .then(res => {
      res.json();
    })
    .then(comp => {
      dispatch({
        type: UPDATE_COMP_STATUS,
        payload: comp
      });
    });
};
//fetch participants
export const fetchParticipants = () => dispatch => {
  fetch(URL + "/api/Competition/participants")
    .then(res => res.json())
    .then(participantsData => {
      dispatch({
        type: PARTICIPANTS_PER_COMP,
        payload: participantsData
      });
    });
};
//creating a single competition
export const createcomp = compData => dispatch => {
  fetch(URL + "/api/Competition", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(compData)
  }).then(res => {
    if (res.ok) {
      res.json().then(() =>
        dispatch({
          type: NEW_COMP,
          payload: false
        })
      );
    } else {
      res.json().then(() => {
        dispatch({
          type: NEW_COMP,
          payload: true
        });
      });
    }
  });
};
