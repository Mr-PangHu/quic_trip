import { Card, Button, Popconfirm  } from "antd";
import MainPage from "./mainpage";
import { ConfigProvider, theme } from "antd";
import { createRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Progress } from "antd";
import axios from "axios";
import React from "react";

function MyBookBody(props) {
  const [username, setUsername] = useState('')
  const [email_address, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [trip_declaration, setDeclare] = useState('')

  const [hotelbook, setHotelbook] = useState([])
  const [planebook, setPlanebook] = useState([])
  const [trainbook, setTrainbook] = useState([])
  const [busbook, setBusbook] = useState([])
  const [boatbook, setBoatbook] = useState([])
  var delethotel = []
  var deletplane = []
  var delettrain = []
  var deletbus = []
  var deletboat = []

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios.post("http://localhost:3000/api/mock/bookerinfo",{token: storedToken})
      .then(res => {
        if (res.data.status === 200) {
          const userinfo = res.data.data
          setUsername(userinfo.username)
          setEmail(userinfo.email_address)
          setGender(userinfo.gender)
          setDeclare(userinfo.trip_declaration)
          setHotelbook(userinfo.hotelbook)
          setPlanebook(userinfo.planebook)
          setTrainbook(userinfo.trainbook)
          setBusbook(userinfo.busbook)
          setBoatbook(userinfo.boatbook)
        }
      }).catch(err => {
        console.error(err)
      });
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handledelete = (id) => {
    setHotelbook(hotelbook.filter(hb => hb.id !== id))
    delethotel = hotelbook.filter(hb => hb.id !== id)
    setPlanebook(planebook.filter(pb => pb.id !== id))
    deletplane = planebook.filter(pb => pb.id !== id)
    setTrainbook(trainbook.filter(tb => tb.id !== id))
    delettrain = trainbook.filter(tb => tb.id !== id)
    setBusbook(busbook.filter(bb => bb.id !== id))
    deletbus = busbook.filter(bb => bb.id !== id)
    setBoatbook(boatbook.filter(btb => btb.id !== id))
    deletboat = boatbook.filter(btb => btb.id !== id)
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios.post("http://localhost:3000/api/mock/deletebooker",{
        token: storedToken,
        hotelbook: delethotel,
        planebook: deletplane,
        trainbook: delettrain,
        busbook: deletbus,
        boatbook: deletboat
      })
      .then(res => {
        if (res.data.status === 200) {
          console.log('删除成功')
        }
      }).catch(err => {
        console.error(err)
      });
      }
  }
  
  return (
      <div className="my-wrapper">
        {/* 个人信息 */}
        <Card
          title="个人信息"
          className={props.dark ? "my-card personal-dark" : "my-card personal"}
        >
          <p>
            <span className="my-bald">用户名：</span>{username}
          </p>
          <p>
            <span className="my-bald">邮箱：</span>{email_address}
          </p>
          <p>
            <span className="my-bald">性别：</span>{gender}
          </p>
          <p>
            <span className="my-bald">旅行宣言：</span>{trip_declaration}
          </p>
        </Card>
        {/* 酒店订单 */}
        <Card title="酒店订单" className="my-card">
          <ul>
            {hotelbook.map(hb => (
              <li key={hb.id}> 
              <Popconfirm
                title="删除订单"
                description="你确定删除该订单吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => handledelete(hb.id)}
              >
                <Button danger>删除</Button>
              </Popconfirm>
              <p>
                <span className="my-bald">目的地：</span>{hb.destination}
              </p>
              <p>
                <span className="my-bald">入住日期：</span>{hb.checkinDate}
              </p>
              <p>
                <span className="my-bald">退房日期：</span>{hb.checkoutDate}
              </p>
              <p>
                <span className="my-bald">房间及住客：</span>{hb.RoomCount}房间&nbsp;&nbsp;&nbsp;{hb.AdultCount}成人&nbsp;&nbsp;&nbsp;{hb.ChildCount}儿童
              </p>
              <p>
                <span className="my-bald">酒店级别：</span>{hb.HotelLevel}
              </p>
              <p>
                <span className="my-bald">备注：</span>{hb.description}
              </p>
            </li>
            ))}
          </ul>
        </Card>
        {/* 机票订单 */}
        <Card title="机票订单" className="my-card">
          <ul>
            {planebook.map(pb => (
              <li key={pb.id}>
              <Popconfirm
                title="删除订单"
                description="你确定删除该订单吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => handledelete(pb.id)}
              >
                <Button danger>删除</Button>
              </Popconfirm>
              <p>
                <span className="my-bald">旅程类型：</span>{pb.Triptype}
              </p>
              <p>
                <span className="my-bald">出发地：</span>{pb.StartPlace}
              </p>
              <p>
                <span className="my-bald">目的地：</span>{pb.EndPlace}
              </p>
              <p>
                <span className="my-bald">是否直飞：</span>{pb.Zhifei}
              </p>
              <p>
                <span className="my-bald">机舱类型：</span>{pb.Type}
              </p>
              <p>
                <span className="my-bald">出发日期：</span>{pb.StartDate}
              </p>
              <p>
                <span className="my-bald">返回日期：</span>{pb.EndDate}
              </p>
              <p>
                <span className="my-bald">乘客类型：</span>{pb.AdultCount}成人 {pb.ChildCount}儿童 {pb.EnfantCount}婴儿
              </p>
            </li>
            ))}
          </ul>
        </Card>
        {/* 火车票订单 */}
        <Card title="火车票订单" className="my-card">
          <ul>
            {trainbook.map(tb => (
              <li key={tb.id}>
              <Popconfirm
                title="删除订单"
                description="你确定删除该订单吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => handledelete(tb.id)}
              >
                <Button danger>删除</Button>
              </Popconfirm>
              <p>
                <span className="my-bald">旅程类型：</span>{tb.Triptype}
              </p>
              <p>
                <span className="my-bald">出发地：</span>{tb.StartPlace}
              </p>
              <p>
                <span className="my-bald">目的地：</span>{tb.EndPlace}
              </p>
              <p>
                <span className="my-bald">出发日期：</span>{tb.StartDate}
              </p>
              <p>
                <span className="my-bald">返回日期：</span>{tb.EndDate ? tb.EndDate : '无'} 
              </p>
            </li>
            ))}
          </ul>
        </Card>
        {/* 汽车票订单 */}
        <Card title="汽车票订单" className="my-card">
          <ul>
            {busbook.map(bb => (
              <li key={bb.id}>
              <Popconfirm
                title="删除订单"
                description="你确定删除该订单吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => handledelete(bb.id)}
              >
                <Button danger>删除</Button>
              </Popconfirm>
              <p>
                <span className="my-bald">出发城市：</span>{bb.StartPlace}
              </p>
              <p>
                <span className="my-bald">到达城市：</span>{bb.EndPlace}
              </p>
              <p>
                <span className="my-bald">出发日期：</span>{bb.StartDate}
              </p>
            </li>
            ))}
          </ul>
        </Card>
        {/* 船票订单 */}
        <Card title="船票订单" className="my-card">
          <ul>
            {boatbook.map(btb => (
              <li key={btb.id}>
              <Popconfirm
                title="删除订单"
                description="你确定删除该订单吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => handledelete(btb.id)}
              >
                <Button danger>删除</Button>
              </Popconfirm>
              <p>
                <span className="my-bald">出发城市：</span>{btb.StartPlace}
              </p>
              <p>
                <span className="my-bald">到达城市：</span>{btb.EndPlace}
              </p>
              <p>
                <span className="my-bald">出发日期：</span>{btb.StartDate}
              </p>
            </li>
            ))}
          </ul>
        </Card>
      </div>
    );
}
export default function MyBook() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      setProgress(0);
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 90) {
            clearInterval(timer);
          }
          return Math.min(oldProgress + 10, 90);
        });
      }, 200);
    };

    const handleComplete = () => {
      setLoading(false);
      setProgress(100);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const [isLogin, setisLogin] = useState(false);

  const handleislogin = val => setisLogin(val)

  useEffect(() => {
    if (localStorage.getItem("dark") == "true") setDark(true);
    else setDark(false);
  }, []);
  return dark ? (
    <>
      {loading && (
        <Progress percent={progress} showInfo={false} strokeColor="#9f1bfa" />
      )}
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <MainPage
          setDark={setDark}
          dark={dark}
          open={open}
          setOpen={setOpen}
          content={<MyBookBody dark={dark}></MyBookBody>}
          IsLogin={handleislogin}
        ></MainPage>
      </ConfigProvider>
    </>
  ) : (
    <>
      {loading && (
        <Progress percent={progress} showInfo={false} strokeColor="#9f1bfa" />
      )}
      <MainPage
        setDark={setDark}
        dark={dark}
        open={open}
        setOpen={setOpen}
        content={<MyBookBody dark={dark}></MyBookBody>}
      ></MainPage>
    </>
  );
}