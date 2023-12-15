import {
    USER_REGISTER_BEGIN,
    USER_REGISTER_FAILURE,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_BEGIN,
    USER_LOGIN_FAILURE,
    USER_LOGIN_SUCCESS,
    LOGOUT,
    FORGETPASSWORD_BEGIN,
    FORGETPASSWORD_SUCCESS,
    FORGETPASSWORD_FAILURE,
    RESETPASSWORD_BEGIN,
    RESETPASSWORD_SUCCESS,
    RESETPASSWORD_FAILURE,
    EDITPROFILE,
    VIEWPROFILE
} from '../Actions/actionConsts'

const auth = JSON.parse(localStorage.getItem('auth'))
const user = JSON.parse(localStorage.getItem('user'))
// const auth = JSON.parse(sessionStorage.getItem('auth'))
// const user = JSON.parse(sessionStorage.getItem('user'))

const initialState = user
    ? { isLoggedIn: true, user, auth }
    : { isLoggedIn: false, user: null }

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case USER_REGISTER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }

        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                user: payload,
                loading: false,
                isLoggedIn: true,
                error: null
            }
        case USER_REGISTER_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                error: payload,
                loading: false
            }

        case USER_LOGIN_BEGIN:
            return {
                ...state,
                loading: true,
                isLoggedIn: false,
                error: null
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload?.data,
                auth: payload?.meta,
                loading: false,
                error: null
            }

        case USER_LOGIN_FAILURE:
            return {
                ...state,
                user: null,
                loading: false,
                error: payload
            }
        case LOGOUT:
            // localStorage.clear()
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        case FORGETPASSWORD_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FORGETPASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            }
        case FORGETPASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case RESETPASSWORD_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case RESETPASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            }
        case RESETPASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case EDITPROFILE:
            return {
                ...state,
                user: payload
            }

        case VIEWPROFILE:
            return {
                ...state,
                user: payload,
                loading: false
            }

        default:
            return state
    }
}
