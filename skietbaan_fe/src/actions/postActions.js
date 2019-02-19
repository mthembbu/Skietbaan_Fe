import { FETCH_POSTS, NEW_POST,UPDATENAME } from './types';

/** The method to feth the already available data for posts*/
export const fetchPosts = () => (dispatch) => {
	fetch('http://localhost:63474/api/User').then((res) => res.json())
	.then((posts) =>
		dispatch({
			type: FETCH_POSTS,
			highlighted:false,
			payload: posts
		})
	);
};
{/** the method to post new data from the PostForm */}
export const createPost = (postData) => (dispatch) => {
	fetch('http://localhost:63474/api/groups/add', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(postData)
	})
		.then((res) => res.json())
		.then((post) =>
			dispatch({
				type: NEW_POST,
				payload: post
			})
		);
};

export const getname = (name) =>{
	//Return an action
	return (dispatch)=>{

	dispatch({
		type:UPDATENAME,
		payload:name
	})
	}
}
