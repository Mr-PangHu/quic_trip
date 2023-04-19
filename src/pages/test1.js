import Wuzhangai from "../components/wuzhangai";
import React, { useState, useEffect } from 'react';

export default function Test1() {

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
      isshowvalue={isShow}/> : null}
      <div style={{display: showLines ? 'block' : 'none'}}>
        <div className="vertical-line" style={{ left: xPos,position: 'absolute',top: 0,width: 5,height: '100%',backgroundColor: 'red',zIndex: -1}}></div>
        <div className="horizon-line" style={{ top: yPos,position: 'absolute',left: 0,width: '100%',height: 5,backgroundColor: 'red',zIndex: -1}}></div>
      </div>
      <button onClick={() => setisShow(!isShow)}  style={{zoom: zoom}}>点击</button>
    </div>
  );
}
