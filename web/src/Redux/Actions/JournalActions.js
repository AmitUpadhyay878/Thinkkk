import request from '../../util/request'
import { exceptionHandler } from '../../util/common'
import {
    JOURNALS_LIST_BEGIN,
    JOURNALS_LIST_FAILURE,
    JOURNALS_LIST_SUCCESS,
    JOURNAL_ADDEDIT_BEGIN,
    JOURNAL_ADDEDIT_FAILURE,
    JOURNAL_ADDEDIT_SUCCESS,
    JOURNAL_DELETE_BEGIN,
    JOURNAL_DELETE_FAILURE,
    JOURNAL_DELETE_SUCCESS,
    JOURNAL_VIEW_BEGIN,
    JOURNAL_VIEW_FAILURE,
    JOURNAL_VIEW_SUCCESS
} from './actionConsts'
import { FailureToastNotification } from '../../components/ToastServerError/ToasterMessage'

export const journalListingStart = () => ({
    type: JOURNALS_LIST_BEGIN
})

export const journalListingSuccess = (payload) => ({
    type: JOURNALS_LIST_SUCCESS,
    payload
})

export const journalListingFailure = () => ({
    type: JOURNALS_LIST_FAILURE
})

export const journalListingAction = (payload, callback) => {
    return (dispatch) => {
        dispatch(journalListingStart())
        return request('POST', `/journal/view`, payload, {}, true)
            .then(({ data }) => {
                dispatch(journalListingSuccess(data))
                callback && callback(data?.data)
            })
            .catch((error) => {
                dispatch(journalListingFailure(exceptionHandler(error).message))
            })
    }
}

export const journalAddEditStart = () => ({
    type: JOURNAL_ADDEDIT_BEGIN
})

export const journalAddEditSuccess = (payload) => ({
    type: JOURNAL_ADDEDIT_SUCCESS,
    payload
})

export const journalAddEditFailure = (payload) => ({
    type: JOURNAL_ADDEDIT_FAILURE,
    payload
})

export const journalAddEditAction = (payload, callback) => {
    return (dispatch) => {
        dispatch(journalAddEditStart())
        return request('POST', `/journal/add-edit`, payload, {}, true)
            .then(({ data }) => {
                dispatch(journalAddEditSuccess(data))
                if (callback){
                    callback()
                }
            })
            .catch((error) => {
                dispatch(journalAddEditFailure(exceptionHandler(error).message))
                const response = exceptionHandler(error);
                FailureToastNotification(response?.message)
            })
    }
}

export const journalDeleteStart = () => ({
    type: JOURNAL_DELETE_BEGIN
})

export const journalDeleteSuccess = (payload) => ({
    type: JOURNAL_DELETE_SUCCESS,
    payload
})

export const journalDeleteFailure = () => ({
    type: JOURNAL_DELETE_FAILURE
})

export const journalDeleteAction = (payload, callback) => {
    return (dispatch) => {
        dispatch(journalDeleteStart())
        return request('POST', `/journal/delete`, payload, {}, true)
            .then(({ data }) => {
                if (callback) {
                    callback()
                }
                dispatch(journalDeleteSuccess(payload))
            })
            .catch((error) => {
                dispatch(journalDeleteFailure(exceptionHandler(error).message))
                const response = exceptionHandler(error);
                FailureToastNotification(response?.message)
            })
    }
}

export const journalViewStart = () => ({
    type: JOURNAL_VIEW_BEGIN
})

export const journalViewSuccess = (payload) => ({
    type: JOURNAL_VIEW_SUCCESS,
    payload
})

export const journalViewFailure = (payload) => ({
    type: JOURNAL_VIEW_FAILURE,
    payload
})

export const journalViewAction = (payload, params, callback) => {
    return (dispatch) => {
        dispatch(journalViewStart())
        return request('POST', `/journal/view`, payload, params, true)
            .then(({ data }) => {
                dispatch(journalViewSuccess(data))
                callback && callback(data.data)
            })
            .catch((error) => {
                dispatch(journalViewFailure(exceptionHandler(error).message))
                const response = exceptionHandler(error);
                FailureToastNotification(response?.message)
            })
    }
}