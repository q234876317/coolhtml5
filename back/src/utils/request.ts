import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import { getToken } from '@/utils/auth';
import { UserModule } from '@/store/modules/user';
import {getRandom} from '@/utils/tools';
import {AjaxModule} from '@/store/modules/ajaxlist'
import {APIService} from "@/config";
const service = axios.create({
    baseURL: APIService,
    timeout: 5000,
});

// Request interceptors
service.interceptors.request.use(
    (config) => {
        // Add authorization header to every request, you can add other custom headers here
        console.log(UserModule.token)
        if (UserModule.token) {
            config.headers.authorization = getToken();
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// Response interceptors
service.interceptors.response.use(
    (response) => {
        // Some example codes here:
        // code == 200: 正常
        // code == 401: 重新登陆
        // code == -1: 异常
        // You can change this part for your own usage.
        const res = response.data;
        const res_data={
            url:response.request.responseURL,
            method:response.config.method,
            req_data:response.config.data,
            req_params:JSON.stringify(response.config.params),
            headers:JSON.stringify(response.config.headers),
            res_data:JSON.stringify(res),
            is_error:false,
            status:response.status,
            id:getRandom()
        }
        AjaxModule.AddAjax(res_data)

        if (res.code !== 200) {
            if (res.code === 401) {
                MessageBox.confirm(
                    '你已被登出，可以取消继续留在该页面，或者重新登录',
                    '确定登出',
                    {
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        type: 'warning',
                    },
                ).then(() => {
                    UserModule.FedLogOut().then(() => {
                        location.reload(); // To prevent bugs from vue-router
                    });
                });
            } else {
                Message({
                    message: res.msg || '接口异常',
                    type: 'error',
                    duration: 5 * 1000,
                });
            }
            return Promise.reject(new Error('error with code: ' + res.code));
        } else {
            return response.data;
        }
    },
    (error) => {
        const res_data={
            url: error.config.url || "未知",
            method: error.config.method,
            req_data: error.config.data,
            req_params: JSON.stringify(error.config.params),
            status: error.request.status,
            headers: JSON.stringify(error.config.headers),
            is_error: true,
            error_msg: error.message,
            id: getRandom()
        }

        AjaxModule.AddAjax(res_data)

        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    },
);

export default service;
