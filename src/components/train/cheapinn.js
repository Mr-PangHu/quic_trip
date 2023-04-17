import { useEffect, useState } from "react";
import TrainSelector from "./trainselector";
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4006149_naeew7b1yn.js",
});

export default function CheapInn() {
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    setList(["上海", "北京", "杭州", "成都", "广州", "天津"]);
    // 静态页面测试用
    const tmpData = [];
    for (let i = 0; i < 4; i++) {
      tmpData.push({
        title: "上海延安饭店",
        rate: "6.4",
        price: "823",
        img: "http://dimg04.c-ctrip.com/images/1mc5312000aeqa8x20F82_C_400_600_R5_Q70.jpg",
        hot: true,
      });
    }
    setData([...tmpData]);
  }, []);

  const [ind, setInd] = useState(0);
  return (
    <div className="train-inn">
      <h2>优惠酒店</h2>
      <TrainSelector data={list} setInd={setInd} ind={ind}></TrainSelector>
      <ul className="train-inn-list">
        {data.map((item, ind) => (
          <li key={`${ind}`}>
            <img src={item.img} />
            <h3>{item.title}</h3>
            <p className="rate">
              <span className="real">{item.rate}</span>/5
            </p>
            <p className="price">
              ￥<span className="real">{item.price}</span>
            </p>
            {item.hot ? (
              <div className="hot">
                <IconFont
                  type="icon-hot-for-ux-fill"
                  className="hot-icon"
                ></IconFont>
                推荐
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
