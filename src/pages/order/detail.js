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

    bMap = () => {
        this.map = new window.BMap.Map("map");
        // 创建地图实例  
        // var point = new window.BMap.Point(116.404, 39.915);
        // 创建点坐标  
        this.map.centerAndZoom('武汉', 15);
        // 初始化地图，设置中心点坐标和地图级别 
        this.addControl()
    }

    addControl = () => {
        this.map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        this.map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        this.map.addControl(new window.BMap.OverviewMapControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT }));
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
                this.bMap()
            })
        }
    }

    render() {
        const orderDetail = this.state.detail || '';
        return (
            <div className='detail'>
                <Card className='content'>
                    <div id='map' className='map'></div>
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