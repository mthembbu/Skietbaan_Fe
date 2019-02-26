import {
  FETCH_POSTS,
  NEW_POST,
  UPDATENAME,
  CREATEGROUP,
  GETGROUP,
  GETNAME,
  PASS_ID
} from "./types";

/** The method to feth the already available data for posts*/
export const fetchPosts = () => dispatch => {
  fetch("http://localhost:63474/api/User")
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
export const createGroups = usersadded => dispatch => {
  fetch("http://localhost:63474/api/groups", {
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
  fetch("http://localhost:63474/api/groups/add", {
    method: "Post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(users)
  })
    .then(function(response) {})
    .then(function(data) {})
    .catch(function(data) {});
};

export const getname = name => {
  return dispatch => {
    dispatch({
      type: UPDATENAME,
      payload: name
    });
  };
};

export const getGroup = () => dispatch => {
  fetch("http://localhost:63474/api/User")
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: GETGROUP,
        payload: posts
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