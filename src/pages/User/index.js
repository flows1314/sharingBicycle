import React from 'react'
import './index.less'
import BaseForm from '../../component/BaseForm'
import { Card, Table, Button, Icon, Modal, Form, Input, Radio, Select, DatePicker, message } from 'antd'
import axios from '../../axios'
import utils from '../../utils/utils'
import moment from 'moment'
class User extends React.Component {
    state = {
        isVisible: false
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.requestTableList()
    }

    requestTableList = () => {
        axios.ajax({
            url: 'table/list',
            data: {
                params: this.params
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    list: res.data.list,
                    pagination: utils.pagination(res.data, (current) => {
                        this.params.page = current;
                        this.requestTableList();
                    })
                })
            }
        })
    }

    handleFilter = (params) => {
        this.params = params;
        this.requestList()
    }

    requestList = () => {
        //封装的列表
        axios.requestList(this, 'order/list', this.params, true)
        //isMock参数如果没有填默认false，使用真实业务接口
    }

    //功能区提交
    handleSumbit = () => {
        let formItemValues = this.formItem.props.form.getFieldsValue();
        this.params = formItemValues;
        axios.ajax({ url: 'user/create', data: { params: this.params } })
            .then((data) => {
                if (data.code == 0) {
                    this.setState({
                        isVisible: false,
                        selectedRowKeys: '',
                        selectedRows: '',
                        item: ''
                    });
                    message.success(data.result);
                    this.formItem.props.form.resetFields();
                    this.requestTableList();
                }
            })
    }

    //功能区
    handleOperate = (type) => {
        let _this=this;
        const selectedItem = this.state.selectedRows;
        if (type == 'create') {
            this.setState({
                isVisible: true,
                title: '创建员工',
                type
            })
        } else if (type == 'edit' || type == 'detail') {
            if (!selectedItem) {
                Modal.warning({ title: type == 'edit' ? '编辑提示' : '详情提示', content: '请先选择一条信息' });
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: type == 'edit' ? '员工编辑' : '员工详情',
                item: selectedItem
            });
        } else {
            if (!selectedItem) {
                Modal.warning({ title: '删除提示', content: '请先选择一条删除信息' });
                return;
            }
            Modal.confirm({
                title: '删除提示',
                content: '你确定要删除该员工信息?',
                okText: '删了，不需要它',
                cancelText: '还是留着吧',
                onCancel: () => { this.setState({ selectedRowKeys: '', selectedRows: '', item: '' }) },
                onOk: () => {
                    let formItemValues = this.state.selectedRows;
                    this.params = formItemValues.id;
                    axios.ajax({ url: 'user/delete', data: { params:{id:this.params}} })
                        .then((data) => {
                            if (data.code == 0) {
                                this.setState({
                                    isVisible: false,
                                    selectedRowKeys: '',
                                    selectedRows: '',
                                    item: ''
                                });
                                message.success(data.result);
                                // this.formItem.props.form.resetFields();
                                this.requestTableList();
                            }
                        })
                }
            })
        }
    }

    render() {
        let footer={};
        if(this.state.type=='detail'){
            footer={
                footer:null
            }
        }
        
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            }, {
                title: '用户名',
                dataIndex: 'name'
            }, {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    return {
                        '1': '悲伤',
                        '2': '难受',
                        '3': '正常',
                        '4': '高兴',
                        '5': '兴奋',
                    }[state]
                }
            }, {
                title: '爱好',
                dataIndex: 'hobby',
                render(hobby) {
                    return {
                        '1': '排球',
                        '2': '网球',
                        '3': '足球',
                        '4': '篮球',
                        '5': '乒乓球'
                    }[hobby]
                }
            }, {
                title: '生日',
                dataIndex: 'birthday'
            }, {
                title: '联系地址',
                dataIndex: 'address'
            }, {
                title: '早起时间',
                dataIndex: 'uptime'
            },
        ];

        //表格行是否可选择属性配置
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys, selectedRows: selectedRows[0] });
            }
        }

        const formList = [
            {
                type: 'Input',
                label: '用户名',
                field: 'userName',
                width: 160,
                placeholder: '请输入用户名'
            }, {
                type: 'Input',
                label: '用户手机号',
                field: 'number',
                width: 160,
                placeholder: '请输入你的手机号'
            }, {
                type: 'Date',
                label: '请选择入职日期',
                field: 'data',
                placeholder: '请输入日期'
            },
        ]
        return (
            <div>
                <Card>
                    <BaseForm formList={formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card className='domain'>
                    <Button type='primary' icon='plus' onClick={() => this.handleOperate('create')}>新增</Button>
                    <Button type='primary' icon='edit' onClick={() => this.handleOperate('edit')}>编辑</Button>
                    <Button type='primary' onClick={() => this.handleOperate('detail')}>员工详情</Button>
                    <Button type='primary' icon='delete' onClick={() => this.handleOperate('delete')}>删除</Button>
                </Card>
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.list}
                    pagination={this.state.pagination}
                    rowSelection={rowSelection}
                    onRow={(record, index) => {
                        return {
                            onClick: () => {
                                this.setState({
                                    selectedRows: [record][0],
                                    selectedRowKeys: [index]
                                })
                            }
                        }

                    }}

                />
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    {...footer}
                    onOk={this.handleSumbit}
                    onCancel={() => {
                        this.setState({ isVisible: false, selectedRowKeys: '', selectedRows: '', item: '' });
                        // this.formItem.props.form.resetFields();
                    }}
                >
                    <Domains type={this.state.type} item={this.state.item} wrappedComponentRef={(inst) => this.formItem = inst} />
                </Modal>
            </div>
        )
    }
}
export default User;

class Domain extends React.Component {
    getState = (state) => {
        let config = {
            '1': '北大才子',
            '2': '风华浪子',
            '3': '江南Style',
            '4': '河畔一脚',
        };
        return config[state]
    }

    render() {
        const Option = Select.Option;
        const TextArea = Input.TextArea;
        const item = this.props.item || {}
        const { getFieldDecorator } = this.props.form;
        const formLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 13
            }
        }

        return (
            <Form {...formLayout}>
                <Form.Item label='用户名'>
                    {this.props.type == 'detail' ? item.name :
                        getFieldDecorator('name', {
                            initialValue: item.name    //空数组{}只能一层调用，
                        })(                            //两层及以上报错。
                            <Input type='text' placeholder='请输入用户名' style={{ width: 195 }} />
                        )
                    }
                </Form.Item>
                <Form.Item label='性别'>
                    {this.props.type == 'detail' ? item.sex == 1 ? '男' : '女' :
                        getFieldDecorator('sex', {
                            initialValue: item.sex
                        })(
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        )
                    }
                </Form.Item>
                <Form.Item label='状态'>
                    {this.props.type == 'detail' ? this.getState(item.state) :
                        getFieldDecorator('state', {
                            initialValue: item.state
                        })(
                            <Select style={{ width: 195 }} placeholder='请选择你的状态'>
                                <Option value={1}>北大才子</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>江南Style</Option>
                                <Option value={4}>河畔一脚</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label='生日'>
                    {this.props.type == 'detail' ? item.birthday :
                        getFieldDecorator('birthday', {
                            initialValue: moment(item.birthday)
                        })(
                            <DatePicker showTime format='YYYY:MM:DD' style={{ width: 195 }} />
                        )
                    }
                </Form.Item>
                <Form.Item label='联系地址'>
                    {this.props.type == 'detail' ? item.address :
                        getFieldDecorator('address', {
                            initialValue: item.address
                        })(
                            <TextArea placeholder='请输入联系地址' />
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}
const Domains = Form.create()(Domain)