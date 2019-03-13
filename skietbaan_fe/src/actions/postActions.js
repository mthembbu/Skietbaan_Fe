import {
  PASS_ID,
  FETCH_POSTS,
  UPDATE_GROUPNAME,
  UPDATENAME,
  CREATEGROUP,
  GETGROUP,
  GETNAME,
  BASE_URL,
  URLADD,
  UPDATEARRAY,
  URLUSER,
  FETCH_GROUPS,
  EDITGROUPUSERS,
  ADDMEMBERS,
  FETCH_LEADERBOARDFILTER_DATA,
  FETCH_LEADERBOARDTABLE_DATA
} from "./types";

/** The method to feth the already available data for posts*/
export const fetchPosts = () => dispatch => {
  fetch(URLUSER)
    .then(res => res.json())
    .then(posts => {
      const newdata = posts.map(users => {
        users.highlighted = false;
        return users;
      });
      dispatch({
        type: FETCH_POSTS,
        payload: newdata
      });
    });
};

export const FetchGroups = () => dispatch => {
  fetch(BASE_URL+"/api/Groups")
    .then(res => res.json())
    .then(group => {
      const newdata=group.map(item=>{
        item.colors="black",
        item.image="normalstate";
        return item
      })
      dispatch({
        type: FETCH_GROUPS,
        payload: group
      });
    });
};

export  const EditGroupAction = (id) => dispatch => {
  fetch(BASE_URL + "/api/Groups/edit?id="+id)
    .then(res => res.json())
    .then(posts => {
      const newdata = posts.map(users => {
        users.highlighted = true;
        users.background= "#F3F4F9",
        users.image= "marked"
        return users;
      });
      dispatch({
        type: EDITGROUPUSERS,
        payload: newdata
      });
    });
};
export const AddMemberAction = (id) => dispatch => {
   fetch(BASE_URL + "/api/Groups/list?id="+id)
    .then(res => res.json())
    .then(posts => {
      const newdata = posts.map(users => {
        users.highlighted = false;
        users.background= "#fdfdfd",
        users.image= "marked"
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
export const createPost = users => dispatch => {
  fetch(BASE_URL + "/api/groups", {
    method: "Post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(users)
  })
    .then(res => res.json())
    .then(function(response) {})
    .then(function(data) {})
    .catch(function(data) {});
};

export const getName = name => {
  //Return an action
  return dispatch => {
    dispatch({
      type: UPDATE_GROUPNAME,
      payload: name
    });
  };
};
export const Changedata = name => {
  //Return an action
  return dispatch => {
    dispatch({
      type: UPDATEARRAY,
      payload: name
    });
  };
};

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
      filterSelection.userToken
  )
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: FETCH_LEADERBOARDTABLE_DATA,
        payload: data
      })
    );
};

export const passId = id => {
  return dispatch => {
    dispatch({
      type: PASS_ID,
      payload: id
    });
  };
};
