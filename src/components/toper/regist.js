import { Modal, Form, Input, Select, Button } from "antd";
import {
  ManOutlined,
  WomanOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;


export default function Regist(props) {
  const [RegisterForm] = Form.useForm();
  const handelRegister = async () => {
    axios.post("http://localhost:3000/api/mock/register",{
      id: new Date().getTime(),
      username: RegisterForm.getFieldValue('用户名'),
      gender: RegisterForm.getFieldValue('性别'),
      email_address: RegisterForm.getFieldValue('邮箱'),
      trip_declaration: RegisterForm.getFieldValue('旅行宣言'),
      password: RegisterForm.getFieldValue('密码')
    }).then(res => {
      // console.log(res)
      if (res.data.status === 200) {
        alert('注册成功')
        props.handleCancel()
      } else if (res.data.status === 202) {
        alert('用户名已存在')
        RegisterForm.resetFields()
      }
      RegisterForm.resetFields()
    }).catch(err => {
        console.log('操作失败' + err)
    })
  }

  return (
    <div>
      <Modal
        title="欢迎加入旅程"
        open={props.isModalOpen}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        centered
        footer={null}
      >
        <Form form={RegisterForm}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          {/* 用户名 */}
          <Form.Item
            name="用户名"
            label="用户名"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          {/* 性别 */}
          <Form.Item
            name="性别"
            label="性别"
            rules={[
              {
                required: true,
                message: "请选择性别!",
              },
            ]}
          >
            <Select placeholder="请选择性别">
              <Option value="男">
                <ManOutlined className="regist-gender"></ManOutlined> 男
              </Option>
              <Option value="女">
                <WomanOutlined className="regist-gender"></WomanOutlined> 女
              </Option>
              <Option value="其它">
                <QuestionOutlined className="regist-gender"></QuestionOutlined>{" "}
                其它
              </Option>
            </Select>
          </Form.Item>
          {/* 邮箱 */}
          <Form.Item
            name="邮箱"
            label="邮箱"
            rules={[
              {
                type: "email",
                message: "输入的邮箱格式有误!",
              },
              {
                required: true,
                message: "请输入邮箱!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* 旅游宣言 */}
          <Form.Item
            name="旅行宣言"
            label="旅行宣言"
            rules={[
              {
                required: true,
                message: "请输入旅行宣言",
              },
            ]}
          >
            <Input.TextArea
              showCount
              placeholder="我的旅行宣言"
              autoSave={false}
              maxLength={150}
            />
          </Form.Item>
          {/* 密码 */}
          <Form.Item
            name="密码"
            label="密码"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          {/* 确认密码 */}
          <Form.Item
            name="确认密码"
            label="确认密码"
            dependencies={["密码"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "请重新输入密码!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("密码") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入密码不符!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
        {/* 注册按钮 */}
        <Button className="regist-button" type="primary" size="large" onClick={handelRegister}>
          注册
        </Button>
      </Modal>
    </div>
  );
}