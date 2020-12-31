import axios from 'axios';
import router from '@/router/index'
import { Message, MessageBox } from 'element-ui';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const toLogin = () => {
    router.replace({
        path: '/login'
    });
}

const to404 = () => {
    router.replace({
        path: '/404'
    });
}

const isDev = process.env.NODE_ENV === 'development';

const service = axios.create({
    baseURL: isDev ? 'api' : 'https://api.vrbook.vip',
    timeout: 1000 * 12,
    // baseURL: 'https://api.vrbook.vip'
});

service.defaults.headers.post['Content-type'] = 'multipart/form-data';

service.interceptors.request.use(
    config => {
        NProgress.start()
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    },
    error => {
        console.log(error, 1);
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        NProgress.done()
        const res = response.data
        if (res.statusCode !== 200) {
            Message({
                message: res.msg || 'Error',
                type: 'error',
                durantion: 5 * 1000
            })
            if (res.statusCode === 501) {
                MessageBox.confirm('登录超时，请重新登录！', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.sessionStorage.clear();
                    toLogin();
                })
            } else if(res.statusCode === 404) {
                window.sessionStorage.clear();
                to404();
            }
            console.log(response, 2);
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error, 1)
        Message({
            message: error.message,
            type: 'error',
            durantion: 5 * 1000
        })
        NProgress.done();
        return Promise.reject(error)
    }
)

export default service;