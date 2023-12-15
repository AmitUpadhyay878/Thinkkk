import {
  ADD_EDIT_QA_BEGIN,
  ADD_ANSWER_SUCCESS,
  ADD_QUESTION_SUCCESS,
  ADD_EDIT_QA_FAILURE,
  EDIT_ANSWER_SUCCESS,
  EDIT_QUESTION_SUCCESS,
  LISTING_QA_BEGIN,
  LISTING_QA_SUCCESS,
  LISTING_QA_FAILURE,
  QUESTION_DELETE_BEGIN,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAILURE,
  ANSWER_DELETE_BEGIN,
  ANSWER_DELETE_SUCCESS,
  ANSWER_DELETE_FAILURE,
} from "../Actions/actionConsts";

const initialState = {
  questionsanswers: [],
  loading: false,
  error: null,
};

function qandaReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case QUESTION_DELETE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case QUESTION_DELETE_SUCCESS:
      // const findObject = (arr, DelQueId) =>
        // arr.map((a) => {
        //   if (a.questionId === DelQueId) {
          
        //     arr.filter((a) => a.questionId !== DelQueId);
        //   } else {
        //     findObject(a.answers ?? a.question, DelQueId);
        //     return a;
        //   }
        // });
      // const newArray = findObject(state?.questionsanswers, payload.questionId);
      return {
        ...state,
        loading: false,
        error: null,
        // questionsanswers: newArray,
      };
    case QUESTION_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ANSWER_DELETE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ANSWER_DELETE_SUCCESS:
      const findObject2 = (arr, DelAnsId) =>
        arr.filter((a) => {
          return a.answerId === DelAnsId;
        });
      const newArray2 = findObject2(state?.questionsanswers, payload.answerId);
      return {
        ...state,
        loading: false,
        error: null,
        questionsanswers: newArray2,
      };
    case ANSWER_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LISTING_QA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LISTING_QA_SUCCESS: {
      return {
        ...state,
        questionsanswers: action.payload.data,
        error: null,
        loading: false,
      };
    }
    case LISTING_QA_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case ADD_EDIT_QA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_EDIT_QA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_ANSWER_SUCCESS: {
      // modify the array here for answer
      const findObject = (arr, addId) =>
        arr.map((a) => {
          if (a.questionId === addId) {
            if (!a.answers) {
              a.answers = [];
            }
            a.answers?.push({
              answerId: payload.answerId,
              answerName: payload.answerName,
              level: payload.level,
              question: [],
            });
            return a;
          } else {
            findObject(a.answers ?? a.question, addId);
            return a;
          }
        });
      const newArray = findObject(state.questionsanswers, payload.questionId);
      return {
        ...state,
        loading: false,
        questionsanswers: newArray,
        error: null,
      };
    }

    case EDIT_ANSWER_SUCCESS: {
      const findObject = (arr, editAnsId) =>
        arr.map((a) => {
          if (a.answerId === editAnsId) {
            a.answerName = payload.answerName;
            return a;
          } else {
            findObject(a?.question ?? a?.answers, editAnsId);
            return a;
          }
        });
      const newArray = findObject(state?.questionsanswers, payload.answerId);
      return {
        ...state,
        loading: false,
        error: null,
        questionsanswers: newArray,
      };
    }

    case EDIT_QUESTION_SUCCESS: {
      const findObject = (arr, editQuesId) =>
        arr.map((a) => {
          if (a.questionId === editQuesId) {
            a.questionName = payload.questionName;
            return a;
          } else {
            findObject(a.answers ?? a.question, editQuesId);
            return a;
          }
        });
      const newArray = findObject(state.questionsanswers, payload.questionId);
      return {
        ...state,
        loading: false,
        error: null,
        questionsanswers: newArray,
      };
    }

    case ADD_QUESTION_SUCCESS: {
      // modify the array here for question
      const findObject = (arr, addId) =>
        arr.map((a) => {
          if (a.answerId === addId) {
            a.question.push({
              questionId: payload.questionId,
              questionName: payload.questionName,
              level: payload.level,
              answers: [],
            });
            return a;
          } else {
            findObject(a.answers ?? a.question, addId);
            return a;
          }
        });
      const newArray = findObject(state.questionsanswers, payload.answerId);
      return {
        ...state,
        loading: false,
        questionsanswers: newArray,
        error: null,
      };
    }

    default:
      return state;
  }
}

export default qandaReducer;
