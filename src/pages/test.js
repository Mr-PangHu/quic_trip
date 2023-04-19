import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined, MinusCircleOutlined, DragOutlined, FullscreenOutlined, BgColorsOutlined, UndoOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';

export default function Wuzhangai() {
  const [zoom, setZoom] = useState(1);
  const [isShow, setisShow] = useState(false);
  const [filter, setFilter] = useState('none');
  const [bigcursor, setBigcursor] = useState('auto');
  
  const handleZoomIn = () => setZoom(zoom + 0.1);
  const handleZoomOut = () => setZoom(zoom - 0.1);


  const [showLines, setShowLines] = useState(false);
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);

  const handleLine = () => setShowLines(!showLines);

  const handleReset = () => setZoom(1.0);

  const handleHighcontrast = () => {
    filter == 'none' ? setFilter('invert(100%)') : setFilter('none')
  }

  const handleBigcursor = () => {
    bigcursor == 'auto' ? setBigcursor("url('/Cursor.svg'), auto") : setBigcursor('auto')
  }

  const handleClose = () => setisShow(!isShow)

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
      <div style={{
        width: '100%',
        height: '80px',
        backgroundColor: 'black',
        display: isShow ? 'flex' : 'none',
        paddingLeft: '35%',
        paddingRight: '35%',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white'
      }}>
        <Button
        type='default'
        style={{color: 'white', display: 'flex', flexDirection: 'column', height: '55px', justifyContent: 'center', alignItems: 'center'}}
        onClick={handleZoomIn}
        >
          <PlusCircleOutlined />
          <p>放大</p>
        </Button>
        <Button
        type='default'
        style={{color: 'white', display: 'flex', flexDirection: 'column', height: '55px', justifyContent: 'center', alignItems: 'center'}}
        onClick={handleZoomOut}
        >
          <MinusCircleOutlined />
          <p>缩小</p>
        </Button>
        <Button
        type='default'
        style={{color: 'white', display: 'flex', flexDirection: 'column', height: '55px', justifyContent: 'center', alignItems: 'center'}}
        onClick={handleLine}
        >
          <DragOutlined />
          <p>辅助线</p>
        </Button>
        <Button
        type='default'
        style={{color: 'white', display: 'flex', flexDirection: 'column', height: '55px', justifyContent: 'center', alignItems: 'center'}}
        onClick={handleBigcursor}
        >
          <FullscreenOutlined />
          <p>大鼠标</p>
        </Button>
        <Button
        type='default'
        style={{color: 'white', display: 'flex', flexDirection: 'column', height: '55px', justifyContent: 'center', alignItems: 'center'}}
        onClick={handleHighcontrast}
        >
          <BgColorsOutlined />
          <p>高对比度</p>
        </Button>
        <Button
        type='default'
        style={{color: 'white', display: 'flex', flexDirection: 'column', height: '55px', justifyContent: 'center', alignItems: 'center'}}
        onClick={handleReset}
        >
          <UndoOutlined />
          <p>重置</p>
        </Button>
        <Button
        type='default'
        style={{color: 'white', display: 'flex', flexDirection: 'column', height: '55px', justifyContent: 'center', alignItems: 'center'}}
        onClick={handleClose}
        >
          <CloseCircleOutlined />
          <p>关闭</p>
        </Button>
      </div>
      <div style={{ zoom: zoom, filter: filter}}>
        <button onClick={() => setisShow(!isShow)}>点击</button>
        <h1>这是一个示例页面</h1>
        <p>这是一个段落</p>
        <div style={{display: showLines ? 'block' : 'none'}}>
            <div className="vertical-line" style={{ left: xPos,position: 'absolute',top: 0,width: 5,height: '100%',backgroundColor: 'red',zIndex: -1}}></div>
            <div className="horizon-line" style={{ top: yPos,position: 'absolute',left: 0,width: '100%',height: 5,backgroundColor: 'red',zIndex: -1}}></div>
        </div>
        
      </div>
    </div>
  );
}
