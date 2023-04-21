/* eslint-disable react-hooks/rules-of-hooks */
import { Modal, Tabs } from "antd";
import { Button, Checkbox, Form, Input, Space, Alert } from "antd";
import { QRCode } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

function userNameAndPassword(props) {
  const [LoginForm] = Form.useForm();
  const [rememberMe, setRememberMe] = useState(false);
  const handleLogin = async () => {
    axios.post("http://localhost:3000/api/mock/login",{
      username: LoginForm.getFieldValue('username'),
      password: LoginForm.getFieldValue('password'),
      rememberMe: rememberMe
    }).then(res => {
      if (res.data.status === 200) {
        alert('登录成功')
        if (rememberMe) {
          localStorage.setItem("authToken", res.data.token);
        }
        setRememberMe(false)
        props.handleCancel()
      } else if (res.data.status === 203) {
        alert('用户不存在')
        LoginForm.resetFields()
      } else if (res.data.status === 202) {
        alert('密码错误')
        LoginForm.resetFields()
      }
      LoginForm.resetFields()
    }).catch(err => {
        console.log('操作失败' + err)
    })
  }

  
  // 用户名密码登录样式
  return (
    <div>
      <Form
        form={LoginForm}
        name="username"
        labelCol={{
          span: 6,
        }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: "请输入用户名！",
            },
          ]}
          style={{ paddingTop: "2rem" }}
        >
          <Input style={{ width: "80%" }} />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        >
          <Input.Password style={{ width: "80%" }} />
        </Form.Item>

        <Form.Item name="remember">
          <Checkbox style={{ marginLeft: "3rem" }} checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}>记住我</Checkbox>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            onClick={handleLogin}
            size="large"
            type="primary"
            htmlType="submit"
            style={{ width: "80%", height: "rem", fontSize: "1rem" }}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function Phone() {
  // 手机号登录样式
  return (
    <div>
      <Form
        name="phone"
        labelCol={{
          span: 6,
        }}
      >
        <Form.Item
          label="手机号"
          name="phonenum"
          rules={[
            {
              required: true,
              message: "请输入正确电话号码！",
              pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"),
            },
          ]}
          style={{ paddingTop: "2rem" }}
        >
          <Space.Compact
            style={{
              width: "80%",
            }}
          >
            <Input />
            <Button style={{ backgroundColor: "#9f1bfa", color: "white" }}>
              发送验证码
            </Button>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          label="验证码"
          name="varifycode"
          rules={[
            {
              required: true,
              message: "请输入验证码！",
            },
          ]}
        >
          <Input style={{ width: "80%" }} />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "80%", height: "2.5rem", fontSize: "1rem" }}
          >
            手机验证登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default function Login(props) {
  const uname = userNameAndPassword(props);
  const phone = Phone();
  
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios.post("http://localhost:3000/api/mock/user",{token: storedToken})
      .then(res => {
        if (res.data.status === 200) {
          console.log(res.data.data)
        }
      }).catch(err => {
        console.error(err)
      });
      }
  }, []);
  return (
    <Modal
      title={null}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      centered
      footer={null}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "用户名/密码登录",
            key: "1",
            children: uname,
          },
          {
            label: "短信登录",
            key: "2",
            children: phone,
          },
          {
            label: "扫码登录",
            key: "3",
            children: (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <QRCode
                  errorLevel="H"
                  value="https://ant.design/"
                  icon="https://cdn-icons-png.flaticon.com/512/9379/9379368.png"
                  size={200}
                />
              </div>
            ),
          },
        ]}
      />
    </Modal>
  );
}
