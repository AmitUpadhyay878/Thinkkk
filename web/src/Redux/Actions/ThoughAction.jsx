import request from '../../util/request'
import { exceptionHandler } from '../../util/common'
import {
    THOUGHTVIEW_BEGIN,
    THOUGHTSVIEW_SUCCESS,
    THOUGHTVIEW_FAILURE,
    THOUGHTDELETE_BEGIN,
    THOUGHTDELETE_FAILURE,
    THOUGHTLIST_BEGIN,
    THOUGHTLIST_FAILURE,
    THOUGHTSDELETE_SUCCESS,
    THOUGHTSLIST_SUCCESS,
    THOUGHTADDEDIT_BEGIN,
    THOUGHTADDEDIT_SUCCESS,
    THOUGHTADDEDIT_FAILURE,
    THOUGHT_ERROR_RESET
} from './actionConsts'

export const thoughtErrorReset = () => {
    return {
        type: THOUGHT_ERROR_RESET
    }
}

export const thoughtAddEditStart = () => ({
    type: THOUGHTADDEDIT_BEGIN
})

export const thoughtAddEditSuccess = (payload) => ({
    type: THOUGHTADDEDIT_SUCCESS,
    payload
})

export const thoughtAddEditFailure = (payload) => ({
    type: THOUGHTADDEDIT_FAILURE,
    payload
})

export const thoughtAddEditAction = (payload, callback) => {
    return (dispatch) => {
        dispatch(thoughtAddEditStart())
        return request('POST', `/thought/add-edit`, payload, {}, true)
            .then(({ data }) => {
                dispatch(thoughtAddEditSuccess(data))
                callback()
            })
            .catch((error) => {
                dispatch(thoughtAddEditFailure(exceptionHandler(error).message))
            })
    }
}

export const thoughtViewStart = () => ({
    type: THOUGHTVIEW_BEGIN
})

export const thoughtViewSuccess = (payload) => ({
    type: THOUGHTSVIEW_SUCCESS,
    payload
})

export const thoughtViewFailure = (payload) => ({
    type: THOUGHTVIEW_FAILURE,
    payload
})

export const thoughViewAction = (payload) => {
    return (dispatch) => {
        dispatch(thoughtViewStart())
        return request('POST', `/thought/view`, payload, {}, true)
            .then(({ data }) => {
                dispatch(thoughtViewSuccess(data))
            })
            .catch((error) => {
                dispatch(thoughtViewFailure(exceptionHandler(error).message))
            })
    }
}

export const thoughtListingStart = () => ({
    type: THOUGHTLIST_BEGIN
})

export const thoughtListingSuccess = (payload) => ({
    type: THOUGHTSLIST_SUCCESS,
    payload
})

export const thoughtListingFailure = () => ({
    type: THOUGHTLIST_FAILURE
})

export const thoughListingAction = (payload) => {
    return (dispatch) => {
        dispatch(thoughtListingStart())
        return request('POST', `/thought/list`, payload, {}, true)
            .then(({ data }) => {
                dispatch(thoughtListingSuccess(data))
            })
            .catch((error) => {
                dispatch(thoughtListingFailure(exceptionHandler(error).message))
            })
    }
}

export const thoughtDeleteStart = () => ({
    type: THOUGHTDELETE_BEGIN
})

export const thoughtDeleteSuccess = (payload) => ({
    type: THOUGHTSDELETE_SUCCESS,
    payload
})

export const thoughtDeleteFailure = () => ({
    type: THOUGHTDELETE_FAILURE
})

export const thoughDeleteAction = (payload, callback) => {
    return (dispatch) => {
        dispatch(thoughtDeleteStart())
        return request('POST', `/thought/delete`, payload, {}, true)
            .then(({ data }) => {
                dispatch(thoughtDeleteSuccess(data))
                callback()
                
            })
            .catch((error) => {
                dispatch(thoughtDeleteFailure(exceptionHandler(error).message))
            })
    }
}
