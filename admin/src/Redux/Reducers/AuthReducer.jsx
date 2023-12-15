import {
    ADMIN_LOGIN_BEGIN,
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGIN_SUCCESS,
    LOGOUT,
    FORGETPASSWORD_BEGIN,
    FORGETPASSWORD_SUCCESS,
    FORGETPASSWORD_FAILURE,
    RESETPASSWORD_BEGIN,
    RESETPASSWORD_SUCCESS,
    RESETPASSWORD_FAILURE,
    EDITPROFILE,
    VIEWPROFILE,
  } from "../Actions/ActionConsts";
  
   const auth= JSON.parse(localStorage.getItem("auth"))
  const admin=JSON.parse(localStorage.getItem("admin"))

  const initialState = auth
  ? { isLoggedIn: true, admin, auth }
  : { isLoggedIn: false, admin: null , auth:null };

  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

      case ADMIN_LOGIN_BEGIN:
        return {
          ...state,
          loading: true,
          error:false
        }
        case ADMIN_LOGIN_SUCCESS:
          return {
              ...state,
              isLoggedIn: true,
              admin:payload,
              loading: false,
              error: null
          }
        
      case ADMIN_LOGIN_FAILURE:
        return {
          ...state,
          admin: null,
          loading: false,
          error:payload
        };
      case LOGOUT:
        localStorage.clear()
        return {
          ...state,
          isLoggedIn: false,
          admin: null,
        };
      case FORGETPASSWORD_BEGIN:
        return {
          ...state,
          loading: true
        }
      case FORGETPASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null
        }
      case FORGETPASSWORD_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload
        }
      case RESETPASSWORD_BEGIN:
        return {
          ...state,
          loading: true,
          error :null
        }
      case RESETPASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null
        }
      case RESETPASSWORD_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload
        }
        case EDITPROFILE:
          return {
              ...state,
              admin: payload
          }
  
      case VIEWPROFILE:
          return {
              ...state,
              admin: payload,
              loading: false
          }
          
      default:
        return state;
    }
  }