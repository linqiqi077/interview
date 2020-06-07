import axios from 'axios';
import { message } from 'antd';
import requestUrl from './requestCfg'

function Get(url: string, options: object, callback = (data: any) => { }) {
  axios.get(`${requestUrl}${url}`, {
    ...options
  })
    .then(function (response) {
      if (response.data.success) {
        let result = response.data;
        callback({ ...result })
      } else {
        message.error(response.data.errormsg)
      }

    })
    .catch(function (error) {
      console.log(error);
    });
}

function Post(url: string, options: object, callback = (data: any) => { }) {
  axios.post(`${requestUrl}${url}`, {
    ...options
  })
    .then(function (response) {
      if (response.data.success) {
        let result = response.data;
        callback({ ...result })
      } else {
        message.error(response.data.errormsg)
      }

    })
    .catch(function (error) {
      console.log(error);
    });
}

export {
  Get,
  Post
}