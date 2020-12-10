import axios from 'axios';
import router from '@/router/index'
import { Message } from 'element-ui';

// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const isDev = process.env.NODE_ENV === 'development';

const instance = axios.create({
    baseURL: isDev ? 'http://192.168.8.123' : 'http://api.vrbook.vip',
    timeout: 1000 * 12
});

// instance.defaults.baseURL = 'http://api.vrbook.vip';

instance.defaults.headers.post['Content-type'] = 'application/json';

instance.interceptors.request.use(config => {
    NProgress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
},
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 2000
        })
        return Promise.error(error);
    })


instance.interceptors.response.use(
    config => {
        NProgress.done()
        return config
    },
    response => {
        NProgress.done()
        if (response.status === 200) {
            Message({
                message: "response.data.msg",
                type: 'success',
                duration: 2000
            })
            return Promise.resolve(response.data);
        } else {
            Message({
                message: response,
                type: 'error',
                duration: 2000
            })
            return Promise.reject(response);
        }
    },
    error => {
        console.log('err' + error)
        Message({
            message: error.message,
            type: 'error',
            durantion: 5 * 1000
        })
        NProgress.done();
        return Promise.reject(error)
    }
);

export default instance;
