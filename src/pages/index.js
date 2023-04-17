import { Layout, ConfigProvider } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import SiderNav from "@/components/sider/sider";
import Toper from "@/components/toper/toper";
import Info from "@/components/footer/info";
import Inn from "./inn";
import Plane from "./plane";
import Boat from "./boat";
import Train from "./train";
import Trip from "./trip";
import Normal from "./normal";
import MyBook from "./mybook";
import { useEffect, useState } from "react";

// 测试用主页面布局样式
const headerStyle = {
  display: "flex",
  textAlign: "center",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#fff",
  borderBottom: "1px solid #eee",
};
const contentStyle = {
  backgroundColor: "#fff",
};
const siderStyle = {
  backgroundColor: "#fff",
  boxShadow: "3px 3px 20px 1px rgba(0, 0, 0, 0.1)",
  zIndex: "1",
};

const footerStyle = {
  minHeight: "25rem",
  backgroundColor: "#f8fafd",
};

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  // 记录content部分的导航标签
  const [route, setRoute] = useState("Inn");

  var content = <Inn></Inn>;

  if (route == "Inn") content = <Inn></Inn>;
  else if (route == "Train") content = <Train></Train>;
  else if (route == "Boat") content = <Boat></Boat>;
  else if (route == "Plane") content = <Plane></Plane>;
  else if (route == "Trip") content = <Trip></Trip>;
  else if (route == "My") content = <MyBook></MyBook>;
  else content = <Normal></Normal>;

  return (
    <ConfigProvider
      theme={{
        token: {
          wireframe: true,
          colorPrimary: "#9f1bfa",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider style={siderStyle} collapsed={collapsed}>
          <SiderNav
            setcollapsed={setCollapsed}
            collapsed={collapsed}
            setRoute={setRoute}
          ></SiderNav>
        </Sider>
        <Layout>
          <Header style={headerStyle}>
            <Toper setRoute={setRoute}></Toper>
          </Header>
          <Content style={contentStyle}>{content}</Content>
          <Footer style={footerStyle}>
            <Info></Info>
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
