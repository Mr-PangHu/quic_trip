import TrainBooker from "@/components/train/trainbooker";
import CheapInn from "@/components/train/cheapinn";
import TrainTrip from "@/components/train/traintrip";
import TrainHot from "@/components/train/trainhot";

export default function Train() {
  return (
    <div className="train-back">
      <div className="train-wrapper">
        {/* 订票组件 */}
        <TrainBooker></TrainBooker>
        {/* 优惠酒店 */}
        <CheapInn></CheapInn>
        {/* 坐火车去旅行 */}
        <TrainTrip></TrainTrip>
        {/* 热门路线 */}
        <TrainHot></TrainHot>
        {/* 展示图 */}
        <img src="train-img.png" className="train-img" />
        {/* 底部图 */}
        <img src="train-img1.png" className="train-img-bottom" />
      </div>
    </div>
  );
}
