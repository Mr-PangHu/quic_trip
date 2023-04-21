import { useState, useEffect } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;

const Map = () => {
  const [query, setQuery] = useState('');
  useEffect(() => {
    // 创建地图实例
    window.map = new window.BMap.Map("map-container");

    // 初始化地图，设置中心点坐标和地图级别
    window.map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11);

    // 添加控件
    window.map.addControl(new window.BMap.NavigationControl());

    // 添加标记
    const marker = new window.BMap.Marker(new window.BMap.Point(116.404, 39.915));
    window.map.addOverlay(marker);
    }, []);
  const handleSearch = () => {
    if (query) {
      const localSearch = new window.BMap.LocalSearch(window.map);
      localSearch.setSearchCompleteCallback((searchResult) => {
        if (searchResult && searchResult.getPoi(0)) {
          const poi = searchResult.getPoi(0);
          window.map.centerAndZoom(poi.point, 11);
        } else {
          console.log('没有搜索到结果');
        }
      });
      localSearch.search(query);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <div>
        {/* <input type="text" value={query} onChange={handleInputChange} />
        <button onClick={handleSearch}>搜索</button> */}
        <Search
            placeholder="请输入出发地"
            onSearch={handleSearch}
            onChange={handleInputChange}
            value={query}
            allowClear
            style={{
                width: 300,
            }}
        />
      </div>
      <div id="map-container" style={{ height: '400px', width: '400px', borderRadius: '8px' }} />
    </div>
  );
};


export default Map;
