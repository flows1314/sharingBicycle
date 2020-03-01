import React from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
class RichText extends React.Component {
    state = { visible: false ,editorState:''}
    //编辑器状态改变触发
    onEditorStateChange=(editorState)=>{
        this.setState({
            editorState
        })
    }
    //清除编辑器状态
    handleClean=()=>{
        this.setState({
            editorState:''
        })
    }
    //获取Html文本
    handleGetHtml=()=>{
        this.setState({
            visible:true
          });
    }
    //获取编辑器文本内容
    onContentStateChange=(contentState)=>{
        this.setState({
            contentState,
          });
    }
    render() {
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.handleGetHtml} style={{ marginRight: 3 }}>获取html文本</Button>
                    <Button type='danger' onClick={this.handleClean}>清除内容</Button>
                </Card>
                <Card>
                    <Editor
                        editorState={this.state.editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onContentStateChange}
                    />
                </Card>
                <Modal title='Html内容' visible={this.state.visible} footer={null} onCancel={()=>{this.setState({visible:false})}}>
                    {draftToHtml(this.state.contentState)}
                </Modal>
            </div>
        )
    }
}
export default RichText;