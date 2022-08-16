import React, { useEffect, useState } from "react";
import "./style.scss";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiPath } from "../../config";
import cookie, { load } from "react-cookies";
import Loaderapicomp from "../loader-api/index";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

export default () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();
  let url = typeof window !== "undefined" ? window.location.search : "";
  useEffect(() => {
    if (url === "?dash") {
      NotificationManager.success("successfully logged in . ");
    }
  }, [url]);

  useEffect(() => {
    let token = cookie.load("Token");
    setLoader(true);
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get(apiPath + "/dashboard/daily", header).then((res) => {
      setData(res && res.data);
      setLoader(false);
    });
  }, []);

  const props = {
    name: "file",
    multiple: false,
    maxCount: 1,

    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

    onChange(info) {
      const { status } = info.file;
      console.log("info", info);
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <>
      {/* Main Container Start */}
      <div className="container-fluid administrator-div pd-top-30">
        <div className="container">
          {/* Dashboard Heading Start */}
          {/* Dashboard Heading Ends */}
        </div>
        {/* Dashboard Data Column Starts */}
        <div className="container">
          {!loader ? (
            <Loaderapicomp />
          ) : (
            <div className="dashboard-data-col align-items-center d-flex flex-column mrg-top-60 fnt-weight-600 fnt-size-20 fnt-roboto">
              <div className="pd-top-40 pd-bottom-40">
                <div className="text-center">
                  <Dragger
                    {...props}
                    style={{
                      padding: "20px",
                    }}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Dragger>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Main Container Ends */}
    </>
  );
};
