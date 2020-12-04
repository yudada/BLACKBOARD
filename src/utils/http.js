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

const errorHandle = (status, other) => {
    switch (status) {
        case 501:
            errorMessage('登录过期，请重新登录');
            window.sessionStorage.clear();
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        case 404:
            errorMessage('请求的资源不存在');
            break;
        default:
            console.log(other);
    }
}

const instance = axios.create({ timeout: 1000 * 12 });

instance.defaults.baseURL = 'api';

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
            NProgress.done();
            if (response.status !== 200) {
                switch (status) {
                    case 404:
                        errorMessage('请求的资源不存在');
                        break;
                    default:
                        errorMessage('请求失败！');
                }
                return Promise.reject(response);
            }
        }
    },
    error => {
        const { response } = error;
        if (response) {
            errorHandle(response.status, response);
            return Promise.reject(response);
        } else {
            return Promise.reject(response);
        }
    }
);

export default instance;
