import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import Alert from "./Alert";
import Stamp from "./Stamp";
import ActiveStamp from "./ActiveStamp";
import Member from "./Member";
import Reqirecheang from "./Reqirecheang";
import StampReport from "./StampReport";
import Registeruser from "./Registeruser";
import StampReportParking from "./StampReportParking";
const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  commonData: Common,
  alert: Alert,
  stamp: Stamp,
  active_stamp: ActiveStamp,
  member: Member,
  reqirecheang: Reqirecheang,
  stamp_report: StampReport,
  stamp_report_parking: StampReportParking,
  register_user: Registeruser
});

export default reducers;
