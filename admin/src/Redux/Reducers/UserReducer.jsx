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
} from "../Actions/ActionConsts";

const users = {};
const userID = null;
const user = null;
const initialState = { users, userID, user };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USERVIEW_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USERVIEW_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
      };
    case USERVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case USERADDEDIT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USERADDEDIT_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
      };
    case USERADDEDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case USERLISTING_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USERLISTING_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
        error: null,
      };
    case USERLISTING_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case USERDELETE_BEGIN:
      return {
        ...state,
      };
    case USERDELETE_SUCCESS:
      return {
        ...state,
        userID: payload,
        loading: false,
        error: null,
      };
    case USERDELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
