import React from 'react'
import BaseForm from '../../component/BaseForm'
import { Card } from 'antd'
class User extends React.Component {
    render() {
        const formList = [
            {
                type: 'Input',
                label: '用户名',
                field: 'userName',
                width: 145,
                placeholder: '请输入用户名'
            }, {
                type: 'Input',
                label: '用户手机号',
                field: 'number',
                width: 145,
                placeholder: '请输入你的手机号'
            }, {
                type: 'Date',
                label: '请选择入职日期',
                field: 'data',
                width: 105,
                placeholder: '请输入日期'
            },
        ]
        return (
            <div>
                <Card>
                    <BaseForm formList={formList} />
                </Card>
            </div>
        )
    }
}
export default User;