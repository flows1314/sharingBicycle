import React from 'react'
import './style.less'
import moment from 'moment'
import { Card, Form, Input, Radio, InputNumber, Select, Switch, DatePicker, Upload, TimePicker, Icon, Checkbox, Button } from 'antd'

class Register extends React.Component {
  state = {
    loading: false,
  };

  handleRegister = () => {
    let formValues = this.props.form.getFieldsValue()
    console.log(formValues)
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const TextArea = Input.TextArea;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }

    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
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
            <Form.Item label='头像上传' {...formItemLayout}>
              {getFieldDecorator('img')(
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  onChange={this.handleChange}
                >
                  {this.state.imageUrl ? <img src={this.state.imageUrl} style={{ width: 102 }} /> : uploadButton}
                </Upload>
              )}
            </Form.Item>
            <Form.Item {...offsetLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>我已阅读过<a href="#">慕课协议</a></Checkbox>
              )}
            </Form.Item>
            <Form.Item {...offsetLayout}>
              <Button type='primary' onClick={this.handleRegister}>注册</Button>
            </Form.Item>
          </Form>
        </Card>
      </div >
    )
  }
}
export default Form.create()(Register);
