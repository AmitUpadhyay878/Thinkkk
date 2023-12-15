import { combineReducers } from "redux";
import ActionItemReducer from "./ActionItemReducer";
import AuthReducer from "./AuthReducer";
import DashboardReducer from "./DashboardReducer";
import qandaReducer from "./QandAReducer";
import ToughtReducer from "./ToughtReducer";
import FactReducer from "./FactReducer";
import JournalReducer from './JournalReducer'
const rootReducer = combineReducers({
    Auth: AuthReducer,
    Dash: DashboardReducer,
    Thought:ToughtReducer,
    ActionItem:ActionItemReducer,
    QueNAns : qandaReducer,
    FactList : FactReducer,
    Journals: JournalReducer
  });
  
export default rootReducer;

