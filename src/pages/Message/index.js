import React from 'react'
import { Card, message, Button, notification } from 'antd';
class Message extends React.Component {
  handleMessage = (type) => {
    message[type]('恭喜你，React课程晋级成功.', 2, () => {
      notification.success({
        message: '关闭时触发的回调函数',
        description: 'notification此功能可用可不用'
      })
    })
  }
  render() {
    return (
      <Card title='全局提示框'>
        <Button type="primary" onClick={() => this.handleMessage('success')} style={{marginRight:10}}>success</Button>
        <Button type="dashed" onClick={() => this.handleMessage('warning')} style={{marginRight:10}}>warning</Button>
        <Button type="danger" onClick={() => this.handleMessage('error')} style={{marginRight:10}}>error</Button>
        <Button type="link" onClick={() => this.handleMessage('info')} style={{marginRight:10}}>info</Button>
        <Button onClick={() => this.handleMessage('loading')} style={{marginRight:10}}>loading</Button>
      </Card>
    )
  }
}
export default Message;