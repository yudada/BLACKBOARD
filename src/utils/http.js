import axios from 'axios';
import router from '@/router/index'
import { Message } from 'element-ui';

// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const errorMessage = msg => {
    Message({
        message: msg,
        duration: 2000,
        type: 'error'
    });
}
const toLogin = () => {
    router.replace({
        path: '/login'
    });
}


const instance = axios.create({ timeout: 1000 * 12 });

// instance.defaults.baseURL = 'api';

instance.defaults.baseURL = 'http://192.168.8.123/';

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
            type: 'error'
        })
        return Promise.error(error);
    })


instance.interceptors.response.use(
    config => {
        NProgress.done()
        return config
    },
    response => {
        if (response.status === 200) {
            Message({
                message: response.data.msg,
                type: 'success'
            })
            return Promise.resolve(response.data);
        } else {
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
