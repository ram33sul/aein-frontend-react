import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_USER_LOGOUT
} from './userTypes';

const initialState = {
    loading: true,
    user: {},
    error: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USER_REQUEST: return {
            ...state,
            loading: true
        };

        case FETCH_USER_SUCCESS: return {
            loading: false,
            user: action.payload,
            error: ''
        };

        case FETCH_USER_FAILURE: return {
            loading: false,
            user: {},
            error: action.payload
        };

        case FETCH_USER_LOGOUT: return {
            loading: false,
            user: {},
            error: ''
        }

        default: return state;

    }
}

export default userReducer;