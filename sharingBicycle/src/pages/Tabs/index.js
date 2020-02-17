import React from 'react'
import { Card, Tabs, message, Icon } from 'antd';

class Tab extends React.Component {
state={
  panes:[],
}
newTabIndex = 0;
  componentDidMount(){
    const panes=[
      {
        title:"页签一",
        content:'这是标签页一',
        key:'1'
      },
      {
        title:"页签二",
        content:'这是标签页二',
        key:'2'
      },
      {
        title:"页签三",
        content:'这是标签页三',
        key:'3'
      }
    ];
    this.setState({
      panes,
      activeKey:panes[0].key
    })
  }

  onChange=(activeKey)=>{
    this.setState({
      activeKey
    })
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: activeKey, content: `Content of new Tab is ${activeKey}`, key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  render() {
    const { TabPane } = Tabs;
    return (
      <div>
        <Card title='Tabs页签' style={{ marginBottom: 10 }}>
          <Tabs defaultActiveKey="1" onChange={(activeKey) => {
            message.success(`这是页签${activeKey}`)
          }}>
            <TabPane tab="页签 1" key="1">
              这是第一个页签
          </TabPane>
            <TabPane tab="页签 2" key="2" disabled>
              这是第二个页签
          </TabPane>
            <TabPane tab="页签 3" key="3">
              这是第三个页签
          </TabPane>
          </Tabs>
      </Card >
      <Card title='Tabs带图标页签' style={{ marginBottom: 10 }}>
          <Tabs defaultActiveKey="1" onChange={(activeKey) => {
            message.success(`这是页签${activeKey}`)
          }}>
            <TabPane tab={<span><Icon type="plus" />增加</span>} key="1">
              这是第一个页签
          </TabPane>
            <TabPane tab={<span><Icon type='edit'/>编辑</span>} key="2" disabled>
              这是第二个页签
          </TabPane>
            <TabPane tab={<span><Icon type='delete'/>删除</span>} key="3">
              这是第三个页签
          </TabPane>
          </Tabs>
      </Card >
      <Card title='Tab可关闭卡片式页签' style={{ marginBottom: 10 }}>
          <Tabs 
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
          
          >
           {this.state.panes.map((item)=>{
              return <TabPane tab={item.title} key={item.key}>{item.content}</TabPane>
           })}
          </Tabs>
      </Card >
    </div>

    )
  }
}
export default Tab;