import React from 'react';
import meunList from './../../config/meunConfig';
import './index.less';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {switchMeun} from '../../redux/action'
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
    const meunTreeNode = this.renderMeun(meunList);
    //利用正则去除多余字符
    let currentKey = window.location.hash.replace(/#|\?.*$/g, '');
    this.setState({
      meunTreeNode, currentKey
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
          theme='dark'
          mode="vertical"
          selectedKeys={[this.state.currentKey]}
          onClick={(item) => {
            const meunName=item.item.props.children.props.children;
            const {dispatch}=this.props;
            this.setState({ currentKey: item.key });
            dispatch(switchMeun(meunName))
          }}
        >
          {this.state.meunTreeNode}
        </Menu>
      </div>
    )
  }
}
export default connect()(NavLeft);