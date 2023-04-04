import axios from "axios";
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_USER_LOGOUT } from "./userTypes";

export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

export const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    }
}

export const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

export const fetchUserLogout = () => {
    return {
        type: FETCH_USER_LOGOUT
    }
}

export const fetchUser = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest());
        axios.get('/verifyUser').then((response) => {
            const user = response.data.user;
            dispatch(fetchUserSuccess(user));
        }).catch((error) => {
            const err = error.response.data.message;
            dispatch(fetchUserFailure(err));
        })
    }
}