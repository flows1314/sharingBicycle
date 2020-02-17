import React from 'react';
import { Row, Col } from 'antd';
import axios from './../../axios';
import util from './../../utils/utils';
import './index.less';
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sysTime: '',
      weather: '阳光明媚',
      topic: '主页'
    }
  }
  //因为sysTime每一秒更改一次，因此，必须声明state,如果只变化一次无需申明state
  componentWillMount() {
    setInterval(() => {
      let sysTime = util.formateDate()
      this.setState({
        sysTime
      })
    }, 1000);
    this.getWeatherApiDate()
  }

  getWeatherApiDate() {
    let city = '北京市'
    axios.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    }).then((res) => {
      let weather = res.results[0].weather_data[0].weather
      let weatherPicture = res.results[0].weather_data[0].dayPictureUrl
      this.setState({
        weather,
        weatherPicture,
      })
    })
  }

  render() {
    return (
      <div className='header'>
        <Row className='header-top'>
          <span>欢迎，河畔一脚</span>
          <a href='#'>退出</a>
        </Row>
        <Row className='breadcrumb'>
          <Col className='breadcrumb-title' span={4}>
            {this.state.topic}
          </Col>
          <Col className='breadcrumb-time-weather' span={20}>
            <span>{this.state.sysTime}</span>
            <img src={this.state.weatherPicture} />
            <span>{this.state.weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Header;