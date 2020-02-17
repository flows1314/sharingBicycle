import React from 'react';
import { Card, Table, Badge, Button, Modal, message, } from 'antd';
import axios from '../../../axios';
import utils from './../../../utils/utils';

class TableBasic extends React.Component {
  state = {
    dataSource: '',
    list: [],
    selectedRowKeys: []
  }
  params = {
    page: 1
  }

  componentDidMount() {
    const dataSource1 = [
      {
        id: 1,
        key: 1,
        name: '小麦',
        sex: '女',
        state: '良好',
        hobby: '网球',
        birthday: '2021-12-12',
        address: '武汉市洪山区'
      },
      {
        id: 2,
        key: 2,
        name: '小妹',
        sex: '女',
        state: '一般',
        hobby: '排球',
        birthday: '2021-12-12',
        address: '上海市'
      },
    ];
    this.request()
    this.setState({
      dataSource1,
    })
  }

  //单选行方法
  onRowClick = (record, index) => {
    let selectedKeys = [index]
    this.setState({
      selectedRowKeys: selectedKeys,
      selectItem: record,
    })
  }

  //多选行方法
  onRowCheckClick = (record, index) => {
    this.setState({
      list: [...this.state.list, index],
      selectedRowKeys: this.state.list,

    });
  }

  //单选项方法
  onSelectChange = RowKeys => {
    this.setState({ selectedRowKeys: RowKeys });
  };

  request = () => {
    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: this.params.page,
        }
      }
    }).then((res) => {
      if (res.code == 0) {
        res.data.list.map((item, index) => {
          item.key = index
        })
        this.setState({
          dataSource: res.data.list,
          pagination: utils.pagination(res.data, (current) => {
            this.params.page = current;
            this.request()
          })
        })
      }
    })
  }

  handleSorter = (pagination, filters, sorter) => {
    console.log(sorter)
    this.setState({
      sortOrder: sorter.order 
      //sorter.order 排序有ascend（升序），discend（降序）和默认排序
    })
  }

  //表格删除按钮
  handleDelete = (item) => {
    Modal.confirm({
      title: '提示！',
      content: `你确定要删除${item.id}列数据吗？`,
      onOk: () => {
        message.success('删除成功！');
        this.request()
      }
    })
  }

  render() {
    //单选项属性配置
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      type: 'radio',
      onChange: this.onSelectChange
    }

    //多选项属性配置
    const rowCheckSelection = {
      selectedRowKeys,
      type: 'checkbox',
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        });
      }
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          let config = {
            '1': '男',
            '2': '女'
          }
          return config[sex]
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '悲伤',
            '2': '难受',
            '3': '高兴',
            '4': '兴奋',
            '5': '欢快',
          }
          return config[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'hobby',
        render(hobby) {
          let config = {
            '1': '打篮球',
            '2': '打网球',
            '3': '打排球',
            '4': '打足球',
            '5': '打羽毛球',
          }
          return config[hobby]
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
    ];

    const columns1 = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
      },
      {
        title: '状态',
        dataIndex: 'state',
      },
      {
        title: '爱好',
        dataIndex: 'hobby',
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
    ]

    return (
      <div>
        <Card title='基础表格'>
          <Table
            bordered
            columns={columns1}
            dataSource={this.state.dataSource1}
          />
        </Card>
        <Card title='动态数据渲染-单选表格'>
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={this.state.dataSource}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => this.onRowClick(record, index) // 点击行
              };
            }}
          />
        </Card>
        <Card title='动态数据渲染-多选表格'>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            rowSelection={rowCheckSelection}
            onRow={(record, index) => {
              return {
                onClick: () => this.onRowCheckClick(record, index) // 点击行
              };
            }}
          />
        </Card>
        <Card title='动态数据渲染-表格分页'>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    )
  }
}
export default TableBasic;