import { Modal, Form, Input, Select, Button } from "antd";
import {
  ManOutlined,
  WomanOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

export default function Regist(props) {
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
        <Form
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
            <Select placeholder="select your gender">
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
        <Button className="regist-button" type="primary" size="large">
          注册
        </Button>
      </Modal>
    </div>
  );
}
