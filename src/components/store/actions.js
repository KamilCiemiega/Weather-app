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

export const setCurrentWeatcher = (res,status) => {
    return {
        type: actionTypes.SET_CURRENT_WEATCHER,
        currentWeatcher:res,
        loadStatus:status
    };
};

export const getCurrentWeather = (status,lng,lat) => {
    const API_key = 'e36dea0542af17ed989cfdd735524f1d';
    return dispatch => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_key}/${lng},${lat}`)
            .then ( response => {
                dispatch(setCurrentWeatcher(response.data,status))
            }) 
            .catch( error => {
                console.log(error);
            })
    }
}

export const setCurrentLocation = (res,city) => {
    return {
        type: actionTypes.SET_CURRENT_LOCAION,
        currenLlocation:res,
        currentCity:city
    };
};

export const getCurrentLocation = (city) => {
    const API_key = '6dfe1fd5-fe60-46fc-ae70-6949542e05c2';
    return dispatch => {
        axios.get(`https://graphhopper.com/api/1/geocode?q=${city}&locale=de&debug=true&key=${API_key}`)
            .then ( response => {
                dispatch(setCurrentLocation(response.data,city))
            }) 
            .catch( error => {
                console.log(error);
            })
    }
}

export const setAirly = (res) => {
    return {
        type: actionTypes.SET_AIRLY,
        airlyStatus:res
    };
};

export const getAirly = (lat,lng) => {
    const API_key = 'dQnvbbAkXgIFwVA3eGBQNCAQMQdiLWLk';
    return dispatch => {
        axios.get(`https://airapi.airly.eu/v2/measurements/nearest?apikey=${API_key}&Accept=application/json&lat=${lat}&lng=${lng}&maxDistanceKM=20`)
            .then ( response => {
                dispatch(setAirly(response.data))
                console.log(response.data);
            }) 
            .catch( error => {
                console.log(error);
            })
    }
}
