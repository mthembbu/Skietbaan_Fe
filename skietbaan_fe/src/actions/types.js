export const ADD_BOOKMARK = 'ADD_BOOKMARK';
export const DELETE_BOOKMARK = 'DELETE_BOOKMARK';
export const FETCH_POSTS = 'FETCH_POSTS';
export const NEW_POST = 'NEW_POST';
export const NEW_COMP = 'NEW_COMP';
export const FETCH_COMP = 'NEW_COMP';
export const BASE_URL = "http://localhost:5000";
//leaderboard types
export const FETCH_LEADERBOARDFILTER_DATA = 'FETCH_LEADERBOARDFILTER_DATA';
export const FETCH_LEADERBOARDTABLE_DATA = 'FETCH_LEADERBOARDTABLE_DATA';
export const URL = "http://localhost:5000"; 

export const SendMail = (email)=>{
    (async () => {
        const rawResponse = await fetch(BASE_URL+`/api/Documents/Email/${email}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": email
            })
        });
  })();
}

