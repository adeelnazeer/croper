import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "./static/style/main.scss";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard";
import SignUp from "./pages/signuptwo";
import SignIn from "./pages/signin";
import signin from "./components/signin";
import Forget from "./components/signup";
import update from "./pages/updateprofile";
import "react-image-crop/dist/ReactCrop.css";

function App() {
  return (
    <BrowserRouter>
      <Route path={"/"} exact component={signin} />
      <Route path={"/forget"} exact component={Forget} />
      <Route path={"/dashboard"} exact component={Dashboard} />
      <Route path={"/sign-up"} component={SignUp} />
      <Route path={"/update"} component={update} />

      <Route path={"/signin"} component={SignIn} />
    </BrowserRouter>
  );
}

export default App;
