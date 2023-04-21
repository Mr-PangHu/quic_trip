import "@/styles/globals.css";
import "@/styles/sider.css";
import "@/styles/toper.css";
import "@/styles/info.css";
import "@/styles/inn.css";
import "@/styles/boat.css";
import "@/styles/plane.css";
import '@chatui/core/dist/index.css';
// import '@chatui/core/es/styles/index.less';
import "@/styles/chat.css";

import "@/styles/train.css";
import "@/styles/trip.css";
import "@/styles/my.css";
import { useState, useEffect, createContext } from "react";
import Wuzhangai from "../components/wuzhangai"
import Toper from "../components/toper/toper"

export const ValueContext = createContext();

export default function App({ Component, pageProps }) {
const [xPos, setXPos] = useState(0)
const [yPos, setYPos] = useState(0)

const [zoom, setZoom] = useState(1)
const [bigcursor, setBigcursor] = useState('auto')
const [isShow, setisShow] = useState(false)
const [showLines, setShowLines] = useState(false)

const [filter, setFilter] = useState('none')

const handleZoomIn = (val) => setZoom(val)
const handleZoomOut = (val) => setZoom(val)

const handleLine = (val) => setShowLines(val)

const handleBigcursor = (val) => setBigcursor(val)

const handleFilter = (val) => setFilter(val)

const handleReset = (val) => setZoom(val)

const handleClose = (val) => setisShow(val)


useEffect(() => {
  const handleMouseMove = (event) => {
    setXPos(event.pageX);
    setYPos(event.pageY);
  };

  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);

// 处理登录时的token状态和函数
const [token, setToken] = useState(null);
// 根组件刷新时查看本地是否存了token，存了则取出token
useEffect(() => {
  let t = localStorage.getItem("authToken");
  if (t) {
    setToken(t);
  }
}, []);
  return (
    <div style={{cursor: bigcursor}}>
      {isShow ? <Wuzhangai 
        zoomvalue={zoom} 
        zoomIn={handleZoomIn} 
        zoomOut={handleZoomOut}
        showlinevalue={showLines}
        showLines={handleLine}
        bigcursorvalue={bigcursor}
        bigCursor={handleBigcursor}
        filtervalue={filter}
        Filter={handleFilter}
        Reset={handleReset}
        Isshow={handleClose}
        isshowvalue={isShow}
        /> : null}
        <div style={{display: showLines ? 'block' : 'none'}}>
          <div className="vertical-line" style={{ left: xPos,position: 'absolute',top: 0,width: 5,height: '100%',backgroundColor: 'red',zIndex: 100}}></div>
          <div className="horizon-line" style={{ top: yPos,position: 'absolute',left: 0,width: '100%',height: 5,backgroundColor: 'red',zIndex: 100}}></div>
        </div>
      <div style={{zoom: zoom, filter: filter}}>
       <ValueContext.Provider value={{ isShow, setisShow, token, setToken, bigcursor, setBigcursor, showLines, setShowLines, filter, setFilter}}>
        <Component {...pageProps} />
       </ValueContext.Provider>
      </div>
      
  </div>
  );
}
