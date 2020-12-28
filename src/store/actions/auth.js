import axios from 'axios';
import * as actionTypes from './actionTypes';
import dotenv from 'dotenv';
dotenv.config();

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSucess = (authData) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
        console.log(process.env);
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
        if(!isSignup)
            url =  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY;
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSucess(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            })
    };
};