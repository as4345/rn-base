import axios from 'axios'
// md5加密模块
import md5 from 'js-md5'
// vuex store 模块
// import store from '../store'
// 配置文件
import CONFIG from '../../config'
import CryptoJS  from'crypto-js';

const ax = axios.create()
// http request 拦截器

ax.interceptors.request.use(
    config => {
        const userToken = store.getters.userInfo.userToken ? store.getters.userInfo.userToken : ''
        
        if(userToken){//所以请求追加的头部
            config.headers.Authorization = 'Bearer'+' '+userToken //token验证
            config.headers.sign = createSign() //接口加密验证
        }
        if (config.data) { // 存在body字段
            if (userToken) {
                config.data.userToken = userToken // 写进token
            }
            config.data.sign = md5(asciiSort(config.data)) // 写进接口验证
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
ax.interceptors.response.use(
    response => {
        const toLoginArr = [1000, 1001, 1005, 3006]
        if (toLoginArr.indexOf(response.data.status) > -1) { // 跳转登录页
            const request = JSON.parse(response.config.data)
            if (!request.stopAutoTip) {
                // Vue.prototype.$message.error(response.data.msg)
                location.hash = '#/login'
            }
            store.dispatch('setUserInfo', {})
        }
        return response.data
    },
    error => {
        return Promise.reject(error.response)  // 返回接口返回的错误信息
    }
)
// 加密方法
const asciiSort = json => {
    var string = ''
    var arr = [];
    for (var k in json) {
        if (k !== 'sign') {
            arr.push(k)
        }
    }
    arr.sort()
    arr.forEach(function(item, index) {
        string = string + item + '=' + json[item] + '&'
    });
    string = string.substring(0, string.length - 1) + CONFIG.KEY
    return string
}

const createSign = () => {
    let time=Date.parse(new Date());
    let passwordData = "time="+ time +"&apptype=web&bid="+ Math.random();
    // let passwordData = "time=1540958201000&apptype=web&bid=0.7746341993351595"
    let vkey = 'uKSOhhi0m8aXOEgv';
    let key = CryptoJS.enc.Utf8.parse(vkey);
    let iv =   md5(vkey).substring(8, 24);
    let ivv = CryptoJS.enc.Utf8.parse(iv);
    let encrypted = CryptoJS.AES.encrypt(passwordData, key, { iv: ivv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
    passwordData = encrypted.toString();
}

export const request = ax 