import React from 'react'
import { Card } from 'antd'
import './index.less'
import axios from '../../axios'
import BaseForm from '../../component/BaseForm'
class Map extends React.Component {
  state = {}

  componentDidMount() {
    this.loadingMap();
  }
  //查询功能回调方法
  handleFilter = (params) => {
    this.params = params;
    axios.requestList(this, 'order/list', this.params)
  }

  //加载地图数据
  loadingMap = () => {
    axios.ajax({
      url: 'map',
      data: {
        params: { page: 1 }
      }
    }).then((res) => {
      if (res.code == 0) {
        this.setState({
          total_count: res.total_count,
        })
        this.renderMap(res.result)
      }
    })
  }
  //地图渲染
  renderMap = (res) => {
    if (res) {
      let list = res.route_list
      this.map = new window.BMap.Map('container');
      //起点坐标
      let gps1 = list[0].split(",")
      let startPoint = new window.BMap.Point(gps1[0], gps1[1])
      //终点坐标
      let gps2 = list[list.length - 1].split(",")
      let endPoint = new window.BMap.Point(gps2[0], gps2[1])
      this.map.centerAndZoom(endPoint, 16);
      //起点图标
      let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      })
      let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon })
      this.map.addOverlay(startMarker)
      //终点图标
      let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      })
      let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon })
      this.map.addOverlay(endMarker)
      //绘制用户行驶路线
      this.drawRoute(res)
      //绘制车辆所在点图标
      this.drawIcon(res)
      //绘制服务区地图
      this.drawServiceArea(res)
      //添加地图控件
      this.addControl();
    }
  }

  //添加地图控件方法
  addControl = () => {
    this.map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    this.map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    this.map.addControl(new window.BMap.OverviewMapControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT }));
  }

  //绘制用户行驶路线
  drawRoute = (res) => {
    let trackPoint = [];
    res.route_list.forEach((item) => {
      let itemPoint = item.split(",")
      let point = new window.BMap.Point(itemPoint[0], itemPoint[1])
      trackPoint.push(point)
    })
    let polyline = new window.BMap.Polyline(trackPoint, {
      strokeColor: 'black',
      strokeWeight: 2,
      strokeOpacity: 1
    })
    this.map.addOverlay(polyline)
  }
  //绘制车辆所在点图标
  drawIcon = (res) => {
    let trackPoint = [];
    res.bike_list.forEach((item) => {
      let itemPoint = item.split(",")
      let point = new window.BMap.Point(itemPoint[0], itemPoint[1])
      let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      })
      let bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon })
      this.map.addOverlay(bikeMarker)
    })
  }
  //绘制服务区地图
  drawServiceArea = (res) => {
    let trackPoint = [];
    for (let i = 0; i < res.service_list.length; i++) {
      let itemPoint = res.service_list[i].split(",")
      trackPoint.push(new window.BMap.Point(itemPoint[0], itemPoint[1]));
    };
    let polygon = new window.BMap.Polygon(trackPoint, {
      strokeColor: '#CE0000',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity: 0.3
    })
    this.map.addOverlay(polygon);
  }

  render() {
    const formList = [{
      type: 'Select',
      label: '城市',
      field: 'city',
      width: 80,
      initialValue: 0,
      optionList: [
        { id: 0, content: '全部' }, { id: 1, content: '天津' },
        { id: 2, content: '上海' }, { id: 3, content: '广州' },
        { id: 4, content: '深圳' }, { id: 5, content: '北京' }]
    }, {
      type: 'DatePicker',
      label: '订单时间'
    }, {
      type: 'Select',
      label: '订单状态',
      field: 'state',
      width: 80,
      initialValue: 0,
      optionList: [
        { id: 0, content: '全部' }, { id: 1, content: '未进行' },
        { id: 2, content: '进行中' }, { id: 3, content: '已结束' }]
    }]

    return (
      <div>
        <Card>
          <BaseForm formList={formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card className='wrapper-map'>
          <div className='title'>共{this.state.total_count}辆共享单车</div>
          <div id='container' ></div>
        </Card>
      </div>
    )
  }
}
export default Map;