import React from 'react'
import './index.less'
import axios from './../../axios'
import { Card, Form, Input, Select, Button, Table } from 'antd'
class City extends React.Component {
  state = {}
  componentDidMount() {
    this.requestList()
  }
  requestList = () => {
    axios.ajax({
      url: 'table/open_city',
      data: {
        param: {
          page: 1
        }
      }
    }).then((res) => {
      this.setState({
        list: res.city_list.map((item, index) => {
          item.key = index;
          return item
        })
      })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
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
      },
      {
        title: '营运模式',
        dataIndex: 'OperatingModel',
        key: 'OperatingModel',
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
      },

    ];
    return (
      <div>
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
        <Card title={<Button type='primary'>开通城市</Button>}>
          <Table
            columns={columns}
            dataSource={this.state.list}
            bordered
          />
        </Card>
      </div>
    )
  }
}
export default Form.create()(City);