import request from "../../util/request";
import { exceptionHandler } from "../../util/common";
import {
  USERLISTING_BEGIN,
  USERLISTING_SUCCESS,
  USERLISTING_FAILURE,
  USERADDEDIT_BEGIN,
  USERADDEDIT_SUCCESS,
  USERADDEDIT_FAILURE,
  USERDELETE_BEGIN,
  USERDELETE_SUCCESS,
  USERDELETE_FAILURE,
  USERVIEW_BEGIN,
  USERVIEW_SUCCESS,
  USERVIEW_FAILURE,
} from "./ActionConsts";



export const userViewStart = () => ({
  type:  USERVIEW_BEGIN,
});

export const userViewSuccess = (payload) => ({
  type: USERVIEW_SUCCESS,
  payload,
});

export const userViewFailure = () => ({
  type: USERVIEW_FAILURE,
});

export const userViewAction= (payload,callback)=>{
  return (dispatch) => {
    dispatch(userViewStart())
    return request("POST", `user/view`, payload,{},true)
        .then(({ data }) => {
            dispatch(userViewSuccess(data))
            callback()
        })
        .catch((error) => {
            dispatch(userViewFailure(exceptionHandler(error).message))
        })
}
}

export const userAddEditStart = () => ({
  type:  USERADDEDIT_BEGIN,
});

export const userAddEditSuccess = (payload) => ({
  type: USERADDEDIT_SUCCESS,
  payload,
});

export const userAddEditFailure = (payload) => ({
  type: USERADDEDIT_FAILURE,
  payload,
});

export const userAddEditAction= (payload,callback)=>{
  return (dispatch) => {
    dispatch(userAddEditStart())
    return request("POST", `user/edit`, payload,{},true)
        .then(({ data }) => {
            dispatch(userAddEditSuccess(data))
            callback()
        })
        .catch((error) => {
            dispatch(userAddEditFailure(exceptionHandler(error).message))
        })
}
}

export const userListingStart = () => ({
    type:  USERLISTING_BEGIN,
  });
  
  export const userListingSuccess = (payload) => ({
    type: USERLISTING_SUCCESS,
    payload,
  });
  
  export const userListingFailure = () => ({
    type: USERLISTING_FAILURE,
  });
  
  export const userListingAction= (payload)=>{
    return (dispatch) => {
      dispatch(userListingStart())
      return request("POST", `user/list`, payload,{},true)
          .then(({ data }) => {
              dispatch(userListingSuccess(data))
          })
          .catch((error) => {
              dispatch(userListingFailure(exceptionHandler(error).message))
          })
  }
  }

   
export const userDeleteStart = () => ({
  type: USERDELETE_BEGIN,
});

export const userDeleteSuccess = (payload) => ({
  type: USERDELETE_SUCCESS,
  payload,
});

export const userDeleteFailure = () => ({
  type: USERDELETE_FAILURE,
});


export const userDeleteAction= (payload,callback)=>{
  return (dispatch) => {
    dispatch(userDeleteStart())
    return request("POST", `user/delete`, payload,{},true)
        .then(({ data }) => {
            dispatch(userDeleteSuccess(data))
            callback()   
        })
        .catch((error) => {
            dispatch(userDeleteFailure(exceptionHandler(error).message))
        })
}
}