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
    THOUGHTVIEW_FAILURE
  } from "../Actions/ActionConsts";


const thoughts = {};
const thought=null;
const thoughtID = null
const initialState = { thoughts, thoughtID,thought };
export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {

      case  THOUGHTADDEDIT_BEGIN:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case THOUGHTADDEDIT_SUCCESS:
        return {
          ...state,
          thought: payload,
          loading: false,
          error: null,
        };
      case THOUGHTADDEDIT_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload,
        };

      case  THOUGHTVIEW_BEGIN:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case THOUGHTVIEW_SUCCESS:
        return {
          ...state,
          thought: payload,
          loading: false,
          error: null,
        };
      case THOUGHTVIEW_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload,
        };

      case  THOUGHTLISTING_BEGIN:
        return {
          ...state,
          loading:true,
          error:null
        };
      case THOUGHTLISTING_SUCCESS:
        return {
          ...state,
          thoughts: payload,
          loading: false,
          error: null,
        };
      case THOUGHTLISTING_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload,
        };
  
      case THOUGHTDELETE_BEGIN:
        return {
          ...state,
          error:null,
        };
      case THOUGHTDELETE_SUCCESS:
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
      default:
        return state;
    }
  }
  