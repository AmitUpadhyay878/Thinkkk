import request from "../../util/request";
import { exceptionHandler } from "../../util/common";
import {
  QUESTIONANSWERLISTING_BEGIN,
  QUESTIONANSWERLISTING_SUCCESS,
  QUESTIONANSWERLISTING_FAILURE,
  QUESTIONANSWERDELETE_BEGIN,
  QUESTIONANSWERDELETE_SUCCESS,
  QUESTIONANSWERDELETE_FAILURE,
  QUESTIONANSWERADDEDIT_BEGIN,
QUESTIONANSWERADDEDIT_SUCCESS,
QUESTIONANSWERADDEDIT_FAILURE
} from "./actionConsts";

export const questionanswerListingStart = () => ({
  type: QUESTIONANSWERLISTING_BEGIN,
});

export const questionanswerListingSuccess = (payload) => ({
  type: QUESTIONANSWERLISTING_SUCCESS,
  payload,
});

export const questionanswerListingFailure = (payload) => ({
  type: QUESTIONANSWERLISTING_FAILURE,
  payload
});

export const questionanswerListingAction = (payload) => {
  return (dispatch) => {
    dispatch(questionanswerListingStart());
    return request("POST", `/question-answer/list`, payload, {}, true)
      .then(({ data }) => {
        dispatch(questionanswerListingSuccess(data));
      })
      .catch((error) => {
        dispatch(questionanswerListingFailure(exceptionHandler(error).message));
        const response = exceptionHandler(error);
        FailureToastNotification(response?.message);
      });
  };
};

export const questionanswerAddEditStart = () => ({
    type: QUESTIONANSWERADDEDIT_BEGIN,
  });
  
  export const questionanswerAddEditSuccess = (payload) => ({
    type: QUESTIONANSWERADDEDIT_SUCCESS,
    payload,
  });
  
  export const questionanswerAddEditFailure = () => ({
    type: QUESTIONANSWERADDEDIT_FAILURE,
  });
  
  export const questionanswerAddEditAction = (payload) => {
    return (dispatch) => {
      dispatch(questionanswerAddEditStart());
      return request("POST", `/question-answer/add-edit`, payload, {}, true)
        .then(({ data }) => {
          dispatch(questionanswerAddEditSuccess(data));
        })
        .catch((error) => {
          dispatch(questionanswerAddEditFailure(exceptionHandler(error).message));
        });
    };
  };
  
export const questionanswerDeleteStart = () => ({
    type:  QUESTIONANSWERDELETE_BEGIN,
  });
  
  export const questionanswerDeleteSuccess = (payload) => ({
    type: QUESTIONANSWERDELETE_SUCCESS,
    payload,
  });
  
  export const questionanswerDeleteFailure = () => ({
    type: QUESTIONANSWERDELETE_FAILURE,
  });
  
  
  export const questionanswerDeleteAction= (payload)=>{
    return (dispatch) => {
      dispatch(questionanswerDeleteStart())
      return request("POST", `/question-answer/delete`, payload,{},true)
          .then(({ data }) => {
              dispatch(questionanswerDeleteSuccess(data))   
          })
          .catch((error) => {
              dispatch(questionanswerDeleteFailure(exceptionHandler(error).message))
          })
  }
  }
