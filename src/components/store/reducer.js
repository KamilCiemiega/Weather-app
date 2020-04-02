import * as actionTypes from '../store/actionTypes';

const initialState = {
    toggle:false,
    close:false,
    loadStatus:'init',
    currentWeather:{},
    currentLocation:{},
    city:"",
    airly:{},
    airlyStatus:'init',
    autoLocalization:{},
    page1:0,
    page2:1,
    page3:2,
    page4:3,
    error:''
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
        case actionTypes.SET_CURRENT_WEATHER:
            return{
                ...state,
                currentWeather:action.currentWeather,
                loadStatus:action.loadStatus
            }
        case actionTypes.SET_CURRENT_LOCATION:
            return{
                ...state,
                currentLocation:action.currenLlocation,
                city:action.currentCity,
                close:true
            }
        case actionTypes.SET_AIRLY:
            return{
                ...state,
                airly:action.airly,
                airlyStatus:action.airlyStatus
            }
        case actionTypes.SET_AUTO_LOCALIZATION:
            return{
                ...state,
                autoLocalization:action.autoLocalization,
                close:true
            }
        case actionTypes.NEXT_PAGE:
            return{
                ...state,
                page1:state.page1 + action.currentPage,
                page2:state.page2 + action.currentPage,
                page3:state.page3 + action.currentPage,
                page4:state.page4 + action.currentPage
            }
        case actionTypes.PREVIOUS_PAGE:
            return{
                ...state,
                page1:state.page1 - action.currentPage,
                page2:state.page2 - action.currentPage,
                page3:state.page3 - action.currentPage,
                page4:state.page4 - action.currentPage
            }
        case actionTypes.ERROR_MESSAGE:
            return{
                ...state,
                error:action.error
            }
        default:
            return state
    }
}

export default reducer;