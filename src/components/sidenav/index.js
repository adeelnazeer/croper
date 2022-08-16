import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.scss";
import Logout from "../../static/assests/images/logout.png";
import cookie from "react-cookies";
export default () => {
  const history = useHistory();
  let url = typeof window !== undefined ? window.location.pathname : "";
  const handleData = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("user");
    history.push("/");
  };
  return (
    <>
      <div
        className="container-fluid sidenav text-center pd-top-30"
        style={{
          marginLeft: "unset",
          marginRight: "unset",
        }}
      >
        {/* <button className="sidnav-btn fnt-size-20 fnt-segoeui fnt-weight-600 ">
          Pick Up / Table Orders
        </button> */}
        <div className="fnt-size-20 fnt-tahoma fnt-weight-400 mrg-top-70">
          {/* <Link to="/menumanage">
            <p className={url === "/manumanage" ? " border-left-nav" : ""}>
              Manage Menu
            </p>
          </Link>

          <Link to="/order">
            <p className={url === "/order" ? " border-left-nav" : ""}>
              Pick Up
            </p>
          </Link>
          <Link to="/reserve">
            <p className={url === "/reserve" ? " border-left-nav" : ""}>
              Table Reservations
            </p>
          </Link> */}

          {/* <p className="">Statistics</p>
          <p className="">Promotions</p> */}

          {/* <p className="">Create Post</p>
            <p className="">Settings</p> */}
          <Link to="/dashboard">
            <p className={url === "/dashboard" ? " border-left-nav" : ""}>
              Dashboard Overview
            </p>
          </Link>
          <Link to="/update">
            <p className={url === "/update" ? " border-left-nav" : ""}>
              Update Profile
            </p>
          </Link>
          {/* <Link to="/liveprofile">
          <p className="">Live Profile</p>
          </Link> */}
        </div>
        <div
          style={{
            marginTop: "100px",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              handleData();
            }}
          >
            Logout
          </p>
        </div>
      </div>
    </>
  );
};
