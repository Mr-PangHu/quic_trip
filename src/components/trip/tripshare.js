import {
  QuestionCircleOutlined,
  PictureOutlined,
  FileTextOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { List, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "antd/locale/zh_CN";

export default function TripShare() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataT = [];
    // 静态页面测试用
    for (let i = 0; i < 20; i++) {
      dataT.push({
        url: "https://youimg1.c-ctrip.com/target/0102c120008gmz1epE5D9_C_286_190.jpg",
        title: "巴厘岛 | 总有一个假日，要属于bali",
        username: "筱莲",
        avatar:
          "https://dimg04.c-ctrip.com/images/0Z85u120009d7a407CAD8_C_180_180.jpg",
        detail: "是没想到，提笔写此篇 巴厘岛 之行的回忆时，是此番境况。",
        img: "152",
        review: "133",
        watch: "243357",
        jinghua: true,
        toutiao: true,
      });
    }

    for (let i = 10; i < 20; i++) {
      dataT[i].url =
        "https://youimg1.c-ctrip.com/target/01024120008gdaf0e8112_C_286_190.jpg";
    }
    setData([...dataT]);
  }, []);
  return (
    <div>
      {/* 题目 */}
      <div className="trip-share-head">
        <h3>推荐游记</h3>
        <a>
          什么是优质游记？申请必看{" "}
          <QuestionCircleOutlined></QuestionCircleOutlined>
        </a>
      </div>
      {/* 下面的列表展示 */}
      <ConfigProvider locale={locale}>
        <List
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              {
                <div className="trip-share-item">
                  <img src={item.url} className="img" />
                  <div className="trip-share-item-right">
                    <div className="top">
                      <a>{item.title}</a>
                      <div className="user">
                        <img src={item.avatar} className="avatar" />
                        {item.username}
                      </div>
                      <p className="detail">{item.detail}</p>
                    </div>
                    <div className="bottom">
                      <div>
                        <PictureOutlined></PictureOutlined>
                        {item.img}
                      </div>
                      <div>
                        <FileTextOutlined></FileTextOutlined>
                        {item.review}
                      </div>
                      <div>
                        <EyeOutlined></EyeOutlined>
                        {item.watch}
                      </div>
                    </div>
                  </div>
                  {/* 精华或者头条展示 */}
                  <div className="show">
                    {item.jinghua ? (
                      <div className="jinghua">
                        <img src="jinghua.png" />
                      </div>
                    ) : null}
                    {item.toutiao ? (
                      <div className="toutiao">
                        <img src="toutiao.png" />
                      </div>
                    ) : null}
                  </div>
                </div>
              }
            </List.Item>
          )}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
      </ConfigProvider>
    </div>
  );
}
