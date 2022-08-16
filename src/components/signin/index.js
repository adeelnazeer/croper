/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./style.scss";
import { apiPath } from "../../config";
import axios from "axios";

import { message } from "antd";
import { Link } from "react-router-dom";
import Loaderapi from "../../static/assests/images/loadersign.gif";
import { useHistory } from "react-router-dom";
export default () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changeText, setChangeText] = useState(false);
  const handleSign = (e) => {
    e.preventDefault();
    setChangeText(true);
    let payLoad = {
      email: email,
      password: password,
    };
    axios
      .post(apiPath + "/login", payLoad)
      .then((response) => {
        console.log("res", response);
        if (response?.data?.status_code === 200) {
          localStorage.setItem("Token", response?.data?.data?.token);
          localStorage.setItem("user", JSON.stringify(response?.data?.data));
          setChangeText(false);
          history.push("/dashboard");
        } else {
          message.error("Some thing went wrong");
          setChangeText(false);
        }
      })
      .catch((res) => {
        message.error("Some thing went wrong");
        setChangeText(false);
      });
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-end pd-top-50">
          <div className="d-flex fnt-segoeui fnt-size-15">
            <p className="pd-top-1">Not a member ?</p>
            <Link to="/sign-up">
              <button className="delete-btn blue">Sign up now</button>
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-center pd-top-50">
          <div className="col-5">
            <div>
              <h5 className="fnt-segoeui fnt-size-29 fnt-weight-600">
                Sign in
              </h5>
            </div>
            <form
              className="pd-top-20 fnt-segoeui fnt-size-20"
              onSubmit={(e) => handleSign(e)}
            >
              <div>
                <label className="fnt-weight-600">
                  Username or Email Address
                </label>
              </div>
              <div>
                <input
                  className="signin-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between pd-top-20">
                <div>
                  <label className="fnt-weight-600">Password</label>
                </div>
                <div>
                  <div type="cancel" className="delete-btn blue mrg-right-30 ">
                    <Link to="/forget">Forget password?</Link>
                  </div>
                </div>
              </div>
              <div>
                <input
                  className="signin-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="pd-top-20">
                <button type="submit" className="signin-btn bg-pink white">
                  {changeText ? (
                    <img src={Loaderapi} alt="Not Found" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
              <div className="signUp-link mrg-top-30">
                <Link to="/sign-up">
                  <button className="delete-btn blue mrg-right-30">
                    Don't have account Sign Up?
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
