import React from "react";
import SignIn from "../components/signin/index";
import { NotificationContainer } from "react-notifications";
export default () => {
  return (
    <>
      <div className="is-flex">
        <NotificationContainer enterTimeout={500} leaveTimeout={500} />
        <SignIn />
      </div>
    </>
  );
};
