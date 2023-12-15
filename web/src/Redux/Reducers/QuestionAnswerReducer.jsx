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
  } from "../Actions/actionConsts";


  const questionsanswers = {};
const questionsanswersID = null
const initialState = { questionsanswers, questionsanswersID };

export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case  QUESTIONANSWERLISTING_BEGIN:
        return {
          ...state,
        };
      case QUESTIONANSWERLISTING_SUCCESS:
        return {
          ...state,
          questionsanswers: payload,
          loading: false,
          error: null,
        };
      case QUESTIONANSWERLISTING_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case  QUESTIONANSWERDELETE_BEGIN:
        return {
          ...state,
        };
      case  QUESTIONANSWERDELETE_SUCCESS:
        return {
          ...state,
          questionsanswersID: payload,
          loading: false,
          error: null,
        };
      case  QUESTIONANSWERDELETE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

        case  QUESTIONANSWERADDEDIT_BEGIN:
          return {
            ...state,
          };
        case QUESTIONANSWERADDEDIT_SUCCESS:
          return {
            ...state,
            questionsanswersID: payload,
            loading: false,
            error: null,
          };
        case QUESTIONANSWERADDEDIT_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };

      default:
        return state;
    }
  }
  