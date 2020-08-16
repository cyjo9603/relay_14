import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    FIND_USER_BY_PHOTO,
} from '../_actions/types';

const initialState = {
    register: null,
    loginSuccess: null,
    userData: null,
    findData: null
}

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case FIND_USER_BY_PHOTO:
            return {...state, findData: action.payload}
        default:
            return state;
    }
}