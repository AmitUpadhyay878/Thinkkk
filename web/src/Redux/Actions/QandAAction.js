import request from "../../util/request";
import { exceptionHandler } from "../../util/common";
import {
  ADD_EDIT_QA_BEGIN,
  ADD_ANSWER_SUCCESS,
  ADD_QUESTION_SUCCESS,
  ADD_EDIT_QA_FAILURE,
  EDIT_ANSWER_SUCCESS,
  EDIT_QUESTION_SUCCESS,
  QUESTIONANSWER_ERROR_RESET,
  LISTING_QA_BEGIN,
  LISTING_QA_SUCCESS,
  LISTING_QA_FAILURE,
  QUESTION_DELETE_BEGIN,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAILURE,
  ANSWER_DELETE_BEGIN,
  ANSWER_DELETE_SUCCESS,
  ANSWER_DELETE_FAILURE,
} from "./actionConsts";

export const questionAnswerErrorReset = () => ({
  type: QUESTIONANSWER_ERROR_RESET,
});

export const deleteQuestionBegin = () => ({
  type: QUESTION_DELETE_BEGIN,
});
export const deleteQuestionSuccess = () => ({
  type: QUESTION_DELETE_SUCCESS,
});
export const deleteQuestionFailure = () => ({
  type: QUESTION_DELETE_FAILURE,
});

export const DeleteQuestionRequest = (payload, callback) => {
  return (dispatch) => {
    dispatch(deleteQuestionBegin());
    return request("POST", `/question-answer/delete`, payload, {}, true)
      .then(({ data }) => {
        console.log("[payload]", payload);
        dispatch(deleteQuestionSuccess(payload));
        callback();
      })
      .catch((error) => {
        dispatch(deleteQuestionFailure(exceptionHandler(error).message));
      });
  };
};

export const deleteAnswerBegin = () => ({
  type: ANSWER_DELETE_BEGIN,
});
export const deleteAnswerSuccess = () => ({
  type: ANSWER_DELETE_SUCCESS,
});
export const deleteAnswerFailure = () => ({
  type: ANSWER_DELETE_FAILURE,
});

export const DeleteAnswerRequest = (payload, callback) => {
  return (dispatch) => {
    dispatch(deleteAnswerBegin());
    return request("POST", `/question-answer/delete`, payload, {}, true)
      .then(({ data }) => {
        dispatch(deleteAnswerSuccess(payload));
        callback();
      })
      .catch((error) => {
        dispatch(deleteAnswerFailure(exceptionHandler(error).message));
      });
  };
};

export const addEditBegin = () => ({
  type: ADD_EDIT_QA_BEGIN,
});

export const addEditFailure = () => ({
  type: ADD_EDIT_QA_FAILURE,
});

export const listing_QA_Begin = () => ({
  type: LISTING_QA_BEGIN,
});
export const listing_QA_Success = (payload) => ({
  type: LISTING_QA_SUCCESS,
  payload,
});
export const listing_QA_Failure = () => ({
  type: LISTING_QA_FAILURE,
});

export const listingQARequest = (payload) => {
  return (dispatch) => {
    dispatch(listing_QA_Begin());
    return request("POST", `/question-answer/list`, payload, {}, true)
      .then(({ data }) => {
        dispatch(listing_QA_Success(data));
      })
      .catch((error) => {
        dispatch(listing_QA_Failure(exceptionHandler(error).message));
      });
  };
};

// Add New Answer Actions
export const addAnswerSuccess = (payload) => ({
  type: ADD_ANSWER_SUCCESS,
  payload,
});

export const addAnswerRequest = (payload) => {
  return (dispatch) => {
    dispatch(addEditBegin());
    return request("POST", `/question-answer/add`, payload, {}, true)
      .then(({ data }) => {
        dispatch(addAnswerSuccess(data.data));
      })
      .catch((error) => {
        dispatch(addEditFailure(exceptionHandler(error).message));
      });
  };
};

// Edit Answer Actions
export const editAnswerSuccess = (payload) => ({
  type: EDIT_ANSWER_SUCCESS,
  payload,
});

export const editAnswerRequest = (payload) => {
  return (dispatch) => {
    dispatch(addEditBegin());
    return request("POST", `/question-answer/edit`, payload, {}, true)
      .then(({ data }) => {
        dispatch(editAnswerSuccess(data.data));
      })
      .catch((error) => {
        dispatch(addEditFailure(exceptionHandler(error).message));
      });
  };
};

// Add New Question Actions
export const addQuestionSuccess = (payload) => ({
  type: ADD_QUESTION_SUCCESS,
  payload,
});

export const addQuestionRequest = (payload) => {
  return (dispatch) => {
    dispatch(addEditBegin());
    return request("POST", `/question-answer/add`, payload, {}, true)
      .then(({ data }) => {
        dispatch(addQuestionSuccess(data.data));
      })
      .catch((error) => {
        dispatch(addEditFailure(exceptionHandler(error).message));
      });
  };
};

// Edit Answer Actions
export const editQuestionSuccess = (payload) => ({
  type: EDIT_QUESTION_SUCCESS,
  payload,
});

export const editQuestionRequest = (payload) => {
  return (dispatch) => {
    dispatch(addEditBegin());

    return request("POST", `/question-answer/edit`, payload, {}, true)
      .then(({ data }) => {
        dispatch(editQuestionSuccess(data.data));
        // dispatch(editQuestionSuccess(payload))
      })
      .catch((error) => {
        dispatch(addEditFailure(exceptionHandler(error).message));
      });
  };
};
