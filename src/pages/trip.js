import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import TripShare from "@/components/trip/tripshare";
const { Search } = Input;

export default function Trip() {
  const [data, setData] = useState({
    member: "118,236,704",
    photo: "841,209,708",
    review: "20,008,631",
    trip: "753,429",
    question: "6,894,038",
  });
  return (
    <div className="trip-wrapper">
      {/* 上部搜索栏 */}
      <div className="trip-top">
        <Search
          placeholder="搜索城市/景点/游记/问答/住宿"
          allowClear
          enterButton="搜索"
          prefix={<SearchOutlined className="trip-search-icon" />}
          size="large"
          className="trip-search"
        />
        <Button className="trip-my">
          我的主页 <div className="homepage-button-arrow"></div>
        </Button>
      </div>
      {/* 中间数据展示栏 */}
      <div className="trip-data">
        <div className="item">{data.member}位会员</div>
        <div className="item">{data.photo}张图片</div>
        <div className="item">{data.review}个点评</div>
        <div className="item">
          {data.trip}篇游记<div className="homepage-button-arrow"></div>
        </div>
        <div className="item">
          {data.question}个问答<div className="homepage-button-arrow"></div>
        </div>
      </div>
      {/* 下面分页展示 */}
      <TripShare></TripShare>
    </div>
  );
}
