import React from 'react';
import meunList from './../../config/meunConfig';
import './index.less';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
const { SubMenu } = Menu;
class NavLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meunTreeNodeime: '',
    }
  }
  componentWillMount() {
    const meunTreeNode = this.renderMeun(meunList)
    this.setState({
      meunTreeNode
    })
  }
  //菜单渲染
  renderMeun = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={<NavLink to={item.key}>{item.title}</NavLink>}>
            {this.renderMeun(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.key}><NavLink to={item.key}>{item.title}</NavLink></Menu.Item>

    })
  }
  render() {
    return (
      <div>
        <div className='left-log'>
          <img src='/assets/logo-ant.svg' alt='' />
          <h1>IMooc管理系统</h1>
        </div>
        <Menu
          theme='dark' mode="vertical" >
          {this.state.meunTreeNode}
        </Menu>
      </div>
    )
  }
}
export default NavLeft;