import React from 'react';
import './index.less';
import {Card,Button,Icon, Radio} from 'antd';
const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;
class Buttons extends React.Component{
  state={
    flag:true,
  }
  handleStart=()=>{
    this.setState({
      flag:true,
    })
  }
  handleClose=()=>{
    this.setState({
      flag:false,
    })
  }
  handleSize=(e)=>{
    this.setState({
      size:e.target.value,
    })
  }
  render(){
      return(
          <div className='mainer'>
            <Card 
            title='基础按钮'
            >
                <Button type='primary' className='btn'>primary</Button>
                <Button className='btn'>Default</Button>
                <Button type='dashed' className='btn'>dashed</Button>
                <Button type='link' className='btn'>link</Button>
                <Button type='danger' disabled className='btn'>danger</Button>
            </Card>
            <Card 
            title='图形按钮'
            >
                <Button icon='plus' className='btn'>创建</Button>
                <Button icon='edit' className='btn'>编辑</Button>
                <Button icon='delete' className='btn'>删除</Button>
                <Button icon='search' shape='circle' className='btn'/>
                <Button icon='search' type='primary' className='btn'>搜索</Button>
                <Button icon='download' type='primary' className='btn'>下载</Button>
                <Button type='primary' className='btn'><Icon type='download'/>下载</Button>
            </Card>
            <Card 
            title='Loading按钮'
            >
                <Button loading={this.state.flag} type='primary' className='btn'>确定</Button>
                <Button loading={this.state.flag} shape='circle' className='btn'/>
                <Button loading={this.state.flag} type='primary' className='btn'>点击加载</Button>
                <Button type='primary' className='btn' onClick={this.handleStart}>开始</Button>
                <Button type='danger' className='btn'onClick={this.handleClose}>关闭</Button>
            </Card>
            <Card 
            title='按钮组'
            >
              <ButtonGroup>
                <Button type='primary' className='btn'><Icon type='left'/>前进</Button>
                <Button type='primary' className='btn'>后退<Icon type='right'/></Button>
              </ButtonGroup>
            </Card>
            <Card 
            title='按钮尺寸'
            >
              <RadioGroup value={this.state.size} onChange={this.handleSize}>
                <Radio value='small'>小</Radio>
                <Radio value='default'>中</Radio>
                <Radio value='large'>大</Radio>
              </RadioGroup>
                <Button type='primary' className='btn' size={this.state.size}>前进</Button>
                <Button type='primary' className='btn' size={this.state.size}>后退</Button>
                <Button type='primary' className='btn' size={this.state.size}>停止</Button>
            </Card>
          </div>
      )
  }
}
export default Buttons;