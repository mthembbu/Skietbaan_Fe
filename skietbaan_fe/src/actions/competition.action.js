import { 
		NEW_COMP,
	 	FETCH_COMP,
	  	UPDATE_COMP_STATUS,
		URL
	}from './types';
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
	fetch(URL + '/api/Competition', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(compData)
	}).then((res) =>  {if(res.ok) {return res.json();}
						else {
							return res.json().then(()=>{
								throw new Error("Backend error! Status code: " +res.status);
							});
						}} )
			.then((comp) =>
				dispatch({
					type: NEW_COMP,
					payload: comp
			}));
	setTimeout(function () { window.location = "/view-comp"; }, 3000);
};
/** A method to update an existing competition and posts comps data to the designated url /api/competition/{Id}*/
export const updateByIdComp = (compData, Id) => (dispatch) => {
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
