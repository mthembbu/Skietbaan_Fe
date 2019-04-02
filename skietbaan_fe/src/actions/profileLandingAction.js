import {LANDING_SET_SELECTED_PAGE} from "./types"

export const setSelectedLandingPage = setSelectedPage =>{
    return dispatch({
        type: LANDING_SET_SELECTED_PAGE,
        payload: setSelectedPage
    })
}