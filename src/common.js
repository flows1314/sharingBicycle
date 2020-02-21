import React from 'react';
import './style.less';
import { Row, Col } from 'antd';
import Header from './component/Header';
class Common extends React.Component {
    render() {
        return (
            <div>
                <Row className='container'>
                    <Header meunType='second'/>
                </Row>
                <Row className='content'>
                    {this.props.children}
                </Row>
            </div>

        )
    }
}
export default Common;