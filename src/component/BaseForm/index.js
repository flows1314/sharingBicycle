import React from 'react'
import axios from './../../axios'
import { Form, Select, Button, DatePicker, Input } from 'antd'

class BaseForm extends React.Component {
  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue();
    this.props.filterSubmit(fieldsValue)
  }

  reset = () => {
    this.props.form.resetFields()
  }

  baseFormTtem = () => {
    const formList = this.props.formList;
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    if (formList && formList.length > 0) {
      const list = [];
      formList.map((formList) => {
        let type = formList.type;
        let label = formList.label;
        let initialValue = formList.initialValue;
        let placeholder = formList.placeholder;
        let width = formList.width;
        let field = formList.field;
        let optionList = formList.optionList;
        if (type == 'Select') {
          const select = <Form.Item label={label}>
            {getFieldDecorator([field], {
              initialValue: initialValue
            })(
              <Select style={{ width: width }}>
                {optionList.map((item) =>
                  <Option value={item.id}>{item.content}</Option>
                )}
              </Select>
            )}
          </Form.Item>
          list.push(select)
        }

        if (type == 'Input') {
          const input = <Form.Item label={label}>
            {getFieldDecorator([field], {
              initialValue: initialValue
            })(
              <Input type='text' placeholder={placeholder} style={{ width: width }} />
            )}
          </Form.Item>
          list.push(input)
        }

        if (type == 'DatePicker') {
          const start_time = <Form.Item label={label}>
            {getFieldDecorator('start_time')(
              <DatePicker placeholder="请选择开始时间" showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>
          list.push(start_time)
          const end_time = <Form.Item label='~' colon={false}>
            {getFieldDecorator('end_time')(
              <DatePicker placeholder='请选择结束时间' showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>
          list.push(end_time)
        }

        if (type == 'Date') {
          const data = <Form.Item label={label}>
            {getFieldDecorator([field])(
              <DatePicker placeholder={placeholder} showTime format="YYYY-MM-DD" />
            )}
          </Form.Item>
          list.push(data)
        }
      })
      return list
    }
  }

  render() {
    return (
      <Form layout="inline">
        {this.baseFormTtem()}
        <Form.Item>
          <Button type='primary' onClick={this.handleFilterSubmit} style={{ margin: '0 10px' }}>查询</Button>
          <Button type='danger' onClick={this.reset}>重置</Button>
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(BaseForm)


