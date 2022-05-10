import axios from 'axios';
import {message} from 'antd';

export default function ajax(url:string, data={}, method="GET"):Promise<any>{
  return new Promise((resolve:Function, reject:Function) => {
    let promise
    promise = method === "GET" 
    ? 
    axios.get(url, {params: data}) 
    :
    axios.post(url, data)

    promise.then((res:any):void => {
      resolve(res.data)
    }).catch((err:any):void => {
      message.error('请求错误：' + err.message)
    })
  })
}