import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const Dashboard = ({ match }) => (
  <Switch>
    <Route
      path={`${match.url}/StampDashbord`}
      component={asyncComponent(() => import("./StampDashbord"))}
    />
  </Switch>
);

export default Dashboard;
