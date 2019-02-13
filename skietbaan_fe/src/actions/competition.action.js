import { NEW_COMP, FETCH_COMP } from './types';
/**A method to fetch all competitions */
/**GC TODO: The method to fetch data from the  competition table 
export const fetchComps = () => {
	fetch('https://jsonplaceholder.typicalcode.com/posts')
		.then((res) => res.json())
		.then((comps) => dispatch({ type: FETCH_COMP, payload: comps }))
};END OF GC*/
/** Amethod to create a new competition and posts comps data to the designated url
 * TO DO: don't forget to use the http://skietbaan.retrotest.co.za/api/
 */
export const createcomp = (compData) => (dispatch) => {
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(compData)
	})
		.then((res) => res.json())
		.then((comp) =>
			dispatch({
				type: NEW_COMP,
				payload: comp
			})
		);
};
