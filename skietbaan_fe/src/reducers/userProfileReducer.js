import {PROFILE_SET_SELECTED_COMPETITION} from "../actions/types"

const initialState = {
    selectedCompetition : ""
}

export default function(state = initialState, action) {
    switch (action.type) {
        case PROFILE_SET_SELECTED_COMPETITION:
            return{
                ...state,
                selectedCompetition : action.payload
            };
            
        default:
            return state;
    }
}