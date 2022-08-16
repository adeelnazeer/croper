import React from "react";
import Sidenav from "../components/sidenav/index";
import Updateprofile from "../components/update-profile/index";
import { NotificationContainer } from "react-notifications";
export default () => {
  return (
    <>
      <div className="is-flex">
        <NotificationContainer enterTimeout={500} leaveTimeout={500} />
        <Sidenav />
        <Updateprofile />
      </div>
    </>
  );
};
