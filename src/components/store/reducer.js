import * as actionTypes from '../store/actionTypes';
import { updateObject } from './utility';
import Cities from '../data/cities.json'
const initialState = {
    toggle: false,
    close: false,
    loadStatus: 'init',
    currentWeather: {},
    currentLocation: {},
    city: '',
    airly: {},
    airlyStatus: 'init',
    autoLocalization: {},
    page1: 0,
    page2: 1,
    page3: 2,
    page4: 3,
    error: '',
    loading: false,
    showModal: false,
    cityValue: '',
    filtredCityName: [],
    formError:false
}

const toggleClass = (state, action) => {
    return updateObject(state, { toggle: action.activeClass })
}

const setCurrentWeather = (state, action) => {
    return updateObject(state, {
        currentWeather: action.currentWeather,
        loadStatus: action.loadStatus
    })
}

const setCurrentLocation = (state, action) => {
    return updateObject(state, {
        currentLocation: action.currenLlocation,
        city: action.currentCity,
        close: true
    })
}

const setAirly = (state, action) => {
    return updateObject(state, {
        airly: action.airly,
        airlyStatus: action.airlyStatus
    })
}

const setAutoLocalization = (state, action) => {
    return updateObject(state, {
        autoLocalization: action.autoLocalization,
        close: true
    })
}

const nextPage = (state, action) => {
    return updateObject(state, {
        page1: state.page1 + action.currentPage,
        page2: state.page2 + action.currentPage,
        page3: state.page3 + action.currentPage,
        page4: state.page4 + action.currentPage
    })
}

const previousPage = (state, action) => {
    return updateObject(state, {
        page1: state.page1 - action.currentPage,
        page2: state.page2 - action.currentPage,
        page3: state.page3 - action.currentPage,
        page4: state.page4 - action.currentPage
    })
}

const errorMessage = (state, action) => {
    return updateObject(state, { error: action.error })
}

const setSpinner = (state, action) => {
    return updateObject(state, { loading: action.loadingStatus })
}

const showModal = (state, action) => {
    return updateObject(state, { showModal: action.show })
}

const cityName = (state, action) => {
    return updateObject(state, { cityValue: action.city })
}
const filteredSuggestions = (state) => {
    let cities = [];
    Cities.forEach(elem => {
        elem.cities.forEach(item => {
            cities.push(item.text)
        });
    });
    const filteredSuggestions = cities.filter(
        elem =>
            elem.toLowerCase().indexOf(state.cityValue.toLowerCase()) > -1
    );
    return updateObject(state, { filtredCityName:  filteredSuggestions})
}
const formError = (state, action) => {
    return updateObject(state, {formError: action.formError })
}
const emptySuggestions = (state) => {
    return updateObject(state, {filtredCityName:[]})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_CLASS: return toggleClass(state, action);
        case actionTypes.CLOSE_CLASS: return toggleClass(state, action);
        case actionTypes.SET_CURRENT_WEATHER: return setCurrentWeather(state, action);
        case actionTypes.SET_CURRENT_LOCATION: return setCurrentLocation(state, action);
        case actionTypes.SET_AIRLY: return setAirly(state, action);
        case actionTypes.SET_AUTO_LOCALIZATION: return setAutoLocalization(state, action);
        case actionTypes.NEXT_PAGE: return nextPage(state, action);
        case actionTypes.PREVIOUS_PAGE: return previousPage(state, action);
        case actionTypes.ERROR_MESSAGE: return errorMessage(state, action);
        case actionTypes.SET_SPINNER: return setSpinner(state, action);
        case actionTypes.SHOW_MODAL: return showModal(state, action);
        case actionTypes.CITY_NAME: return cityName(state, action);
        case actionTypes.FILTERED_SUGGESTIONS: return filteredSuggestions(state, action);
        case actionTypes.FORM_ERROR: return formError(state, action);
        case actionTypes.EMPTY_SUGGESTIONS: return emptySuggestions(state, action);
        default:
            return state
    }
}

export default reducer;