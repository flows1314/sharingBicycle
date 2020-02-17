import React from 'react';
import {Row,Col,Card} from 'antd';
class Gallery extends React.Component{
  render(){
    const imgs=[
      ['1.png','2.png','3.png','4.png','5.png'],
      ['6.png','7.png','8.png','9.png','10.png'],
      ['11.png','12.png','13.png','14.png','15.png'],
      ['16.png','17.png','18.png','19.png','20.png'],
      ['21.png','22.png','23.png','24.png','25.png'],
    ]
    const imgsList=imgs.map((list)=>list.map((item)=>
    <Card 
      cover={<img src={'/gallery/'+item} style={{width:240,height:240}}/>}
    >
      <Card.Meta
       title={'画册'+item} 
       description='这是一个大画家的画册'
       />
    </Card>
    ))
    return(
      <Row gutter={1}>
          <Col span={5}>{imgsList[0]}</Col>
          <Col span={5}>{imgsList[1]}</Col>
          <Col span={5}>{imgsList[2]}</Col>
          <Col span={5}>{imgsList[3]}</Col>
          <Col span={4}>{imgsList[4]}</Col>
      </Row>
    )
  }
}
export default Gallery;