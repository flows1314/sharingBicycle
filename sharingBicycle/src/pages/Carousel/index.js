import React from 'react'
import './index.less'
import { Card,Carousel  } from 'antd'
class Carousels extends React.Component{
  render(){
    return(
      <div>
          <Card title='文字背景轮播'>
              <Carousel autoplay effect='fade'>
                <div><h3>第一幅图</h3></div>
                <div><h3>第二幅图</h3></div>
                <div><h3>第三幅图</h3></div>
              </Carousel>
          </Card>
          <Card title='图片背景轮播'>
              <Carousel autoplay>
                <div><img src='/carousel_img/carousel-1.jpg' /></div>
                <div><img src='/carousel_img/carousel-2.jpg' /></div>
                <div><img src='/carousel_img/carousel-3.jpg' /></div>
              </Carousel>
          </Card>
      </div>
    )
  }
}
export default Carousels;