import React from 'react'
import './style.less'
import { Card, Form, Input, Button, Icon, Checkbox, message } from 'antd'
class Log extends React.Component {
  handleSumbit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.info(`你的用户名${values.user_name},密码是${values.pwd}`)
      }
    })

  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Card title='登录行内表单' className='card-wraps'>
          <Form layout='inline'>
            <Form.Item>
              {getFieldDecorator('username', {
                initialValue: '河畔一角',
                rules: [{ required: true, message: '请输入你的用户名!' }]
              })(<Input
                placeholder="Username"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                initialValue: 123,
                rules: [{ required: true, message: '请输入你的密码！' }]
              })(<Input
                type="password"
                placeholder='Password'
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item>
              <Button type='primary'>登录</Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title='登录水平表单' className='card-wraps'>
          <Form layout='horizontal' className='form-login'>
            <Form.Item>
              {getFieldDecorator('user_name', {
                initialValue: '',
                rules: [
                  { required: true, message: '请输入你的用户名!' },
                  { min: 5, max: 10, message: '长度不在范围内' },
                  // {pattern:/^\w+$/g,message:'用户名必须为数字或字母'}
                  { pattern: new RegExp('^\\w+$', 'g'), message: '用户名必须为数字或字母' }
                ]
              })(<Input
                placeholder="Username"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('pwd', {
                initialValue: '',
                rules: [{ required: true, message: '请输入你的密码！' }]
              })(<Input
                type='password'
                placeholder='Password'
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                initialValue: true,
                valuePropName: 'checked',
                rules: [{ required: true, message: '请输入你的密码！' }]
              })(<Checkbox>记住密码</Checkbox>)}
              <a href='#' className='card-forget'>忘记密码</a>
              <Button type='primary' onClick={this.handleSumbit} className='card-button'>登录</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
export default Form.create()(Log);