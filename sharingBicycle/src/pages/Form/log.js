import React from 'react'
import { Card, Form, Input, Button, Icon } from 'antd'
class Log extends React.Component {
  handleSumbit = (e) => {
    console.log(e)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Card title='登录行内表单'>
          <Form layout='inline' onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入你的用户名!' }]
              })(<Input
                placeholder="Username"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的密码！' }]
              })(<Input
                placeholder='Password'
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType="submit">登录</Button>

            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
export default Form.create()(Log);