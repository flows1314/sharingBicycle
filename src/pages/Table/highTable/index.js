import React from 'react';
import { Card, Table, Badge, Button, Modal, message, } from 'antd';
import axios from '../../../axios';
import utils from './../../../utils/utils';

class HighTable extends React.Component {
  state = {
    dataSource: '',
    list: [],
    selectedRowKeys: []
  }
  params = {
    page: 1
  }

  componentDidMount() {
    this.request()
  }

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
    const columns2 = [
      {
        title: '序号',
        dataIndex: 'id',
        width: 150,
        fixed: 'left',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 150,
        fixed: 'left',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 120,
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
        width: 120,
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
        title: '性别',
        dataIndex: 'sex',
        width: 120,
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
        width: 120,
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
        width: 120,
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
        width: 120,
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 150,
        fixed: 'right',
      },
    ];

    const columns3 = [
      {
        title: '序号',
        dataIndex: 'id',
        width: 70,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 70,
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 70,
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
        width: 70,
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
        width: 90,
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
        width: 100,
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 100,
      },
    ];


    const columns4 = [
      {
        title: '序号',
        dataIndex: 'id',
        sorter: (a, b) => {
          return a.id - b.id
        }
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
            '1': <Badge status='success' text='成功' />,
            '2': <Badge status="error" text="错误" />,
            '3': <Badge status="default" text="正常" />,
            '4': <Badge status="processing" text="进行中" />,
            '5': <Badge status="warning" text="警告" />,
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
        title: '年龄',
        dataIndex: 'age',
        sorter: (a, b) => {
          return a.age - b.age
        },
        sortOrder: this.state.sortOrder
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
    ];

    const columns5 = [
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
        title: '操作',
        render: (item) => <Button onClick={() => this.handleDelete(item)}>删除</Button>

      },
    ];
    return (
      <div>
        <Card title='表格横向滚动'>
          <Table
            bordered
            columns={columns2}
            dataSource={this.state.dataSource}
            scroll={{ x: 1100 }}
          />
        </Card>
        <Card title='表格纵向滚动'>
          <Table
            bordered
            columns={columns3}
            dataSource={this.state.dataSource}
            scroll={{ y: 240 }}
          />
        </Card>
        <Card title='表格排序和微标数'>
          <Table
            bordered
            columns={columns4}
            dataSource={this.state.dataSource}
            onChange={this.handleSorter}
          />
        </Card>
        <Card title='表格嵌套删除按钮'>
          <Table
            bordered
            columns={columns5}
            dataSource={this.state.dataSource}
            onChange={this.handleSorter}
          />
        </Card>
      </div>
    )
  }
}
export default HighTable;