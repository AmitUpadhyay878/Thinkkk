import request from "../../util/request";
import { exceptionHandler } from "../../util/common";
import {
  ACTIONITEMDELETE_BEGIN,
  ACTIONITEMDELETE_FAILURE,
  ACTIONITEMDELETE_SUCCESS,
  ACTIONITEMLISTING_BEGIN,
  ACTIONITEMLISTING_FAILURE,
  ACTIONITEMLISTING_SUCCESS,
  ACTIONITEM_BEGIN,
  ACTIONITEM_FAILURE,
  ACTIONITEM_SUCCESS,
  ACTIONITEM_ERROR_RESET
} from "./actionConsts";
 import { FailureToastNotification } from "../../components/ToastServerError/ToasterMessage";
export const dashboardErrorReset = () => ({
  type:     ACTIONITEM_ERROR_RESET
});

export const actionItemStart = () => ({
  type: ACTIONITEM_BEGIN,
});

export const actionItemSuccess = (payload) => ({
  type: ACTIONITEM_SUCCESS,
  payload,
});

export const actionItemFailure = (payload) => ({
  type: ACTIONITEM_FAILURE,
  payload,
});

export const actionitemAction = (payload, callback) => {
  return (dispatch) => {
    dispatch(actionItemStart());
    return request("POST", `/action-items/add-edit`, payload, {}, true)
      .then(({ data }) => {
        dispatch(actionItemSuccess(data.data));
        callback();
      })
      .catch((error) => {
        dispatch(actionItemFailure(exceptionHandler(error).message));
        const response = exceptionHandler(error);
        FailureToastNotification(response?.message);
        // dispatch(actionItemFailure(response.message));
      });
  };
};

export const actionItemListingStart = () => ({
  type: ACTIONITEMLISTING_BEGIN,
});

export const actionItemListingSuccess = (payload) => ({
  type: ACTIONITEMLISTING_SUCCESS,
  payload,
});

export const actionItemListingFailure = (payload) => ({
  type: ACTIONITEMLISTING_FAILURE,
  payload,
});

export const actionItemListingAction = (payload) => {
  return (dispatch) => {
    dispatch(actionItemListingStart());
    return request("POST", `/action-items/list`, payload, {}, true)
      .then(({ data }) => {
        dispatch(actionItemListingSuccess(data));
      })
      .catch((error) => {
        dispatch(actionItemListingFailure(exceptionHandler(error).message));
        let response = exceptionHandler(error)
        FailureToastNotification(response.message)
      });
  };
};

export const actionItemDeleteStart = () => ({
  type: ACTIONITEMDELETE_BEGIN,
});

export const actionItemDeleteSuccess = (payload) => ({
  type: ACTIONITEMDELETE_SUCCESS,
  payload,
});

export const actionItemDeleteFailure = () => ({
  type: ACTIONITEMDELETE_FAILURE,
});

export const actionItemDeleteAction = (payload,callback) => {
  return (dispatch) => {
    dispatch(actionItemDeleteStart());
    return request("POST", `/action-items/delete`, payload, {}, true)
      .then(({ data }) => {
        dispatch(actionItemDeleteSuccess(data));
        callback()
      })
      .catch((error) => {
        dispatch(actionItemDeleteFailure(exceptionHandler(error).message));
      });
  };
};
