import * as actionTypes from './actionTypes';

export const toggleClass = (active) => {
    return {
        type: actionTypes.TOGGLE_CLASS,
        activeClass:active
    }
}