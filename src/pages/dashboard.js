import React from "react";
import Sidenav from "../components/sidenav/index";
import Dashboard from "../components/dashboard/app";
import { NotificationContainer } from "react-notifications";
export default () => {
  return (
    <>
      <NotificationContainer enterTimeout={500} leaveTimeout={500} />
      <div className="is-flex">
        <Sidenav />
        <Dashboard />
      </div>
    </>
  );
};
