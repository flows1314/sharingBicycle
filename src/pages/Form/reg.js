import React from 'react'
import './style.less'
import moment from 'moment'
import { Card, Form, Input, Radio, InputNumber, Select, Switch, DatePicker, Upload, TimePicker } from 'antd'
const TextArea = Input.TextArea

class Register extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }
    return (
      <div>
        <Card title='注册表单' className='card-wrap'>
          <Form layout='horizontal'>
            <Form.Item label='用户名' {...formItemLayout}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入你的用户名!' }]
              })(<Input
                placeholder="请输入用户名" />)}
            </Form.Item>
            <Form.Item label='密码' {...formItemLayout}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的密码!' }]
              })(<Input
                type='password'
                placeholder='请输入密码' />)}
            </Form.Item>
            <Form.Item label='性别' {...formItemLayout}>
              {getFieldDecorator('sex', {
                initialValue: '1'
              })(
                <Radio.Group>
                  <Radio value='1'>男</Radio>
                  <Radio value='2'>女</Radio>
                </Radio.Group>)}
            </Form.Item>
            <Form.Item label='年龄' {...formItemLayout}>
              {getFieldDecorator('age', {
                initialValue: '18'
              })(
                <InputNumber min={1} max={100} />
              )}
            </Form.Item>
            <Form.Item label='当前状态' {...formItemLayout}>
              {getFieldDecorator('state', {
                initialValue: '5',
              })(
                <Select>
                  <option value='1'>咸鱼一条</option>
                  <option value='2'>风华浪子</option>
                  <option value='3'>北大才子</option>
                  <option value='4'>江南四大才子</option>
                  <option value='5'>河畔一脚</option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label='爱好' {...formItemLayout}>
              {getFieldDecorator('interst', {
                initialValue: ['1', '2'],
              })(
                <Select mode="multiple" >
                  <option value='1'>旅游</option>
                  <option value='2'>游泳</option>
                  <option value='3'>逛街</option>
                  <option value='4'>蹦迪</option>
                  <option value='5'>酒吧</option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label='是否已婚' {...formItemLayout}>
              {getFieldDecorator('marry', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Switch />
              )}
            </Form.Item>
            <Form.Item label='生日' {...formItemLayout}>
              {getFieldDecorator('birthday', {
                initialValue: moment('2020/05/20 12:12:12'),//不填参数，默认现在时间
              })(
                <DatePicker showTime format='YYYY/MM/DD HH:mm:ss' />
              )}
            </Form.Item>
            <Form.Item label='联系地址' {...formItemLayout}>
              {getFieldDecorator('address', {
                initialValue: '北京市海淀区奥林匹克公园',
              })(
                <TextArea autoSize={{ minRows: 1, maxRows: 3 }} />
              )}
            </Form.Item>
            <Form.Item label='早起时间' {...formItemLayout}>
              {getFieldDecorator('time', {
                initialValue: moment(),//不填参数，默认现在时间
              })(
                <TimePicker />
              )}
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
export default Form.create()(Register);