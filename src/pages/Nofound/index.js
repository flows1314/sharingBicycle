import React from 'react'
import './index.less'
import { Card } from 'antd'
class NoFound extends React.Component{
  render(){
    return(
      <div>
        <Card className='card-wrapper'>
          404!页面没有找到...
        </Card>
      </div>
    )
  }
}
export default NoFound;