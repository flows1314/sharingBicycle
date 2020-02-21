import React from 'react'
import { Card,Spin, Icon, Alert } from 'antd'

class Loading extends React.Component {
  render(){
    const icon=<Icon type='loading'/>
    return(
      <div>
        <Card title='Spin用法'>
          <Spin size='small' />
          <Spin size='default' style={{margin:'0 10px'}}/>
          <Spin size='large'/>
          <Spin indicator={icon}/>
          <Spin indicator={icon} spinning={false}/>
       </Card>
       <Card title='内容遮罩'>
       <Alert
            style={{marginBottom:9}}
            message="React"
            // description="欢迎来到React高级实战课程！"
            type="error"
          />

        <Alert
            style={{marginBottom:9}}
            message="React"
            description="欢迎来到React高级实战课程！"
            type="warning"
          />

          <Spin>
            <Alert 
              style={{marginBottom:9}}
              message="React"
              description="欢迎来到React高级实战课程！"
              type="info"
            />
          </Spin>

          <Spin tip="加载中...">
            <Alert 
              style={{marginBottom:9}}
              message="React"
              description="欢迎来到React高级实战课程！"
              type="error"
            />
          </Spin>

          <Spin indicator={icon}>
            <Alert 
              style={{marginBottom:9}}
              message="React"
              description="欢迎来到React高级实战课程！"
              type="success"
            />
          </Spin>
       </Card>
      </div>
    )
  }
}
export default Loading;