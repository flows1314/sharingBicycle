import React from 'react'
import './detail.less'
import axios from '../../axios'
import { Card } from 'antd'
class Detail extends React.Component {
    state = {
    }
    componentDidMount() {
        this.requestDetial()
    }

    bMap = (res) => {
        // 创建地图实例  
        this.map = new window.BMap.Map("BMap");
        // 创建点坐标  
        // var point = new window.BMap.Point(116.404, 39.915);
        // 初始化地图，设置中心点坐标和地图级别 
        // this.map.centerAndZoom('北京', 11);
        //添加地图控件
        this.addControl();
        //绘制用户行驶路线
        this.drawBikeRoute(res);
        //绘制服务区地图
        this.drawServiceArea(res)
    }

    //添加地图控件方法
    addControl = () => {
        this.map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        this.map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        this.map.addControl(new window.BMap.OverviewMapControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT }));
    }

    //绘制用户行驶路线
    drawBikeRoute = (res) => {
        let startPoint = '';
        let endPoint = '';
        if (res.position_list.length > 0) {
            //创建起始点
            let arr_start = res.position_list[0].p1
            startPoint = new window.BMap.Point(arr_start.lat, arr_start.lon);
            let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42),{
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            });
            // 创建标注对象并添加到地图 
            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
            this.map.addOverlay(startMarker);

            //创建结束点
            let arr_end = res.position_list[0].p10
            endPoint = new window.BMap.Point(arr_end.lat, arr_end.lon);
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            });
            let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
            this.map.addOverlay(endMarker);
        }
        let trackPoint = [];
        for (var i = 0; i < Object.keys(res.position_list[0]).length; i++) {
            let itemPoint = res.position_list[0][`p${i + 1}`];
            trackPoint.push(new window.BMap.Point(itemPoint.lat, itemPoint.lon))
        };
        let polyline = new window.BMap.Polyline(trackPoint, {
            strokeColor: 'black',
            strokeWeight: 2,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyline);
        this.map.centerAndZoom(endPoint, 15);


    }

    //绘制服务区地图
    drawServiceArea = (res) => {
        let trackPoint = [];
        for (let i = 0; i < Object.keys(res.arean_list[0]).length; i++) {
            let itemPoint = res.arean_list[0][`0${i + 1}`];
            trackPoint.push(new window.BMap.Point(itemPoint.lat, itemPoint.lon));
        };
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        })
        this.map.addOverlay(polygon);
    }

    requestDetial = () => {
        let detailID = this.props.match.params.orderID;
        if (detailID) {
            axios.ajax({
                url: 'order/detail',
                data: {
                    params: detailID
                }
            }).then((res) => {
                if (res.code == 0) {
                    this.setState({
                        detail: res.item[0]
                    })
                }
                this.bMap(res)
            })
        }
    }

    render() {
        const orderDetail = this.state.detail || '';
        return (
            <div className='detail'>
                <Card className='content'>
                    <div id='BMap' className='map'></div>
                    <div className='basicMessage'>基础信息</div>
                    <div className='messageList'>
                        <ul>
                            <li>用车模式</li>
                            <li className='li'>{orderDetail.mode == 1 ? '服务区' : '停车点'}</li>
                        </ul>
                        <ul>
                            <li>订单编号</li>
                            <li className='li'>{orderDetail.order_sn}</li>
                        </ul>
                        <ul>
                            <li>车辆编号</li>
                            <li className='li'>{orderDetail.bike_sn}</li>
                        </ul>
                        <ul>
                            <li>用户姓名</li>
                            <li className='li'>{orderDetail.user_name}</li>
                        </ul>
                        <ul>
                            <li>手机号码</li>
                            <li className='li'>{orderDetail.mobile}</li>
                        </ul>
                    </div>
                    <div className='driveMessage'>行驶轨迹</div>
                    <div className='driveList'>
                        <ul>
                            <li>行程起点</li>
                            <li className='li'>{orderDetail.start_location}</li>
                        </ul>
                        <ul>
                            <li>行程终点</li>
                            <li className='li'>{orderDetail.end_location}</li>
                        </ul>
                        <ul>
                            <li>行驶里程</li>
                            <li className='li'>{orderDetail.distance / 1000}KM</li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}
export default Detail;