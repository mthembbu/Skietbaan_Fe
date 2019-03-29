import {PROFILE_SET_SELECTED_COMPETITION} from "./types"

export const setSelectedCompetition = selectedCompetition => {
    return dispatch => {
        dispatch({
            type: PROFILE_SET_SELECTED_COMPETITION,
            payload: selectedCompetition
        });
    };
}