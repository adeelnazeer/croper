import React from "react";
import SignUptwo from "../components/signup-two/index";
import { NotificationContainer } from "react-notifications";
export default () => {
  return (
    <>
      <div className="is-flex">
        <NotificationContainer enterTimeout={500} leaveTimeout={500} />
        <SignUptwo />
      </div>
    </>
  );
};
