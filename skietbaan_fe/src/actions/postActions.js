import {
  PASS_ID,
  UPDATE_GROUPNAME,
  CREATEGROUP,
  GETGROUP,
  BASE_URL,
  FETCH_GROUPS,
  EDITGROUPUSERS,
  ADDMEMBERS,
  PAGE,
  GROUPDICT,
  EMPTY,
  FETCH_LEADERBOARDFILTER_DATA,
  FETCH_LEADERBOARDTABLE_DATA,
  UPDATE_SELECTED_COMPETITION,
  UPDATE_SELECTED_GROUP
} from "./types";

/** The method to feth the already available data for posts*/
export const fetchGroups = () => dispatch => {
  fetch(BASE_URL+"/api/Groups")
    .then(res => res.json())
    .then(group => {
      const newdata=group.map(item=>{
        item.highlighted=false;
        return item
      })
      dispatch({
        type: FETCH_GROUPS,
        payload: group
      });
    });
};

export const AddMemberAction = (id) => dispatch => {
   fetch(BASE_URL + "/api/Groups/list?id="+id)
    .then(res => res.json())
    .then(posts => {
      const newdata = posts.map(users => {
        users.highlighted = false;
        return users;
      });
      dispatch({
        type: ADDMEMBERS,
        payload: newdata
      });
    });
};


export const createGroups = usersadded => dispatch => {
  fetch(BASE_URL + "/api/groups", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(usersadded)
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: CREATEGROUP,
        payload: post
      })
    );
};

{
  /** the method to post new data from the PostForm */
}
export const getName = name => {
  //Return an action
  return dispatch => {
    dispatch({
      type: UPDATE_GROUPNAME,
      payload: name
    });
  };
};

export const fetchEditUser = groupid =>dispatch=>{
  fetch(BASE_URL + '/api/Groups/edit?id='+groupid)
  .then(res=>res.json())
  .then(data=>{
    const newdata=data.map(user=>{
      user.highlighted=false;
      return user;
    })
    dispatch({
      type:EDITGROUPUSERS,
      payload:newdata
    })

  })
}

export const getGroup = () => dispatch => {
  fetch(BASE_URL + "/api/user")
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: GETGROUP,
        payload: posts
      })
    );
};

export const groupDictionary = () => dispatch => {
  fetch(BASE_URL + "/api/Groups/participants")
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: GROUPDICT,
        payload: posts
      })
    );
};
/** The method to feth leaderboard filter data (groups array and competitions array*/
export const fetchleaderboadfilterdata = () => dispatch => {
  fetch(BASE_URL + "/api/Leaderboard/GetLeaderboardFilterData?UserID=" + 1)
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: FETCH_LEADERBOARDFILTER_DATA,
        payload: data
      })
    );
};
/** The method to feth leaderboard rank table data ( arrayy of users scores)*/
export const fetchleaderboadtabledata = filterSelection => dispatch => {
  fetch(
    BASE_URL +
      "/api/Leaderboard/GetLeaderboardRankings?competitionID=" +
      filterSelection.selectedCompetition +
      "&groupID=" +
      filterSelection.selectedGroup +
      "&userToken=" +
      filterSelection.userToken +
      "&selectedRank=" +
      filterSelection.selectedRank
  )
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: FETCH_LEADERBOARDTABLE_DATA,
        payload: data
      })
    );
};
/** The method to update selected competition state*/
export const updateSelectedCompetition = competitionName => {
  return dispatch =>{
      dispatch(
        {
          type: UPDATE_SELECTED_COMPETITION,
          payload: competitionName
        }
      );
  };
};
/** The method to update selected competition state*/
export const updateSelectedGroup = groupName => {
  return dispatch =>{
      dispatch(
        {
          type: UPDATE_SELECTED_GROUP,
          payload: groupName
        }
      );
  };
};

export const passId = id => {
  return dispatch => {
    dispatch({
      type: PASS_ID,
      payload: id
    });
  };
};
export const pageState = id => {
  return dispatch => {
    dispatch({
      type: PAGE,
      payload: id
    });
  };
};
export const emptyState = () => {
  return dispatch => {
    dispatch({
      type: EMPTY,
      payload: []
    });
  };
};
