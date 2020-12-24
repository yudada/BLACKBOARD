import axios from 'axios';
import { Message } from 'element-ui';

// 导入 NProgress 包对应的JS和CSS
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

const instance = axios.create({
    // baseURL: isDev ? 'api' : 'https://api.vrbook.vip',
    timeout: 1000 * 12,
    baseURL: 'https://api.vrbook.vip'
});

instance.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded';

instance.interceptors.request.use(config => {
    NProgress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
},
    error => {
        Message({
            message: error.message + '请求失败!',
            type: 'error',
            duration: 2000
        })
        console.log('err' + error)
        return Promise.error(error);
    })


instance.interceptors.response.use(
    config => {
        NProgress.done()
        return config
    },
    response => {
        NProgress.done()
        if (response.status !== 200) {
            Message({
                message: response,
                type: 'error',
                duration: 2000
            })
            console.log('err' + error)
            return Promise.reject(response);
        } else {
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
                } else if (res.statusCode === 404) {
                    window.sessionStorage.clear();
                    to404();
                }
                console.log(response, 2);
                return Promise.reject(new Error(res.msg || 'Error'))
            } else {
                return Promise.resolve(response.data);
            }
        }
    },
    error => {
        console.log('err' + error)
        Message({
            message: '操作失败!',
            type: 'error',
            durantion: 5 * 1000
        })
        NProgress.done();
        return Promise.reject(error)
    }
);

export default instance;
