import {
    DASHBOARDSTATUS_BEGIN,
    DASHBOARDSTATUS_SUCCESS,
    DASHBOARDSTATUS_FAILURE,
  } from "../Actions/ActionConsts";
  
  const dashboardStatus={}
  const initialState = dashboardStatus
    ? { dashboardStatus }
    : { dashboardStatus: null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case DASHBOARDSTATUS_BEGIN:
        return {
          ...state,
        };
      case DASHBOARDSTATUS_SUCCESS:
        return {
          ...state,
          dashboardStatus: payload,
          loading: false,
          error: null,
        };
      case DASHBOARDSTATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }
  