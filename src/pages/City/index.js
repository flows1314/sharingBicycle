import React from 'react'
import './index.less'
import axios from './../../axios'
import utils from '../../utils/utils'
import { Card, Form, Select, Button, Table, Modal, Radio, message } from 'antd'
class City extends React.Component {
  state = {}
  params = {
    page: 1
  }
  componentDidMount() {
    this.requestList()
  }
  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    axios.ajax({
      url: 'form/city_submit',
      data: {
        params: cityInfo
      }
    }).then((res) => {
      if (res.code == 0) {
        message.success(res.result);
        this.setState({ showOpen: false });
        this.requestList()
      }
    })
  }

  handleOpen = () => {
    this.setState({
      showOpen: true
    })
  }

  requestList = () => {
    axios.ajax({
      url: 'table/open_city',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      this.setState({
        list: res.city_list.map((item, index) => {
          item.key = index;
          return item
        }),
        pagination: utils.pagination(res, (current) => {
          this.params.page = current;
          this.requestList()
        })
      });
    })
  }
  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '城市名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '用车模式',
        dataIndex: 'carModal',
        key: 'carModal',
        render(carModal) {
          return carModal == '1' ? '停车点' : '禁停区';
        }
      },
      {
        title: '营运模式',
        dataIndex: 'OperatingModel',
        key: 'OperatingModel',
        render(OperatingModel) {
          return OperatingModel == '1' ? '自营' : '加盟';
        }
      },
      {
        title: '授权加盟商',
        dataIndex: 'Alliance',
        key: 'Alliance',
      },
      {
        title: '城市管理员',
        dataIndex: 'manager',
        key: 'manager',
        render(manager) {
          return manager.map((item) => {
            return item.name
          }).join('|')
        }
      },
      {
        title: '操作时间',
        dataIndex: 'workTime',
        key: 'workTime',
      },
      {
        title: '操作人',
        dataIndex: 'operator',
        key: 'operator',
      },
      {
        title: '城市开通时间',
        dataIndex: 'openTime',
        key: 'openTime',
      }
    ];
    return (
      <div>
        <FuncComponent />
        <Card title={<Button type='primary' onClick={this.handleOpen}>开通城市</Button>}>
          <Table
            columns={columns}
            dataSource={this.state.list}
            bordered
            pagination={this.state.pagination}
          />
        </Card>
        <Modal
          title='开通城市'
          okText='提交'
          cancelText='取消'
          visible={this.state.showOpen}
          onCancel={() => { this.setState({ showOpen: false }) }}
          onOk={this.handleSubmit}
        >
          <ModalComponent wrappedComponentRef={(inst) => { this.cityForm = inst; }} />
        </Modal>
      </div>
    )
  }
}
export default City;

//开通城市弹框组件
class carModal extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 15,
        offset: 1
      }
    }
    return (
      <Form>
        <Form.Item label='选择城市' {...formItemLayout} >
          {getFieldDecorator('selectCity', {
            initialValue: '1'
          })(<Select style={{ width: 120 }}>
            <Option value='1'>北京</Option>
            <Option value='2'>上海</Option>
            <Option value='3'>深圳</Option>
          </Select>)}
        </Form.Item>
        <Form.Item label='营运模式' {...formItemLayout}>
          {getFieldDecorator('operatingMode', {
            initialValue: '1'
          })(
            <Radio.Group>
              <Radio value='1'>自营</Radio>
              <Radio value='2'>加盟</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label='用车模式' {...formItemLayout}>
          {getFieldDecorator('vehicleMode', {
            initialValue: '1'
          })(
            <Radio.Group>
              <Radio value='1'>指定停车点模式</Radio>
              <Radio value='2'>禁停区模式</Radio>
            </Radio.Group>
          )}
        </Form.Item>
      </Form>
    )
  }
}
const ModalComponent = Form.create()(carModal)

//头部查询重置等组件
class Func extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    return (
      <Card className='card-wrap'>
        <Form layout="inline">
          <Form.Item label='城市'>
            {getFieldDecorator('city', {
              initialValue: '全部'
            })(
              <Select style={{ width: 90 }}>
                <Option value='1'>北京</Option>
                <Option value='2'>上海</Option>
                <Option value='3'>广州</Option>
                <Option value='4'>深圳</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label='用车模式'>
            {getFieldDecorator('carModel', {
              initialValue: '全部'
            })(
              <Select style={{ width: 150 }}>
                <Option value='1'>自营</Option>
                <Option value='2'>出租</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label='营运模式'>
            {getFieldDecorator('OperatingModel', {
              initialValue: '全部'
            })(
              <Select style={{ width: 80 }}>
                <Option value='1'>北京</Option>
                <Option value='2'>上海</Option>
                <Option value='3'>广州</Option>
                <Option value='4'>深圳</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label='加盟商授权状态'>
            {getFieldDecorator('state', {
              initialValue: '全部'
            })(
              <Select style={{ width: 80 }}>
                <Option value='1'>北京</Option>
                <Option value='2'>上海</Option>
                <Option value='3'>广州</Option>
                <Option value='4'>深圳</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button type='primary' style={{ margin: '0 20px 0 30px' }}>查询</Button>
            <Button>重置</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
const FuncComponent = Form.create()(Func)