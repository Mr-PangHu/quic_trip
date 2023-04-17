import { Carousel } from "antd";

export default function AirBanner() {
  return (
    <Carousel
      className="air-small-banner"
      autoplay={true}
      autoplaySpeed={2000}
      draggable={true}
    >
      <div>
        <img src="https://dimg04.c-ctrip.com/images/0zg3e12000awvccxbC694.jpg" />
      </div>
      <div>
        <img src="https://dimg04.c-ctrip.com/images/0zg3q12000aup39a9F63B.jpg" />
      </div>
      <div>
        <img src="https://dimg04.c-ctrip.com/images/0zg2e12000awvcyo69393.jpg" />
      </div>
      <div>
        <img src="https://dimg04.c-ctrip.com/images/0zg5n12000aup5jivD121.jpg" />
      </div>
    </Carousel>
  );
}
