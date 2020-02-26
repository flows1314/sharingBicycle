import React from 'react'
import './index.less'
import BaseForm from '../../component/BaseForm'
import { Card, Table, Button, Icon, Modal, Form, Input, Radio, Select, DatePicker, message } from 'antd'
import axios from '../../axios'
import utils from '../../utils/utils'
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
                        isVisible: false
                    });
                    message.success(data.result);
                    this.formItem.props.form.resetFields();
                    this.requestTableList();
                }
            })
    }

    //功能区
    handleOperate = (type) => {
        if (type == 'create') {
            this.setState({
                isVisible: true,
                title: '创建员工'
            })
        }
    }

    render() {
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
        ]
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
                />
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSumbit}
                    onCancel={() => {
                        this.setState({ isVisible: false });
                        this.formItem.props.form.resetFields();
                    }}
                >
                    <Domains wrappedComponentRef={(inst) => this.formItem = inst} />
                </Modal>
            </div>
        )
    }
}
export default User;

class Domain extends React.Component {
    render() {
        const Option = Select.Option;
        const TextArea = Input.TextArea;
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
                    {
                        getFieldDecorator('userName')(
                            <Input type='text' placeholder='请输入用户名' style={{ width: 195 }} />
                        )
                    }
                </Form.Item>
                <Form.Item label='性别'>
                    {
                        getFieldDecorator('sex')(
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        )
                    }
                </Form.Item>
                <Form.Item label='状态'>
                    {
                        getFieldDecorator('state')(
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
                    {
                        getFieldDecorator('birthday')(
                            <DatePicker showTime format='YYYY:MM:DD' style={{ width: 195 }} />
                        )
                    }
                </Form.Item>
                <Form.Item label='联系地址'>
                    {
                        getFieldDecorator('address')(
                            <TextArea placeholder='请输入联系地址' />
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}
const Domains = Form.create()(Domain)