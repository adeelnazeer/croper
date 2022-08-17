import React, { useEffect, useState } from "react";
import "./style.scss";

import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { apiPath } from "../../config";
import FormData from "form-data";
import { useHistory } from "react-router-dom";
import Dummy from "../../static/assests/2020-01-27.png";

export default () => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
  });
  let user = JSON.parse(localStorage.getItem("user"));
  let token = localStorage.getItem("Token");

  useEffect(() => {
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${apiPath}/profile/detail/${user?.id}`, header)
      .then((response) => {
        setData(response?.data?.data);
      });
  }, []);

  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      const form = new FormData();
      form.append("avatar", e.target.files[0]);
      const header = {
        headers: {
          Authorization: `Bearer  ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(`${apiPath}/avatar/${user?.id}`, form, header)
        .then((response) => {
          console.log("res", response);
          message.success("Profile picture updated successfully");
        })
        .catch((err) => {
          message.error("Something went wrong try again");
        });
    }
  }

  const onFinish = (values) => {
    let payload = {
      name: data?.name,
      email: data?.email,
      phone_number: data?.phone_number,
      password: values?.password,
      password_confirmation: values?.password_confirmation,
    };
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${apiPath}/profile/${user?.id}`, payload, header)
      .then((response) => {
        console.log("res", response);
        message.success("Profile updated successfully");
        // window.location.reload();
      })
      .catch((err) => {
        message.error("Something went wrong try again");
      });
  };
  console.log("data", data);
  return (
    <>
      {/* Main Container Start */}
      <div className="container-fluid administrator-div pd-top-30">
        <div className="container pd-top-30">
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
              // name: data?.name,
              email: user?.email,
              phone_number: user?.phone_number,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            onFinish={onFinish}
          >
            <Form.Item label="Avatar">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input type="file" accept="image/*" onChange={onSelectFile} />

                <div>
                  <img
                    src={
                      data?.profile_image_path === null
                        ? Dummy
                        : data?.profile_image_path
                    }
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item label="Name">
              <Input
                value={data?.name}
                onChange={(e) => {
                  setData((st) => ({
                    ...st,
                    name: e.target.value,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input readOnly value={data?.email} />
            </Form.Item>
            <Form.Item label="Phone Number">
              <Input
                value={data?.phone_number}
                onChange={(e) => {
                  setData((st) => ({
                    ...st,
                    phone_number: e.target.value,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password_confirmation"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {/* Main Container Ends */}
    </>
  );
};
