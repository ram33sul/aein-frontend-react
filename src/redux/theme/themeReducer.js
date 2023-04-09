import {
    CHANGE_TO_DARK,
    CHANGE_TO_LIGHT
} from './themeTypes';

const currentTheme = JSON.parse(localStorage.getItem('aein-app-theme')) ?? 'light';
const foregroundColor = currentTheme === 'dark' ? 'white' : 'black';
const backgroundColor = foregroundColor === 'black' ? 'white' : 'black';

const initialState = {
    theme: currentTheme,
    foregroundColor,
    backgroundColor
}

const themeReducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_TO_DARK: return {
            theme: 'dark',
            foregroundColor: 'white',
            backgroundColor: 'black'
        }
        case CHANGE_TO_LIGHT: return {
            theme: 'light',
            foregroundColor: 'black',
            backgroundColor: 'white'
        }
        default: return state;
    }
}

export default themeReducer;