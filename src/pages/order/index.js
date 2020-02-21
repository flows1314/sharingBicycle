import React from 'react'
import axios from '../../axios'
import Utils from '../../utils/utils'
import BaseForm from '../../component/BaseForm'
import { Card, Form, Select, Button, Table, Modal, Radio, message, DatePicker } from 'antd'
class Order extends React.Component {
  state = {}
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
    axios.ajax({
      url: '/order/list',
      data: {
        params: this.params
      }
    }).then((res) => {
      if (res.code == 0) {
        let list = res.item_list.map((item, index) => {
          item.key = index;
          return item;
        });
        this.setState({
          list,
          pagination: Utils.pagination(res, (current) => {
            this.params.page = current;
            this.requestList();
          })
        })
      }
    })
  }

  handleOrderDetail = () => {
    let selectedItem = this.state.selectedItem;
    console.log(selectedItem)
    if (!selectedItem) {
      Modal.info({
        title: '订单详情',
        content: '请选择一条订单信息！'
      })
      return;
    }
    window.open(`/#/commom/order/detail${selectedItem.id}`, '_black')
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
          <BaseForm filterSubmit={this.handleFilter} />
        </Card>
        <Card style={{ marginTop: 5 }}>
          <Button type='primary' onClick={this.handleOrderDetail} style={{ marginRight: 10 }}>订单详情</Button>
          <Button type='danger'>结束订单</Button>
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
      </div>
    )
  }
}
export default Order;

