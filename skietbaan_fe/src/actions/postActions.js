import { PASS_ID,NEW_POST,FETCH_POSTS,UPDATENAME,CREATEGROUP,GETGROUP,GETNAME,
  GETNAME,
	URLADD,URLUSER,URLGROUP,FETCH_LEADERBOARDFILTER_DATA ,FETCH_LEADERBOARDTABLE_DATA} from './types';
	
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
	fetch(URLGROUP, {
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
	fetch(URLADD, {
	  method: "Post",
	  headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	  },
	  body: JSON.stringify(users)
	}).then((res) => res.json())
	  .then(function(response) {})
	  .then(function(data) {})
	  .catch(function(data) {});
  };
  
  export const getname = name => {
	//Return an action
	return dispatch => {
	  dispatch({
		type: UPDATENAME,
		payload: name
	  });
	};
  };
  

/** The method to feth leaderboard filter data (groups array and competitions array*/



	/** The method to feth leaderboard rank table data ( arrayy of users scores)*/


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