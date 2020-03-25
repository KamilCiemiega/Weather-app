import * as actionTypes from './actionTypes';
import axios from 'axios';

export const toggleClass = (active) => {
    return {
        type: actionTypes.TOGGLE_CLASS,
        activeClass:active
    }
}

export const closeClass = (active) => {
    return {
        type: actionTypes.CLOSE_CLASS,
        close:active
    }
}

export const setCurrentWeatcher = (res) => {
    return {
        type: actionTypes.SET_CURRENT_WEATCHER,
        currentWeatcher:res
    };
};

export const getCurrentWeather = () => {
    const API_key = 'e36dea0542af17ed989cfdd735524f1d';
    return dispatch => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_key}/42.3601,-71.0589`)
            .then ( response => {
                dispatch(setCurrentWeatcher(response.data))
                console.log(response.data);
            }) 
            .catch( error => {
                console.log(error);
            })
    }
}
