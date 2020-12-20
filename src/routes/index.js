import React from "react";
import { Route, Switch } from "react-router-dom";
import Member from "./Member/index";
import Dashboard from "./Dashboard/index";
import asyncComponent from "util/asyncComponent";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`${process.env.PUBLIC_URL}/Stamp`}
        component={asyncComponent(() => import("./Stamp"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/ActiveStamp`}
        component={asyncComponent(() => import("./ActiveStamp"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/ChangeStamp/:inoutTrainStamp?/:visitor_id?`}
        component={asyncComponent(() => import("./ChangeStamp"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/ChangeStampParking/:inoutTrainStamp?/:visitor_id?`}
        component={asyncComponent(() => import("./ChangeStampParking"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/Member`}
        component={asyncComponent(() => import("./Member"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/TranMember`}
        component={asyncComponent(() => import("./TranMember"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/RequireChangeMember`}
        component={asyncComponent(() => import("./RequireChangeMember"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/AddRequireMember`}
        component={asyncComponent(() => import("./AddRequireMember"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/ChangeMember`}
        component={asyncComponent(() => import("./ChangeMember"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/CancelMember`}
        component={asyncComponent(() => import("./CancelMember"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/MemberCard`}
        component={asyncComponent(() => import("./MemberCrard"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/StampReport`}
        component={asyncComponent(() => import("./StampReport"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/StampReportByCutom`}
        component={asyncComponent(() => import("./ReportStampByCustom"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/StampReportByStamp`}
        component={asyncComponent(() => import("./ReportStampByStamp"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/StampReportByuser`}
        component={asyncComponent(() => import("./StampReportByUser"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/stampReportByDepartment`}
        component={asyncComponent(() => import("./ReportStampByDepartment"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/SummaryByStamp`}
        component={asyncComponent(() => import("./ReportSummaryByStamp"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/registeruser`}
        component={asyncComponent(() => import("./RegisterUser"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/UploadFile/:req?`}
        component={asyncComponent(() => import("./UploadFileMember"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/ResetPassword`}
        component={asyncComponent(() => import("./RegisterUser/ResetPassword"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/EditPassword`}
        component={asyncComponent(() => import("./EditPassword"))}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/Dashbord`}
        component={Dashboard}
      />
    </Switch>
  </div>
);

export default App;
