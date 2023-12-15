import request from '../../util/request'
import { exceptionHandler } from '../../util/common'
import {
    FACT_BEGIN,
    FACT_SUCCESS,
    FACT_FAILURE,
    FACTLISTING_BEGIN,
    FACTLISTING_SUCCESS,
    FACTLISTING_FAILURE,
    FACTVIEW_BEGIN,
    FACTVIEW_SUCCESS,
    FACTVIEW_FAILURE,
    FACTDELETE_BEGIN,
    FACTDELETE_SUCCESS,
    FACTDELETE_FAILURE,
    ACTIONITEM_ERROR_RESET
} from './actionConsts'
import { FailureToastNotification } from '../../components/ToastServerError/ToasterMessage'

export const factStart = () => ({
    type: FACT_BEGIN
})

export const factSuccess = (payload) => ({
    type: FACT_SUCCESS,
    payload
})

export const factFailure = (payload) => ({
    type: FACT_FAILURE,
    payload
})

export const factAddAction = (payload, callback) => {
    return (dispatch) => {
        dispatch(factStart())
        return request('POST', `/fact/add-edit`, payload, {}, true)
            .then(({ data }) => {
                dispatch(factSuccess(data))
                callback()
            })
            .catch((error) => {
                dispatch(factFailure(exceptionHandler(error).message))
                const response = exceptionHandler(error)
                FailureToastNotification(response?.message)
                // dispatch(actionItemFailure(response.message));
            })
    }
}

export const factListingStart = () => ({
    type: FACTLISTING_BEGIN
})

export const factListingSuccess = (payload) => ({
    type: FACTLISTING_SUCCESS,
    payload
})

export const factListingFailure = (payload) => ({
    type: FACTLISTING_FAILURE,
    payload
})

export const factListAction = (payload) => {
    return (dispatch) => {
        dispatch(factListingStart())
        return request('POST', `/fact/list`, payload, {}, true)
            .then(({ data }) => {
                dispatch(factListingSuccess(data))
            })
            .catch((error) => {
                dispatch(factListingFailure(exceptionHandler(error).message))
                let response = exceptionHandler(error)
                FailureToastNotification(response.message)
            })
    }
}

export const factDeleteStart = () => ({
    type: FACTDELETE_BEGIN
})

export const factDeleteSuccess = (payload) => ({
    type: FACTDELETE_SUCCESS,
    payload
})

export const factDeleteFailure = () => ({
    type: FACTDELETE_FAILURE
})

export const factDeleteAction = (payload) => {
    return (dispatch) => {
        dispatch(factDeleteStart())
        return request('POST', `/fact/delete`, payload, {}, true)
            .then(({ data }) => {
                dispatch(factDeleteSuccess(data))
            })
            .catch((error) => {
                dispatch(factDeleteFailure(exceptionHandler(error).message))
            })
    }
}
