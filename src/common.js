import React from 'react';
import './component/Header/index.less'
import { Row, Col} from 'antd';
import Header from './component/Header';
class Common extends React.Component {
    render() {
        return (
            <div className='common'>
                <Row className='header-top'>
                    <Header meunType='second'/>
                </Row>
                <Row className='detail-content'>
                    {/* {console.log(this)} */}
                    {this.props.children}
                </Row>
            </div>

        )
    }
}
export default Common;