import { Input, notification } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { Dropdown, Space, Popover } from "antd";
import { QRCode } from "antd";
import { useState, useContext } from "react";
import Login from "./login";

import { ValueContext } from '../../pages/_app';

import dynamic from 'next/dynamic';
const ChatPage = dynamic(() => import('../chat'), { ssr: false });

const { Search } = Input;

const IconFont = createFromIconfontCN({
  // 阿里巴巴矢量图库项目链接
  scriptUrl: "//at.alicdn.com/t/c/font_4006149_1n9h9l4fw7s.js",
});

const items = [
  {
    label: <a href="javascript:;">查看订单</a>,
    key: "0",
  },
];

export default function Toper(props) {
  const [api, contextHolder] = notification.useNotification();
  // 登录弹窗状态
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNotification = () => {
    api.open({
      message: "你触发了搜索操作",
      description:
        "思路描述：此操作用于模拟真实场景，搜索按钮按下后客户端给服务器发送信息，服务器处理搜索结果后返回给前端渲染搜索结果。",
      placement: "top",
    });
  };
  // 登陆按钮点击事件函数，显示弹窗
  const handleLogin = () => {
    setIsModalOpen(true);
  };
  // 弹窗取消按钮操作
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 弹窗确定按钮操作
  const handleOk = () => {
    // 执行登录事件后关闭弹窗
    setIsModalOpen(false);
  };

  const [isShowChat, setisShowChat] = useState(false)

  const { isShow, setisShow } = useContext(ValueContext);

  return (
    <div className="wrapper">
      {isShowChat ? <ChatPage /> : null}

      <img src="./logo.png" className="logo" />
      {contextHolder}
      <Search
        placeholder="搜索旅行地/酒店/景点"
        enterButton
        size="middle"
        onSearch={openNotification}
      />
      {/* 右侧信息栏 */}
      <div
        className="tools"
        style={{
          height: "1.2rem",
          borderRight: "1px solid #ddd",
          paddingRight: "0.5rem",
        }}
      >
        <a className="login" onClick={handleLogin}>
          <IconFont
            type="icon-avatar"
            style={{
              fontSize: "1.8rem",
              marginLeft: "-0.5rem",
              marginRight: "0.5rem",
            }}
          />
          请登录
        </a>
        <a className="regist">注册</a>
        <Login
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
        ></Login>
        {/* 下拉菜单 */}
        <div style={{ width: "6.5rem" }}>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()} className="menu_item">
              <IconFont
                type="icon-shouye"
                style={{ fontSize: "1.2rem", marginRight: "0.2rem" }}
              ></IconFont>
              <Space>
                我的订单
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      {/* 工具栏1 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "8vw",
          height: "3vh",
          borderRight: "1px solid #ddd",
          padding: "0 1vh",
        }}
      >
        <Popover
          onClick={() => setisShowChat(!isShowChat)}
          content={
            <div>
              <p>客服机器人小Q</p>
            </div>
          }
        >
          <IconFont
            type="icon-kefu"
            style={{
              fontSize: "3vh",
              margin: "0 1vh",
              cursor: "pointer",
            }}
          />
        </Popover>

        <Popover
          content={
            <div>
              <div className="mobile-info">
                <div style={{ marginRight: "1vw" }}>
                  <QRCode
                    errorLevel="H"
                    value="https://ant.design/"
                    icon="https://cdn-icons-png.flaticon.com/512/9379/9379368.png"
                  />
                  <p>扫码下载QUIC手机版</p>
                </div>

                <div>
                  <QRCode
                    errorLevel="H"
                    value="https://ant.design/"
                    icon="https://cdn-icons-png.flaticon.com/512/10030/10030452.png"
                  />
                  <p>扫码领QUIC精彩好礼</p>
                </div>
              </div>
              <a>
                QUIC旅行手机版<RightOutlined></RightOutlined>
              </a>
            </div>
          }
        >
          <IconFont
            type="icon-shouji"
            style={{
              fontSize: "3vh",
              margin: "0.5vh 1vh 0 1vh",
              cursor: "pointer",
            }}
          />
        </Popover>
      </div>
      {/* 工具栏2 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "8vw",
          height: "3vh",
          padding: "0 1vh",
        }}
      >
        <Popover
          onClick={() => setisShow(!isShow)}
          content={
            <div>
              <p>无障碍模式</p>
            </div>
          }
        >
          <IconFont
            type="icon-wuzhangaisheshi"
            style={{
              fontSize: "3vh",
              margin: "0 1vh",
              cursor: "pointer",
            }}
          />
        </Popover>

        <Popover
          content={
            <div>
              <p>关怀版</p>
            </div>
          }
        >
          <IconFont
            type="icon-linzhongguanhuaike"
            style={{
              fontSize: "3vh",
              margin: "0 1vh",
              cursor: "pointer",
            }}
          />
        </Popover>
      </div>
    </div>
  );
}
