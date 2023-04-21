import { Tabs, ConfigProvider, Button, DatePicker } from "antd";
import { Carousel } from "antd";
import { Radio, Checkbox, Select, Popover, InputNumber } from "antd";
import { CheckOutlined, SwapOutlined } from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import { use, useState } from "react";
import axios from "axios";
import CityPicker from "../common/CityPicker";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "antd/locale/zh_CN";
import AirBanner from "./smallbanner";
const { RangePicker } = DatePicker;
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4006149_h0exp2flkq5.js",
});

export default function PlaneBooker(props) {
  // 设置出发和到达城市
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);
  // 控制机票类型
  const [type, setType] = useState("经济/超经舱");
  const typeChange = (e) => {
    setType(e);
  };
  // 人数
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [enfant, setEnfant] = useState(0);
  // 交换两个城市
  const handelExchange = () => {
    // console.log(start, end);
    let tmp = [...start];
    setStart([...end]);
    setEnd([...start]);
  };
  // 差异天数
  const [day, setDay] = useState(1);
  // 获得差异天数;
  const getDays = (value) => {
    // if (value) console.log(value[0].unix(), value[1].unix());
    if (value)
      setStartDate(value[0].format("YYYY-MM-DD"))
      setEndDate(value[1].format("YYYY-MM-DD"))
      setDay(
        moment(value[1].format("YYYY-MM-DD")).diff(
          value[0].format("YYYY-MM-DD"),
          "days"
        )
      );
  };
  const [Triptype, setTriptype] = useState('')
  const handleTriptype = (e) => {
    if (e.target.value === 1) {
      setTriptype('单程')
    } else if (e.target.value === 2) {
      setTriptype('往返')
    } else {
      setTriptype('多程（含缺口程）')
    }
  }
  const [Zhifei, setZhifei] = useState(false)
  const handleZhifei = (e) => {
    setZhifei(e.target.checked)
  }
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const BookPlane = async () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios.post("http://localhost:3000/api/mock/bookplane", {
        token: storedToken,
        id: new Date().getTime(),
        StartPlace: start[2],
        EndPlace: end[2],
        Triptype: Triptype,
        Zhifei: Zhifei ? '是' : '否',
        Type: type,
        StartDate: startDate,
        EndDate: endDate,
        AdultCount: adult,
        ChildCount: child,
        EnfantCount: enfant
      }).then(res => {
        console.log(res.data.message)
      }).catch(err => {
        console.log('操作失败' + err)
      })
    } else {
      alert('请先登录')
    }
  }

  return (
    <div className={props.dark ? "dark-plane" : null}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: props.dark ? "#3d1155" : "#9f1bfa",
          },
          components: {
            Tabs: {
              colorBgContainer: props.dark ? "#505050" : "white",
              colorText: "white",
              lineWidth: 1,
              colorPrimary: props.dark ? "#fff" : "#000",
              colorBorderSecondary: "rgba(0, 0, 0, 0)",
              colorBorder: "",
              colorFillAlter: props.dark ? "#3d1155" : "#6d0099",
              colorTextHeading: "rgba(0, 0, 0, 0.88)",
              colorPrimaryHover: "#ccc",
              colorPrimaryActive: "#555",
              colorTextDisabled: "white",
            },
          },
        }}
      >
        <Tabs
          type="card"
          items={[
            {
              label: <div className="tabs">国内、国际/中国港澳台</div>,
              key: "国内、国际/中国港澳台",
              children: (
                <div className="air-pannel">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    {/* 单选框 */}
                    <div>
                      <Radio.Group className="air-radio" onChange={handleTriptype}>
                        <Radio value={1}>单程</Radio>
                        <Radio value={2}>往返</Radio>
                        <Radio value={3}>多程（含缺口程）</Radio>
                      </Radio.Group>
                    </div>

                    {/* 下拉菜单 */}
                    <div>
                      <Checkbox onChange={handleZhifei}>仅看直飞</Checkbox>
                      <Select
                        bordered={false}
                        defaultValue="经济/超经舱"
                        onChange={typeChange}
                        style={{
                          width: 160,
                        }}
                        options={[
                          {
                            value: "经济/超经舱",
                            label: (
                              <div className="air-options">
                                {type == "经济/超经舱" ? (
                                  <CheckOutlined className="air-option-icons"></CheckOutlined>
                                ) : (
                                  ""
                                )}
                                <div className="air-op">经济/超经舱</div>
                              </div>
                            ),
                          },
                          {
                            value: "公务/头等舱",
                            label: (
                              <div className="air-options">
                                {type == "公务/头等舱" ? (
                                  <CheckOutlined className="air-option-icons"></CheckOutlined>
                                ) : (
                                  ""
                                )}
                                <div className="air-op">公务/头等舱</div>
                              </div>
                            ),
                          },
                          {
                            value: "公务舱",
                            label: (
                              <div className="air-options">
                                {type == "公务舱" ? (
                                  <CheckOutlined className="air-option-icons"></CheckOutlined>
                                ) : (
                                  ""
                                )}
                                <div className="air-op">公务舱</div>
                              </div>
                            ),
                          },
                          {
                            value: "头等舱",
                            label: (
                              <div className="air-options">
                                {type == "头等舱" ? (
                                  <CheckOutlined className="air-option-icons"></CheckOutlined>
                                ) : (
                                  ""
                                )}
                                <div className="air-op">头等舱</div>
                              </div>
                            ),
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="air-row-2">
                    {/* 城市日期选择器组合 */}
                    <div className="air-cities">
                      <CityPicker
                        setFunc={setStart}
                        className="air-citypicker left"
                        title="出发地"
                        val={start}
                      ></CityPicker>

                      <CityPicker
                        setFunc={setEnd}
                        className="air-citypicker right"
                        title="目的地"
                        val={end}
                      ></CityPicker>
                      {/* 交换按钮 */}
                      <Button
                        className="air-change"
                        type="circle"
                        icon={<SwapOutlined></SwapOutlined>}
                        onClick={(e) => {
                          handelExchange();
                        }}
                      ></Button>
                    </div>
                    {/* 日期选择器组合 */}
                    <ConfigProvider locale={locale}>
                      <RangePicker
                        className="air-range"
                        allowClear={true}
                        defaultValue={[
                          dayjs(
                            moment().format("YYYY-MM-DD"),
                            "YYYY年MM月DD日"
                          ),
                          dayjs(
                            moment().add(1, "days").format("YYYY-MM-DD"),
                            "YYYY年MM月DD日"
                          ),
                        ]}
                        format={"MM月DD日"}
                        placeholder={["出发日期", "返回日期"]}
                        separator={<div className="air-seperator">{day}天</div>}
                        onChange={getDays}
                        // 禁用历史时间
                        disabledDate={(current) => {
                          return current < moment().startOf("day");
                        }}
                        suffixIcon={null}
                      ></RangePicker>
                    </ConfigProvider>
                    {/* 人数选择 */}
                    <div className="air-people">
                      <p className="air-title">乘客类型</p>
                      <Popover
                        placement="bottom"
                        content={
                          <div>
                            {/* 成人 */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "0.5rem",
                                padding: "0.2rem",
                                paddingBottom: "0.5rem",
                                borderBottom: "1px solid #ccc",
                              }}
                            >
                              <div>
                                <IconFont
                                  type="icon-nanxing"
                                  className="air-heads"
                                ></IconFont>
                                <span>
                                  成人
                                  <br />
                                  （12岁及以上）：
                                </span>
                              </div>

                              <InputNumber
                                min={1}
                                defaultValue={1}
                                onChange={(e) => {
                                  setAdult(e);
                                }}
                                style={{
                                  borderRadius: "1rem",
                                  overflow: "hidden",
                                }}
                              />
                            </div>
                            {/* 儿童 */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "0.5rem",
                                padding: "0.2rem",
                                paddingBottom: "0.5rem",
                                borderBottom: "1px solid #ccc",
                              }}
                            >
                              <div>
                                <IconFont
                                  type="icon-ertong"
                                  className="air-heads"
                                ></IconFont>
                                <span>
                                  儿童
                                  <br />
                                  （2~12岁）：
                                </span>
                              </div>

                              <InputNumber
                                min={0}
                                defaultValue={0}
                                style={{
                                  borderRadius: "1rem",
                                  overflow: "hidden",
                                }}
                                onChange={(e) => {
                                  setChild(e);
                                }}
                              />
                            </div>
                            {/* 婴儿 */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "0.2rem",
                              }}
                            >
                              <div>
                                <IconFont
                                  type="icon-ertongpiao"
                                  className="air-heads"
                                ></IconFont>
                                <span>
                                  婴儿
                                  <br />
                                  （14天~2岁）：
                                </span>
                              </div>

                              <InputNumber
                                min={0}
                                defaultValue={0}
                                style={{
                                  borderRadius: "1rem",
                                  overflow: "hidden",
                                }}
                                onChange={(e) => {
                                  setEnfant(e);
                                }}
                              />
                            </div>
                          </div>
                        }
                        trigger="click"
                      >
                        <Button type="text" className="air-people-but">
                          {adult}成人 {child}儿童 {enfant}婴儿
                        </Button>
                      </Popover>
                    </div>
                  </div>
                  <Button className="air-book" onClick={BookPlane}>订购</Button>
                </div>
              ),
            },
            {
              label: <div className="tabs">特价机票</div>,
              key: "特价机票",
              children: <div>Booker</div>,
              disabled: true,
            },
            {
              label: <div className="tabs">航班动态</div>,
              key: "航班动态",
              children: <div>Booker</div>,
              disabled: true,
            },
            {
              label: <div className="tabs">在线选座</div>,
              key: "在线选座",
              children: <div>Booker</div>,
              disabled: true,
            },
            {
              label: <div className="tabs">退票改签</div>,
              key: "退票改签",
              children: <div>Booker</div>,
              disabled: true,
            },
            {
              label: <div className="tabs">更多服务</div>,
              key: "更多服务",
              children: <div>Booker</div>,
              disabled: true,
            },
          ]}
          style={{ boxShadow: "0 0 15px rgba(0,0,0,0.1)" }}
        />
        {/* 小banner */}
        <AirBanner></AirBanner>
      </ConfigProvider>
    </div>
  );
}