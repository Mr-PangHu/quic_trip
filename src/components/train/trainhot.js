import { useEffect, useState } from "react";
import TrainSelector from "./trainselector";

export default function TrainHot() {
  const [ind, setInd] = useState(0);
  const [list, setList] = useState([
    "上海",
    "北京",
    "杭州",
    "广州",
    "南京",
    "天津",
    "武汉",
    "西安",
  ]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataTmp = [];
    // 静态页面测试用
    for (let i = 0; i < 9; i++) {
      dataTmp.push({
        start: "上海",
        end: "北京",
        price: "553.0",
      });
    }
    setData([...dataTmp]);
  }, []);

  return (
    <div className="train-hot">
      <h2>热门路线</h2>
      <TrainSelector data={list} setInd={setInd} ind={ind}></TrainSelector>
      <ul className="train-hot-list">
        {data.map((item) => (
          <li>
            <p>
              {item.start}到{item.end}火车票
            </p>
            <p>
              <span className="price">
                ￥<span>{item.price}</span>
              </span>
              起
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
