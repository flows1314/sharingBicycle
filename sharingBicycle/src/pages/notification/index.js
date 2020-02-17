import React from 'react'
import { Card, notification, Button } from 'antd';
class Notification extends React.Component{
openNotificationWithIcon=(type,direction)=>{
  //notification.config设置全局配置
  if(direction){
    notification.config({
    placement:direction
  })}
  notification[type]({
  message:'发工资了',
  description:'迟到12天，实发工资250，请笑纳'
})
}

  render(){
    return(
      <div>
        <Card title='通知提醒框'>
          <Button type='primary' onClick={() => this.openNotificationWithIcon('success')} style={{marginLeft:4}}>Success</Button>
          <Button type='dashed' onClick={() => this.openNotificationWithIcon('info')} style={{marginLeft:4}}>Info</Button>
          <Button type='danger' onClick={() => this.openNotificationWithIcon('warning')} style={{marginLeft:4}}>Warning</Button>
          <Button type='link' onClick={() => this.openNotificationWithIcon('error')} style={{marginLeft:4}}>Error</Button>
        </Card>

        <Card title='通知提醒框-方向控制'>
          <Button type='primary' onClick={() => this.openNotificationWithIcon('success','topLeft')} style={{marginLeft:4}}>左上success</Button>
          <Button type='dashed' onClick={() => this.openNotificationWithIcon('info','topRight')} style={{marginLeft:4}}>右上info</Button>
          <Button type='danger' onClick={() => this.openNotificationWithIcon('warning','bottomLeft')} style={{marginLeft:4}}>左下warning</Button>
          <Button type='link' onClick={() => this.openNotificationWithIcon('error','bottomRight')} style={{marginLeft:4}}>右下error</Button>
        </Card>
      </div>
      
    )
  }
}
export default Notification;