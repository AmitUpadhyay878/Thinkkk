import { ACTIONITEM_BEGIN, ACTIONITEM_SUCCESS, ACTIONITEM_FAILURE, ACTIONITEMDELETE_BEGIN, ACTIONITEMDELETE_FAILURE, ACTIONITEMDELETE_SUCCESS, ACTIONITEMLISTING_BEGIN, ACTIONITEMLISTING_FAILURE, ACTIONITEMLISTING_SUCCESS } from "../Actions/actionConsts";

const actionitems = [];
const actionitemsID = null
const initialState = { actionitems, actionitemsID };


export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case ACTIONITEM_BEGIN:
      return {
        ...state,error: null,
      }
    case ACTIONITEM_SUCCESS:
      let isExist = false
      state.actionitems.map((i) => {
        if (i.actionId === payload.actionId) {     
          isExist = true
          i.isCompleted = payload.isCompleted
          i.actionName = payload.actionName
        }
      }
      )
      if (isExist) {
        return {
          ...state,
          actionitems: state.actionitems,
          loading: false,
          error: null,
        }
      } else {

        return {
          ...state,
          actionitems: [...state.actionitems, payload],
          loading: false,
          error: null,
        }
      }
    case ACTIONITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case ACTIONITEMLISTING_BEGIN:
      return {
        ...state,error: null,loading:true
      };
    case ACTIONITEMLISTING_SUCCESS:
      return {
        ...state,
        actionitems: payload.data,
        loading: false,
        error: null,
      };
    case ACTIONITEMLISTING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ACTIONITEMDELETE_BEGIN:
      return {
        ...state,error: null,loading:true
      };
    case ACTIONITEMDELETE_SUCCESS:
      return {
        ...state,
        actionitemsID: payload,
        loading: false,
        error: null,
      };
    case ACTIONITEMDELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    ////////// Edit ////////
    // case ACTIONITEMEDIT_BEGIN :
    //   return{
    //     ...state
    //   }
    // case ACTIONITEMEDIT_SUCCESS :
    //   return{
    //     ...state,
    //     actionitemsID : payload,
    //     loading : false,
    //     error : null,
    //   }
    // case ACTIONITEMEDIT_FAILURE :
    //   return{
    //     ...state,
    //     loading : false,
    //     error : action.payload,
    //   }

    default:
      return state;
  }
}
