import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";

import axios from "axios";
import { apiPath } from "../../config";

import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();

  const [componentSize, setComponentSize] = useState("default");
  const [otp, setOtp] = useState(false);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onFinish = (values) => {
    if (otp) {
      axios
        .post(`${apiPath}/otp/verify`, values)
        .then((response) => {
          if (response?.data?.status_code === 200) {
            setOtp(true);
          } else {
            message.error("Something went wrong try again");
          }
        })
        .catch((err) => {
          message.error("Something went wrong try again");
        });
    } else {
      axios
        .post(`${apiPath}/forgot/password`, values)
        .then((response) => {
          if (response?.data?.status_code === 200) {
            setOtp(true);
          } else {
            message.error("Something went wrong try again");
          }
        })
        .catch((err) => {
          message.error("Something went wrong try again");
        });
    }
  };
  return (
    <>
      {/* Main Container Start */}
      <div className="container-fluid administrator-div pd-top-30">
        <div className="container pd-top-30 col-5">
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            onFinish={onFinish}
          >
            <div style={{ margin: "30px 0px" }}>
              <h1 style={{ textAlign: "center" }}>Forget</h1>
            </div>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {otp && (
              <Form.Item
                label="OTP"
                name="otp"
                rules={[
                  {
                    required: otp ? true : false,
                    message: "Please input your Otp!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            )}

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
