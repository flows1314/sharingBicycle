import React from 'react'
import axios from '../../axios'
import Utils from '../../utils/utils'
import BaseForm from '../../component/BaseForm'
import { Card, Form, Button, Table, Modal, message } from 'antd'
class Order extends React.Component {
  state = {
    isVisible: false,
    orderInfo: {}
  }
  params = {
    page: 1
  }
  componentDidMount() {
    this.requestList()
  }

  handleFilter = (params) => {
    this.params = params;
    this.requestList()
  }

  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }

  requestList = () => {
    //封装的列表
    axios.requestList(this, 'order/list', this.params, true) //isMock参数如果没有默认false
  }

  handleOrderDetail = () => {
    let selectedItem = this.state.selectedItem;
    if (!selectedItem) {
      Modal.warning({
        title: '订单详情提示',
        content: '请先选择一条订单信息！'
      })
      return;    //如果没有return，执行完if后还会继续执行下面代码
    }
    window.open(`/#/common/order/detail/${selectedItem.id}`, '_black');
    this.setState({
      selectedItem: '',
      selectedRowKeys: ''
    })
  }

  //确认订单是否结束
  handleFinish = () => {
    let selectedItem = this.state.selectedItem;
    if (!selectedItem) {
      Modal.warning({
        title: '结束订单详情提示',
        content: '请先选择一条订单信息！'
      })
      return;
    }
    axios.ajax({
      url: '/order/ebike/info',
      data: {
        params: selectedItem.id
      }
    }).then((data) => {
      if (data.code == 0) {
        this.setState({
          isVisible: true,
          orderInfo: data.result
        })
      }
    })
  }

  //结束订单
  handleFinishOrder = () => {
    let selectedItem = this.state.selectedItem;
    axios.ajax({
      url: 'order/finish',
      data: {
        params: selectedItem.id
      }
    }).then((data) => {
      if (data.code == 0) {
        message.success(data.result);
        this.setState({
          isVisible: false,
          selectedRowKeys: '',
          selectedItem: ''
        })
        this.requestList()
      }
    })
  }

  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render(distance) {
          return (distance / 1000) + "km"
        }
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time'
      },
      {
        title: '状态',
        dataIndex: 'status',
        render(status) {
          let config = {
            '1': '未进行',
            '2': '进行中',
            '3': '已结束',
          }
          return config[status]
        }
      },
      {
        title: '开始时间',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ]

    const formList = [
      {
        type: 'Select',
        label: '城市',
        field: 'city',
        width: 75,
        initialValue: 0,
        optionList: [{ id: 0, content: '全部' }, { id: 1, content: '北京' }, { id: 2, content: '上海' },
        { id: 3, content: '广州' }, { id: 4, content: '深圳' }]
      },
      {
        type: 'DatePicker',
        label: '订单时间'
      },
      {
        type: 'Select',
        label: '订单状态',
        field: 'order_state',
        width: 85,
        initialValue: 0,
        optionList: [{ id: 0, content: '全部' }, { id: 1, content: '未进行' },
        { id: 2, content: '进行中' }, { id: 3, content: '临时锁车' },
        { id: 4, content: '已结束' }]
      }
    ]

    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    }


    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedItem: selectedRows
        })
      }
    }
    return (
      <div>
        <Card>
          <BaseForm filterSubmit={this.handleFilter} formList={formList} />
        </Card>
        <Card style={{ marginTop: 5 }}>
          <Button type='primary' onClick={this.handleOrderDetail} style={{ marginRight: 10 }}>订单详情</Button>
          <Button type='danger' onClick={this.handleFinish}>结束订单</Button>
        </Card>
        <div>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            rowSelection={rowSelection}
            pagination={this.state.pagination}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }
              }
            }}
          />
        </div>
        <Modal
          title='结束订单信息'
          width={500}
          visible={this.state.isVisible}
          onOk={this.handleFinishOrder}
          onCancel={() => { this.setState({ isVisible: false }) }}
        >
          <Form layout='horizontal' {...formItemLayout}>
            <Form.Item label='车辆编号'>
              {this.state.orderInfo.bike_sn}
            </Form.Item>
            <Form.Item label='剩余电量'>
              {this.state.orderInfo.battery}%
            </Form.Item>
            <Form.Item label='行程开始时间'>
              {this.state.orderInfo.start_time}
            </Form.Item>
            <Form.Item label='当前位置'>
              {this.state.orderInfo.location}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default Order;

