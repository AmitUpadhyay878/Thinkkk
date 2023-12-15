import request from "../../util/request";
import { exceptionHandler } from '../../util/common'
import { FailureToastNotification } from "../../Components/ToastServerError/ToasterMessage";
import {

    ADMIN_LOGIN_BEGIN,
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGIN_SUCCESS,
    FORGETPASSWORD_BEGIN,
    FORGETPASSWORD_SUCCESS,
    FORGETPASSWORD_FAILURE,
    LOGOUT,
    RESETPASSWORD_BEGIN,
    RESETPASSWORD_SUCCESS,
    RESETPASSWORD_FAILURE,
    EDITPROFILE,
    VIEWPROFILE,
} from "./ActionConsts";


export const adminLoginRequest = () => ({
    type: ADMIN_LOGIN_BEGIN,
});

export const adminLoginSuccess = (payload) => ({
    type: ADMIN_LOGIN_SUCCESS,
    payload,
});

export const adminLoginFailure = (payload) => ({
    type: ADMIN_LOGIN_FAILURE,
    payload,
});




export const loginAdmin = (payload,callback) => {
    return (dispatch) => {
        dispatch(adminLoginRequest())
        return request("POST", `admin/login`, payload)
            .then(({ data }) => {
                localStorage.setItem("auth", JSON.stringify(data?.meta))
                localStorage.setItem("admin", JSON.stringify(data?.data))

                dispatch(adminLoginSuccess(data?.data))
             callback()
            })
            .catch((error) => {
                dispatch(adminLoginFailure(exceptionHandler(error).message))
                let response = exceptionHandler(error)
                FailureToastNotification(response?.message)
            })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("admin")
    localStorage.removeItem("auth")
    dispatch({ type: LOGOUT })
}

export const forgetPasswordRequest = () => ({
    type: FORGETPASSWORD_BEGIN
})
export const forgetPasswordSuccess = () => ({
    type: FORGETPASSWORD_SUCCESS
})
export const forgetPasswordFailure = (payload) => ({
    type: FORGETPASSWORD_FAILURE,
    payload
})

export const forgetPassword = (payload,callback) => {
    return (dispatch) => {
        dispatch(forgetPasswordRequest())
        return request("POST", `admin/forgot-password`, payload)
            .then(({ data }) => {
                dispatch(forgetPasswordSuccess(data))
                callback()
            })
            .catch((error) => {
                const response = exceptionHandler(error)
                FailureToastNotification(response.message)
                dispatch(forgetPasswordFailure(response.message))
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
        return request("POST", `admin/reset-password`, payload)
            .then(({ data }) => {
                dispatch(resetPasswordSuccess())       
                callback();
            })
            .catch((error) => {
                dispatch(resetPasswordFailure(exceptionHandler(error).message))
                let response = exceptionHandler(error)
                FailureToastNotification(response.message)
            })
    }
}

export const editProfileAction = (payload) => {
 
    localStorage.setItem("admin", JSON.stringify(payload));
    
    return {
        type: EDITPROFILE,
        payload
    }
  }
  export const viewProfileAction = (payload) => {
    localStorage.setItem("admin", JSON.stringify(payload));
    localStorage.getItem("admin", JSON.stringify(payload));
    return {
        type: VIEWPROFILE,
        payload
    }
  }
    