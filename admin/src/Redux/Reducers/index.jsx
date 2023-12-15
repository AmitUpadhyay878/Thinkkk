import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import DashboardReducer from "./DashboardReducer";
import ThoughtReducer from "./ThoughtReducer";
import UserReducer from './UserReducer'

const rootReducer = combineReducers({
    Auth: AuthReducer,
    Dash: DashboardReducer,
    User: UserReducer,
    ThoughtRedu:ThoughtReducer 
  });
  
  export default rootReducer;