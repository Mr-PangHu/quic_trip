import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined, MinusCircleOutlined, DragOutlined, FullscreenOutlined, BgColorsOutlined, UndoOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';

export default function Wuzhangai(props) {
  const handleZoomIn = () => props.zoomIn(props.zoomvalue + 0.1)
  const handleZoomOut = () => props.zoomOut(props.zoomvalue - 0.1)
  const handleLine = () => props.showLines(!props.showlinevalue);
  const handleBigcursor = () => {
    props.bigcursorvalue == 'auto' ? props.bigCursor("url('/Cursor.svg'), auto") : props.bigCursor('auto')
  }
  const handleHighcontrast = () => {
    props.filtervalue == 'none' ? props.Filter('invert(100%)') : props.Filter('none')
  }
  const handleReset = () => props.Reset(1.0);

  const handleClose = () => props.Isshow(!props.isshowvalue)
  
  return (
    <div style={{
    width: '100%',
    height: '80px',
    backgroundColor: 'black',
    // display: isShow ? 'flex' : 'none',
    display: 'flex',
    paddingLeft: '35%',
    paddingRight: '35%',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    position: 'relative', 
    zIndex: '99999'
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
  );
}
