import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
export default class Axios{
  static jsonp(options){
    //resolve表示接口调用成功，reject表示接口调用失败
    return new Promise((resolve,reject)=>{
      JsonP(options.url,{
        param:'callback'
      },function(err,res){
        if(res.status === 'success') {
          resolve(res)
      } else {
          reject(err)
      }})
    })
  };
  static ajax(options){
    let basicApi = 'http://rap2api.taobao.org/app/mock/243979'
    return new Promise((resolve,reject)=>{
      axios({
        url:options.url,
        method:'get',
        baseURL:basicApi,
        timeout:5000,
        params:(options.data && options.data.params)||''
      }).then((response)=>{
          if(response.status=='200'){
            let res=response.data;
            if(res.code=='0'){
              resolve(res);
            }else{
              Modal.info({
                title:'提示',
                content:res.msg
              })
            }
          }else{
            reject(response.data)
          }
      })
    })
  }
}