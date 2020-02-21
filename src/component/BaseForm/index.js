import React from 'react'
import axios from './../../axios'
import { Form, Select, Button, DatePicker } from 'antd'

class BaseForm extends React.Component {
  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue();
    this.props.filterSubmit(fieldsValue)
  }

  reset = () => {
    this.props.form.resetFields()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    return (
      <Form layout="inline">
        <Form.Item label='城市'>
          {getFieldDecorator('city', {
            initialValue: '0'
          })(
            <Select style={{ width: 80 }}>
              <Option value='0'>全部</Option>
              <Option value='1'>北京</Option>
              <Option value='2'>上海</Option>
              <Option value='3'>广州</Option>
              <Option value='4'>深圳</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('start_time', {
            initialValue: ''
          })(
            <DatePicker placeholder="请选择开始时间" showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('end_time', {
            initialValue: ''
          })(
            <DatePicker placeholder='请选择结束时间' showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </Form.Item>
        <Form.Item label='订单状态'>
          {getFieldDecorator('order_state', {
            initialValue: '0'
          })(
            <Select style={{ width: 90 }}>
              <Option value='0'>全部</Option>
              <Option value='1'>未进行</Option>
              <Option value='2'>进行中</Option>
              <Option value='3'>已结束</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={this.handleFilterSubmit} style={{ margin: '0 20px' }}>查询</Button>
          <Button type='danger' onClick={this.reset}>重置</Button>
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(BaseForm)


