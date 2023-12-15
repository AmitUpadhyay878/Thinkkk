import request from '../../util/request'
import { exceptionHandler } from '../../util/common'
import { FailureToastNotification } from '../../components/ToastServerError/ToasterMessage'
import {
    USER_REGISTER_BEGIN,
    USER_REGISTER_FAILURE,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_BEGIN,
    USER_LOGIN_FAILURE,
    USER_LOGIN_SUCCESS,
    FORGETPASSWORD_BEGIN,
    FORGETPASSWORD_SUCCESS,
    FORGETPASSWORD_FAILURE,
    LOGOUT,
    RESETPASSWORD_BEGIN,
    RESETPASSWORD_SUCCESS,
    RESETPASSWORD_FAILURE,
    EDITPROFILE,
    VIEWPROFILE,
    AUTH_ERROR_RESET
} from './actionConsts'

export const authErrorReset = () => {
    return {
        type: AUTH_ERROR_RESET
    }
}

export const userRegisterRequest = () => ({
    type: USER_REGISTER_BEGIN
})

export const userRegisterSuccess = (payload) => ({
    type: USER_REGISTER_SUCCESS,
    payload
})

export const userRegisterFailure = (payload) => ({
    type: USER_REGISTER_FAILURE,
    payload
})

export const registerUser = (payload, callback) => {
    return (dispatch) => {
        dispatch(userRegisterRequest())
        return request('POST', `/user/signup`, payload)
            .then(({ data }) => {
                localStorage.setItem('auth', JSON.stringify(data.meta))
                localStorage.setItem('user', JSON.stringify(data.data))
                // sessionStorage.setItem("auth",  JSON.stringify(data?.meta))
                //     sessionStorage.setItem("user",  JSON.stringify(data?.data))

                dispatch(userRegisterSuccess(data.data))

                callback(data?.data?.url)
            })
            .catch((error) => {
                dispatch(userRegisterFailure(exceptionHandler(error).message))

                let response = exceptionHandler(error)
                FailureToastNotification(response?.message)
            })
    }
}

export const userLoginRequest = () => ({
    type: USER_LOGIN_BEGIN
})

export const userLoginSuccess = (payload) => ({
    type: USER_LOGIN_SUCCESS,
    payload
})

export const userLoginFailure = (payload) => ({
    type: USER_LOGIN_FAILURE,
    payload
})

export const loginUser = (payload, callback, loading) => {
    return (dispatch) => {
        dispatch(userLoginRequest())
        return request('POST', `/user/login`, payload)
            .then(({ data }) => {
                localStorage.setItem('auth', JSON.stringify(data?.meta))
                localStorage.setItem('user', JSON.stringify(data?.data))
                // sessionStorage.setItem("auth",  JSON.stringify(data?.meta))
                //     sessionStorage.setItem("user",  JSON.stringify(data?.data))

                dispatch(userLoginSuccess(data))
                callback()
            })
            .catch((error) => {
                dispatch(userLoginFailure(exceptionHandler(error).message))
                let response = exceptionHandler(error)
                FailureToastNotification(response?.message)
            })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('user')
    localStorage.removeItem('auth')
    // sessionStorage.clear('user')
    // sessionStorage.clear('auth')
    dispatch({ type: LOGOUT })
}

export const forgetPasswordRequest = () => ({
    type: FORGETPASSWORD_BEGIN
})
export const forgetPasswordSuccess = () => ({
    type: FORGETPASSWORD_SUCCESS
})
export const forgetPasswordFailure = (payload) => {
    return {
        type: FORGETPASSWORD_FAILURE,
        payload
    }
}

export const forgetPassword = (payload, callback) => {
    return (dispatch) => {
        dispatch(forgetPasswordRequest())
        return request('POST', `/user/forgot-password`, payload)
            .then(({ data }) => {
                dispatch(forgetPasswordSuccess(data))
                callback()
            })
            .catch((error) => {
                dispatch(forgetPasswordFailure(exceptionHandler(error).message))
                let response = exceptionHandler(error)
                FailureToastNotification(response?.message)
            })
    }
}

export const resetPasswordRequest = () => ({
    type: RESETPASSWORD_BEGIN
})
export const resetPasswordSuccess = () => ({
    type: RESETPASSWORD_SUCCESS
})
export const resetPasswordFailure = (payload) => ({
    type: RESETPASSWORD_FAILURE,
    payload
})

export const resetPassword = (payload, callback) => {
    return (dispatch) => {
        dispatch(resetPasswordRequest())
        return request('POST', `/user/reset-password`, payload)
            .then(({ data }) => {
                dispatch(resetPasswordSuccess())
                callback()
            })
            .catch((error) => {
                dispatch(resetPasswordFailure(exceptionHandler(error).message))

                let response = exceptionHandler(error)
                FailureToastNotification(response?.message)
            })
    }
}

export const editProfileAction = (payload) => {
    localStorage.setItem('user', JSON.stringify(payload))
        // sessionStorage.setItem("user",  JSON.stringify(payload))

    return {
        type: EDITPROFILE,
        payload
    }
}

export const viewProfileAction = (payload) => {
    localStorage.setItem('user', JSON.stringify(payload))
    
    // sessionStorage.setItem("user",  JSON.stringify(payload))
    localStorage.getItem('user', JSON.stringify(payload))
    // sessionStorage.getItem('user', JSON.stringify(payload))
    return {
        type: VIEWPROFILE,
        payload
    }
}
