import React from 'react';
import './style.less';
import { Row,Col} from 'antd';
import Header from './component/Header';
import Footer from './component/Footer';
import NavLeft from './component/NavLeft';
class Admin extends React.Component{
  render(){
    return(
      <Row className='container'>
        <Col className='nav-left' span={4}>
          <NavLeft/>
        </Col>
        <Col className='main' span={20}>
          <Header/>
          <div className='content'>{this.props.children}</div>
          <Footer/>
        </Col>
      </Row>
    )
  }
}
export default Admin;