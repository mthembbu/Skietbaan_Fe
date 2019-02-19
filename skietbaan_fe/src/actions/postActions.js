import { FETCH_POSTS, NEW_POST ,FETCH_LEADERBOARDFILTER_DATA ,FETCH_LEADERBOARDTABLE_DATA} from './types';
/** The method to feth the already available data for posts*/
export const fetchPosts = () => (dispatch) => {
	fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()).then((posts) =>
		dispatch({
			type: FETCH_POSTS,
			payload: posts
		})
	);
};
{/** the method to post new data from the PostForm */}
export const createPost = (postData) => (dispatch) => {
	fetch('https://jsonplaceholder.typicode.com/posts', {
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
/** The method to feth leaderboard filter data (groups array and competitions array*/
	export const fetchleaderboadfilterdata = () => (dispatch) => {
		console.log("getting filter data");
		fetch('http://localhost:63474/api/Leaderboard/GetLeaderboardFilterData?UserID=' + 1)
				.then(res => res.json())
				.then(data => dispatch({
				type: FETCH_LEADERBOARDFILTER_DATA,
				payload: data
			})
		);
	};
	/** The method to feth leaderboard rank table data ( arrayy of users scores)*/
	export const fetchleaderboadtabledata = (filterSelection) => (dispatch) => {
		console.log("getting table data");
		console.log("filter selection");
			console.log(filterSelection);
		fetch('http://localhost:63474/api/Leaderboard/GetLeaderboardRankings?competitionID=' + filterSelection.selectedCompetition  + '&groupID=' + filterSelection.selectedGroup  + '&userToken=' + filterSelection.userToken)
			.then(res => res.json())
			.then(data =>
			dispatch({
				type: FETCH_LEADERBOARDTABLE_DATA,
				payload: data
			})
		);
	};
