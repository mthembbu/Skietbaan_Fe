import {LANDING_SET_SELECTED_PAGE} from "../actions/types"

const initialState = {
    selectedLandingPage : 1
}

export default function(state = initialState, action){
    switch(action.type){
        case LANDING_SET_SELECTED_PAGE:
            return{
                ...state,
                selectedLandingPage : action.payload
            };
        default:
            return state;
    }
}