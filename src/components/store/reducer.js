import * as actionTypes from '../store/actionTypes';

const initialState = {
    toggle:false,
    close:false,
    currentWeatcher:{},
    currentLocation:{}
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TOGGLE_CLASS:
            return{
                ...state,
                toggle:action.activeClass
            }
        case actionTypes.CLOSE_CLASS:
            return{
                ...state,
                close:action.close
            }
        case actionTypes.SET_CURRENT_WEATCHER:
            return{
                ...state,
                currentWeatcher:action.currentWeatcher,
                close:true
            }
        case actionTypes.SET_CURRENT_LOCAION:
            return{
                ...state,
                currentLocation:action.currenLlocation
            }
        default:
            return state
    }
}

export default reducer;