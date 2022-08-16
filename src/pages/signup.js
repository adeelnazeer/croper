import React from "react";
import SignUp from "../components/signup/index";
import { NotificationContainer } from "react-notifications";
export default () => {
  return (
    <>
      <div className="is-flex">
        <NotificationContainer enterTimeout={500} leaveTimeout={500} />
        <SignUp />
      </div>
    </>
  );
};
