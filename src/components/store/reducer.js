import * as actionTypes from '../store/actionTypes';

const initialState = {
    toggle:false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TOGGLE_CLASS:
            return{
                ...state,
                toggle:action.activeClass
            }
        default:
            return state
    }
}

export default reducer;