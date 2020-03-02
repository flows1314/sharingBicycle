import React from 'react'
import axios from '../../axios'
import utils from '../../utils/utils'
import meun from '../../config/meunConfig'
import { Card, Button, Modal, Table, Form, Input, Select, message, Tree } from 'antd'
class Authority extends React.Component {
    state = { visible: false }
    componentDidMount() {
        this.requestList()
    }
    //请求列表数据
    requestList = () => {
        axios.ajax({ url: 'authority/list', data: { params: { page: 1 } } })
            .then((res) => {
                if (res.code == 0) {
                    this.setState({
                        list: res.result,
                        meunList: res.result[0].meun
                    })
                }
            })
    }

    //点击表格行
    handleRowSelection = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedItem: selectedRows[0]
        })
    }
    //点击行OnROW
    handleOnRow = (record, index) => {
        return {
            onClick: () => {
                this.setState({
                    selectedRowKeys: [index],
                    selectedItem: record
                })
            }
        }
    }
    //点击创建角色
    handleCreateRole = () => {
        this.setState({
            visible: true
        })
    }
    //角色创建提交
    handldRoleSubmit = () => {
        let values = this.formItem.props.form.getFieldsValue();
        axios.ajax({ url: 'authority/create', data: { params: values } })
            .then((res) => {
                if (res.code == 0) {
                    message.success({
                        content: res.result
                    })
                    this.setState({ visible: false })
                    this.formItem.props.form.resetFields()
                    this.requestList()
                }
            })
    }
    //权限设置
    handleSetting = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '权限设置提示',
                content: '请先选择角色！'
            })
            return;
        }
        this.setState({
            authority_visible: true,
        })
    }
    //获取权限菜单
    getCheckedKeys = (checkedKeys) => {
        this.setState({
            meunList: checkedKeys
        })
    }
    //权限提交
    handldAuthoritySubmit = () => {
        let data = this.formAuthority.props.form.getFieldsValue();
        data.user_id = this.state.selectedItem.id;
        data.meunList = this.state.meunList;
        axios.ajax({ url: 'authority/submit', data: { params: data } })
            .then((res) => {
                if (res.code == 0) {
                    message.success(res.result);
                    this.setState({ authority_visible: false, selectedRowKeys: '', selectedItem: '' })
                }
            })

    }

    render() {
        //表格标题
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'roleName',
                render(roleName) {
                    let config = {
                        '1': '管理人员',
                        '2': '客服专员',
                        '3': '财务专员',
                        '4': '后勤人员',
                    }
                    return config[roleName]
                }
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render(create_time) {
                    return utils.formateDate(create_time)
                }
            }, {
                title: '使用状态',
                dataIndex: 'use_state',
                render(use_state) {
                    return use_state == 1 ? '停用' : '启用'
                }
            }, {
                title: '授权时间',
                dataIndex: 'authority_time',
                render(authority_time) {
                    return utils.formateDate(authority_time)
                }
            }, {
                title: '授权人',
                dataIndex: 'authority_user'
            }
        ]
        //表格行是否可选
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys || [],
            onChange: this.handleRowSelection
        }

        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.handleCreateRole} icon="plus" >创建角色</Button>
                    <Button type="primary" onClick={this.handleSetting} icon="setting" style={{ margin: "0 3px" }} >设置权限</Button>
                    <Button type='primary' icon="user">用户授权</Button>
                </Card>
                <Card>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        rowSelection={rowSelection}
                        onRow={this.handleOnRow}
                    />
                </Card>
                <Modal
                    title='创建角色'
                    visible={this.state.visible}
                    onOk={this.handldRoleSubmit}
                    onCancel={() => {
                        this.setState({ visible: false });
                        this.formItem.props.form.resetFields()
                    }}
                >
                    <FormRole wrappedComponentRef={(inst) => this.formItem = inst} />
                </Modal>
                <Modal
                    title='设置权限'
                    visible={this.state.authority_visible}
                    onOk={this.handldAuthoritySubmit}
                    onCancel={() => {
                        this.setState({ authority_visible: false, selectedRowKeys: '', selectedItem: '' });
                        this.formAuthority.props.form.resetFields()
                    }}
                >
                    <FormAuthority
                        wrappedComponentRef={(inst) => this.formAuthority = inst}
                        item={this.state.selectedItem}
                        meunList={this.state.meunList}
                        getCheckedKeys={this.getCheckedKeys}
                    />
                </Modal>
            </div>
        )
    }
}
export default Authority;

//创建角色表单组件
class Role extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const Option = Select.Option;
        const formLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 }
        }
        return (
            <Form layout='horizontal'>
                <Form.Item label='创建角色' {...formLayout}>
                    {getFieldDecorator('roleName')(
                        <Input placeholder='请输入角色名称' />
                    )}
                </Form.Item>
                <Form.Item label='状态' {...formLayout}>
                    {getFieldDecorator('state')(
                        <Select placeholder='请选择当前状态'>
                            <Option value={0}>开启</Option>
                            <Option value={1}>关闭</Option>
                        </Select>
                    )}
                </Form.Item>
            </Form>
        )
    }
}
const FormRole = Form.create()(Role)


//权限设置组件
class Author extends React.Component {
    //遍历tree节点
    renderTreeNodes = (meun) => {
        const { TreeNode } = Tree;
        return meun.map((item) => {
            if (item.children) {
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            }
            return <TreeNode title={item.title} key={item.key} />
        })
    }

    onCheck = (checkedKeys) => {
        this.props.getCheckedKeys(checkedKeys)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { roleName } = this.props.item;
        const Option = Select.Option;
        const { TreeNode } = Tree;
        const meunList = this.props.meunList
        const formLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 }
        }
        const config = {
            '1': '管理人员',
            '2': '客服专员',
            '3': '财务专员',
            '4': '后勤人员',
        }
        return (
            <Form layout='horizontal'>
                <Form.Item label='角色名称' {...formLayout}>
                    <Input disabled placeholder={config[roleName]} />
                </Form.Item>
                <Form.Item label='状态' {...formLayout}>
                    {getFieldDecorator('state')(
                        <Select placeholder='请选择当前状态'>
                            <Option value={0}>开启</Option>
                            <Option value={1}>关闭</Option>
                        </Select>
                    )}
                </Form.Item>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys) => { this.onCheck(checkedKeys) }}
                    checkedKeys={meunList}
                >
                    <TreeNode title='平台权限' key='plateAuthority'>
                        {this.renderTreeNodes(meun)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
const FormAuthority = Form.create()(Author)
