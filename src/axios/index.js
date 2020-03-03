import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import Utils from '../utils/utils'
export default class Axios {
  static jsonp(options) {
    //resolve表示接口调用成功，reject表示接口调用失败
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, function (err, res) {
        if (res.status === 'success') {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  };

  static requestList(_this, url, params, isMock) {
    var data = { params, isMock } //isMOck参数如果是true，使用MOCK接口数据，
    this.ajax({                   //如果是false使用业务真实数据接口
      url,
      data
    }).then((res) => {
      if (res.code == 0) {
        let list = res.item_list.map((item, index) => {
          item.key = index; //map方法创建一个新数组，结果是数组中每一个元素都调用
          return item;      //提供的函数后返回的结果
        });
        _this.setState({
          list,
          pagination: Utils.pagination(res, (current) => {
            _this.params.page = current;
            _this.requestList();
          })
        })
      }
    })
  }

  static ajax(options) {
    let loading;
        if (options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
    // let basicApi = '';
    // if (options.data.isMock) {
    //   basicApi = 'http://rap2api.taobao.org/app/mock/243979'
    // } else {
    //   basicApi = '真实业务接口'
    // }
    const basicApi = 'http://rap2api.taobao.org/app/mock/243979'
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: basicApi,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then((response) => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
      }
        if (response.status == '200') {
          let res = response.data;
          if (res.code == '0') {
            resolve(res);
          } else {
            Modal.info({
              title: '注意提示',
              content: res.msg
            })
          }
        } else {
          reject(response.data)
        }
      })
    })
  }
}