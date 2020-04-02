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

export const setCurrentWeather = (res,status) => {
    return {
        type: actionTypes.SET_CURRENT_WEATHER,
        currentWeather:res,
        loadStatus:status
    };
};

export const getCurrentWeather = (status,lng,lat) => {
    const API_key = 'e36dea0542af17ed989cfdd735524f1d';
    return dispatch => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_key}/${lng},${lat}`)
            .then ( response => {
                dispatch(setCurrentWeather(response.data,status))
            }) 
            .catch( error => {
                console.log(error);
            })
    }
}

export const setCurrentLocation = (res,city) => {
    return {
        type: actionTypes.SET_CURRENT_LOCATION,
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
                console.log(error)
            })
    }
}

export const setAirly = (res,status) => {
    return {
        type: actionTypes.SET_AIRLY,
        airly:res,
        airlyStatus:status
    };
};

export const getAirly = (status,lat,lng) => {
    const API_key = 'dQnvbbAkXgIFwVA3eGBQNCAQMQdiLWLk';
    return dispatch => {
        axios.get(`https://airapi.airly.eu/v2/measurements/nearest?apikey=${API_key}&Accept=application/json&lat=${lat}&lng=${lng}&maxDistanceKM=20`)
            .then ( response => {
                dispatch(setAirly(response.data,status))
            }) 
            .catch( error => {
                console.log(error);
            })
    }
}

export const setautoLocalization = (res) => {
    return {
        type: actionTypes.SET_AUTO_LOCALIZATION,
        autoLocalization:res
    };
};

export const getAutoLocalization = () => {
    return dispatch => {
        axios.get(`http://ip-api.com/json/?fields=country,city,lat,lon`)
            .then ( response => {
                dispatch(setautoLocalization(response.data))
            }) 
            .catch( error => {
                console.log(error);
            })
    }
}

export const nextPage = () => {
    return {
        type: actionTypes.NEXT_PAGE,
        currentPage:4
    };
};
export const previousPage = () => {
    return {
        type: actionTypes.PREVIOUS_PAGE,
        currentPage:4
    };
};
export const errorMessage = (err) => {
    return {
        type: actionTypes.ERROR_MESSAGE,
        error:err
    };
};
