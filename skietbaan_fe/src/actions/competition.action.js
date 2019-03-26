import { NEW_COMP, FETCH_COMP, UPDATE_COMP_STATUS, PARTICIPANTS_PER_COMP, URL } from './types';
import history from '../components/history';
export const fetchcomp = () => (dispatch) => {
	fetch(URL + '/api/Competition/all').then((res) => res.json()).then((compData) => {
		dispatch({
			type: FETCH_COMP,
			payload: compData
		});
	});
};

export const fetchParticipants = () => (dispatch) => {
	fetch(URL + '/api/Competition/participants').then((res) => res.json()).then((participantsData) => {
		dispatch({
			type: PARTICIPANTS_PER_COMP,
			payload: participantsData
		});
	});
};

export const createcomp = (compData) => (dispatch) => {
	fetch(URL + '/api/Competition', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(compData)
	})
		.then((res) => {
			if (res.ok) {
				console.log('Response status in an If(): ', res.statusText);
				 res.json().then(() =>
					dispatch({
						type: NEW_COMP,
						payload: false
					})
				)
			} else {
				res.json().then(() => {
					dispatch({
						type: NEW_COMP,
						payload: true
					})
				});
				
			}
			console.log('Final returned, Response Status: ', res.ok);
		})
		.catch((error) => {
			console.log('request error => ', error);
		});
};

/** A method to update an existing competition and posts comps data to the designated url /api/competition/{Id}*/
export const updateByIdComp = (compData, Id) => (dispatch) => {
	fetch(URL + '/api/Competition/' + Id, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(compData)
	})
		.then((res) => {
			res.json();
		})
		.then((comp) => {
			dispatch({
				type: UPDATE_COMP_STATUS,
				payload: comp
			});
		});
};
