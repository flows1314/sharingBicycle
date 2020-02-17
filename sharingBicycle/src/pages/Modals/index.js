import React from 'react'
import './index.less'
import { Card, Modal, Button, message } from 'antd'

class Modals extends React.Component {
  state = {
    showModal: false,
    showModa2: false,
    showModa3: false,
    showModa4: false
  }

  handleOpen = (type) => {
    this.setState({
      [type]: true
    })
  }

  handleModal = (item) => {
    Modal[item]({
      title: item,
      content: '你确认要学习吗？',
      okText: '是的啊',
      cancelText: '没有了',
    })
  }
  render() {
    return (
      <div>
        <Card className='card-wrap'
          title='基础模态框'
        >
          <Button type='primary' onClick={() => this.handleOpen('showModal')}>OPen</Button>
          <Button type='primary' onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
          <Button type='primary' onClick={() => this.handleOpen('showModal3')}>顶部20px弹框</Button>
          <Button type='primary' onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
        </Card>
        <Modal     //基础弹框
          title="React"
          visible={this.state.showModal}
          onOk={() => {
            message.success('欢迎下次光临');
            this.setState({
              showModal: false
            })
          }}
          onCancel={() => {
            this.setState({
              showModal: false
            })
          }}
        >
          <p>欢迎学习最新React教程</p>
        </Modal>

        <Modal      //自定义页脚
          title="React"
          okText='确认了'
          cancelText='不要了'
          visible={this.state.showModal2}
          onCancel={() => {
            this.setState({
              showModal2: false
            })
          }}
        >
          <p>欢迎学习最新React教程</p>
        </Modal>

        <Modal      //顶部20px弹框
          title="React"
          visible={this.state.showModal3}
          style={{ marginTop: -80 }}
          // style={{top:20}}   //更改系统样式
          onCancel={() => {
            this.setState({
              showModal3: false
            })
          }}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal      //水平垂直居中
          title="React"
          wrapClassName="vertical-center-modal"
          visible={this.state.showModal4}
          onCancel={() => {
            this.setState({
              showModal4: false
            })
          }}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>

        <Card className='card-wrap'
          title='信息确认框'
        >
          <Button type='primary' onClick={() => this.handleModal('confirm')}>confirm</Button>
          <Button type='dashed' onClick={() => this.handleModal('info')}>info</Button>
          <Button type='danger' onClick={() => this.handleModal('success')}>success</Button>
          <Button type='link' onClick={() => this.handleModal('warning')}>warning</Button>
          <Button type='primary' onClick={() => this.handleModal('error')}>error</Button>
        </Card>
      </div>
    )
  } type = 'primary'
}
export default Modals;