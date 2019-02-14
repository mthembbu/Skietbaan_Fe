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
	fetch('http://localhost:63474/api/Competition', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
          'Content-Type': 'application/json'
		},
		body: JSON.stringify(compData)
		
	})
		.then((res) => res.json())
		.then((comp) =>
			dispatch({
				type: NEW_COMP,
				payload: comp,
				
			}),
			window.location = "/home"
		);
 
};
