import axios from 'axios';
import {BASEAPI} from './config'
const service = axios.create({
    baseURL: BASEAPI,
    timeout: 5000,
});
// Response interceptors
service.interceptors.response.use(
    (response) => {
        // Some example codes here:
        // code == 200: 正常
        // code == 401: 重新登陆
        // code == -1: 异常
        // You can change this part for your own usage.
        const res = response.data;
        if (res.code !== 200) {
            console.error(res.msg||'接口异常')
            return Promise.reject(new Error('error with code: ' + res.code));
        } else {
            return response.data;
        }
    },
    (error) => {
        console.error(error.msg||'接口异常')
        return Promise.reject(error);
    },
);

export default service;
