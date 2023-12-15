import {
  THOUGHTLIST_BEGIN,
  THOUGHTSLIST_SUCCESS,
  THOUGHTLIST_FAILURE,
  THOUGHTDELETE_BEGIN,
  THOUGHTSDELETE_SUCCESS,
  THOUGHTDELETE_FAILURE,
  THOUGHTVIEW_BEGIN,
  THOUGHTSVIEW_SUCCESS,
  THOUGHTVIEW_FAILURE,
  THOUGHTADDEDIT_BEGIN,
  THOUGHTADDEDIT_SUCCESS,
  THOUGHTADDEDIT_FAILURE,
} from "../Actions/actionConsts";

const thoughts = {};
const thought = null;
const thoughtID = null;
const initialState = { thoughts, thoughtID ,thought};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case THOUGHTVIEW_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case THOUGHTSVIEW_SUCCESS:
      return {
        ...state,
        thought: payload.data,
        loading: false,
        error: null,
      };
    case THOUGHTVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case THOUGHTLIST_BEGIN:
      return {
        ...state,
        loading:true,
        error:null
      };
    case THOUGHTSLIST_SUCCESS:
      return {
        ...state,
        thoughts: payload,
        loading: false,
        error: null,
      };
    case THOUGHTLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case THOUGHTDELETE_BEGIN:
      return {
        ...state,
        loading:true,
        error:false
      };
    case THOUGHTSDELETE_SUCCESS:
      return {
        ...state,
        thoughtID: payload,
        loading: false,
        error: null,
      };
    case THOUGHTDELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case THOUGHTADDEDIT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case THOUGHTADDEDIT_SUCCESS:
      return {
        ...state,
        thoughts: payload,
        loading: false,
        error: null,
      };
    case THOUGHTADDEDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
