import { NEW_COMP,
	 	FETCH_COMP,
	  	UPDATE_COMP_STATUS,
	   	URL } from './types';
export const fetchcomp = () => (dispatch) => {
	fetch(URL+ '/api/Competition/all')
		.then((res) => res.json())
			.then((compData) => {
				dispatch({
					type: FETCH_COMP,
					payload: compData
		});
	});
};
/** A method to create a new competition and posts comps data to the designated url
 */
export const createcomp = (compData) => (dispatch) => {
	fetch(URL + '/api/competition', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(compData)
	}).then((res) => res.json())
			.then((comp) =>
				dispatch({
					type: NEW_COMP,
					payload: comp
			})
		);
	window.location = '/create';
};
/** A method to update an existing competition and posts comps data to the designated url /api/competition/{Id}*/
export const updateByIDcomp = (compData, Id) => (dispatch) => {
	fetch(URL + '/api/Competition/' + Id, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(compData)
	}).then((res) => {res.json();
			}).then((comp) => {
				dispatch({
					type: UPDATE_COMP_STATUS,
					payload: comp
			});
		});
};
