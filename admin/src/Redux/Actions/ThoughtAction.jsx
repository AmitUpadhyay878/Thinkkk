import request from "../../util/request";
import { exceptionHandler } from "../../util/common";
import {
  THOUGHTLISTING_BEGIN,
  THOUGHTLISTING_SUCCESS,
  THOUGHTLISTING_FAILURE,
  THOUGHTADDEDIT_BEGIN,
  THOUGHTADDEDIT_SUCCESS,
  THOUGHTADDEDIT_FAILURE,
  THOUGHTDELETE_BEGIN,
  THOUGHTDELETE_SUCCESS,
  THOUGHTDELETE_FAILURE,
  THOUGHTVIEW_BEGIN,
  THOUGHTVIEW_SUCCESS,
  THOUGHTVIEW_FAILURE,
} from "./ActionConsts";


export const thoughtAddEditStart = () => ({
  type: THOUGHTADDEDIT_BEGIN,
});

export const thoughtAddEditSuccess = (payload) => ({
  type: THOUGHTADDEDIT_SUCCESS,
  payload,
});

export const thoughtAddEditFailure = (payload) => ({
  type: THOUGHTADDEDIT_FAILURE,
  payload,
});

export const thoughtAddEditAction= (payload,callback)=>{
  return (dispatch) => {
    dispatch(thoughtAddEditStart())
    return request("POST", `thought/edit`, payload,{},true)
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
  type: THOUGHTVIEW_BEGIN,
});

export const thoughtViewSuccess = (payload) => ({
  type: THOUGHTVIEW_SUCCESS,
  payload,
});

export const thoughtViewFailure = () => ({
  type: THOUGHTVIEW_FAILURE,
});

export const thoughtViewAction= (payload)=>{
  return (dispatch) => {
    dispatch(thoughtViewStart())
    return request("POST", `thought/view`, payload,{},true)
        .then(({ data }) => {
            dispatch(thoughtViewSuccess(data))
        })
        .catch((error) => {
            dispatch(thoughtViewFailure(exceptionHandler(error).message))
        })
}
}

export const thoughtListingStart = () => ({
    type: THOUGHTLISTING_BEGIN,
  });
  
  export const thoughtListingSuccess = (payload) => ({
    type: THOUGHTLISTING_SUCCESS,
    payload,
  });
  
  export const thoughtListingFailure = (payload) => ({
    type: THOUGHTLISTING_FAILURE,
    payload,
  });
  
  export const thoughtListingAction= (payload,callback)=>{
    return (dispatch) => {
      dispatch(thoughtListingStart())
      return request("POST", `thought/list`, payload,{},true)
          .then(({ data }) => {
              dispatch(thoughtListingSuccess(data))
              callback()
          })
          .catch((error) => {
              dispatch(thoughtListingFailure(exceptionHandler(error).message))
          })
  }
  }

   
export const thoughtDeleteStart = () => ({
  type: THOUGHTDELETE_BEGIN,
});

export const thoughtDeleteSuccess = (payload) => ({
  type: THOUGHTDELETE_SUCCESS,
  payload,
});

export const thoughtDeleteFailure = () => ({
  type: THOUGHTDELETE_FAILURE,
});


export const thoughtDeleteAction= (payload,callback)=>{
  return (dispatch) => {
    dispatch(thoughtDeleteStart())
    return request("POST", `thought/delete`, payload,{},true)
        .then(({ data }) => {
            dispatch(thoughtDeleteSuccess(data))   
            callback()
        })
        .catch((error) => {
            dispatch(thoughtDeleteFailure(exceptionHandler(error).message))
        })
}
}