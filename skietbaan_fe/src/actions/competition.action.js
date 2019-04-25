import {
  NEW_COMP,
  FETCH_COMP,
  UPDATE_COMP_STATUS,
  PARTICIPANTS_PER_COMP,
  BASE_URL,
  FETCH_REQ,
  COMP_PAGE,
  UPDATE_REQ,
  COMPETITION_DATA_LOADING
} from "./types";
//fetch the array of competitions
export const fetchComp = () => dispatch => {
  const arr=[]
  dispatch({ type: COMPETITION_DATA_LOADING });
  fetch(BASE_URL + "/api/Competition/all")
    .then(res => res.json())
    .then(compData => {
      const newComp = compData.map(data=>{
        data.highlighted=false;
        arr.push(data.id);
      });
      dispatch({
        type: FETCH_COMP,
        payload: compData,
        pay:arr
      });
    })
    .catch(err => {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
};
//fetch the competition requiremets as per Competition ID
export const fetchRequirements = CompID => dispatch => {
  fetch(BASE_URL + "/R/" + CompID)
    .then(response => response.json())
    .then(requirementsData => {
      dispatch({
        type: FETCH_REQ,
        payload: requirementsData
      });
    })
    .catch(err => {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
};
export const updateRequirements = (compID, rData) => dispatch => {
  fetch(BASE_URL + "/Requirements/" + compID, {
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
    })
    .catch(err => {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
};

/** A method to update an existing competition and posts comps data to the designated BASE_URL /api/competition/{Id}*/
export const updateByIdComp = (compData, Id) => dispatch => {
  fetch(BASE_URL + "/api/Competition/" + Id, {
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
    })
    .catch(err => {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
};
//fetch participants
export const fetchParticipants = () => dispatch => {
  fetch(BASE_URL + "/api/Competition/participants")
    .then(res => res.json())
    .then(participantsData => {
      dispatch({
        type: PARTICIPANTS_PER_COMP,
        payload: participantsData
      });
    })
    .catch(err => {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
};

//creating a single competition
export const createComp = compData => dispatch => {
  let response;
  fetch(BASE_URL + "/api/Competition/filter", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(compData)
  })
    .then(res => {
      if (res.ok) {
        response = res;
        res.json().then(() =>
          dispatch({
            type: NEW_COMP,
            payload: true
          })
        );
      } else {
        res.json().then(() => {
          dispatch({
            type: NEW_COMP,
            payload: false
          });
        });
      }
    })
    .catch(err => {
      /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
    });
  return response;
};
export const compSelectedPages = page => {
  return dispatch => {
    dispatch({
      type: COMP_PAGE,
      payload: page
    });
  };
};
