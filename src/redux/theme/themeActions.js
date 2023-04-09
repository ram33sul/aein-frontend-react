import {
    CHANGE_TO_DARK,
    CHANGE_TO_LIGHT
} from './themeTypes';

export const changeToDark = () => {
    return {
        type: CHANGE_TO_DARK
    }
}

export const changeToLight = () => {
    return {
        type: CHANGE_TO_LIGHT
    }
}