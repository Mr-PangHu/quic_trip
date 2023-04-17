import { useState, useEffect } from "react";
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4006149_naeew7b1yn.js",
});

export default function TrainTrip() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // 静态页面测试用
    const tmpData = [];
    for (let i = 0; i < 4; i++) {
      tmpData.push({
        title: "京广高铁",
        detail: "天南地北任我游",
        url: "https://pic.c-ctrip.com/railway_v2/zzz_236152_3.jpg",
        hot: true,
      });
    }
    setData([...tmpData]);
  }, []);
  return (
    <div className="train-trip">
      <h2>坐火车去旅行</h2>
      <p>热门火车旅游线路</p>
      <ul className="train-trip-list">
        {data.map((item) => (
          <li>
            <img src={item.url} />
            {item.hot ? (
              <div className="hot">
                <IconFont
                  type="icon-hot-for-ux-fill"
                  className="hot-icon"
                ></IconFont>
                推荐
              </div>
            ) : null}
            {/* 描述 */}
            <div className="train-trip-detail">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
