import request from "../../util/request";
import {exceptionHandler} from '../../util/common'
import {
    DASHBOARDSTATUS_BEGIN,
    DASHBOARDSTATUS_SUCCESS,
    DASHBOARDSTATUS_FAILURE,
  } from "./ActionConsts";

  
export const dashboardStatusStart = () => ({
    type: DASHBOARDSTATUS_BEGIN,
  });
  
  export const dashboardStatusSuccess = (payload) => ({
    type: DASHBOARDSTATUS_SUCCESS,
    payload,
  });
  
  export const dashboardStatusFailure = () => ({
    type: DASHBOARDSTATUS_FAILURE,
  });

  
export const dashboardAction= (payload)=>{
    return (dispatch) => {
      dispatch(dashboardStatusStart())
      return request("POST", `dashboard/view`, payload,{},true)
          .then(({ data }) => {
              dispatch(dashboardStatusSuccess(data))
            //    return new Promise(() => {Promise.resolve()})  
          })
          .catch((error) => {
              dispatch(dashboardStatusFailure(exceptionHandler(error).message))
        //    return new Promise(() => {Promise.reject()})  
          })
  }
  }