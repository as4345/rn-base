import axios from 'axios'
// md5加密模块
import md5 from 'js-md5'
// 配置文件
import CryptoJS  from'crypto-js';
import store from '../store'
import {stringify} from 'qs'
import { AsyncStorage } from 'react-native'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import {
    List,
    InputItem,
    Toast
} from 'antd-mobile-rn'

const ax = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
// http request 拦截器

ax.interceptors.request.use(
    async config => {
        console.log(config)
        let tokenData = await AsyncStorage.getItem('tokenData')
        tokenData = tokenData ? JSON.parse(tokenData) : {}
        const userToken = tokenData.token ? tokenData.token.access_token : ''
        config.headers.common.sign = createSign() //接口加密验证
        if(userToken){//所以请求追加的头部
            config.headers.common.Authorization = 'Bearer'+' '+userToken //token验证
        }
        config.data = stringify(config.data)
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
ax.interceptors.response.use(
    response => {
        const toLoginArr = [1, 1001, 1005, 3006]
        if (toLoginArr.indexOf(response.data.code) > -1) { // 跳转登录页
            store.setUserInfo({})
            store.setTokenData({})
            Actions['SCENE_LOGIN']()
        }
        console.log(response)
        return response.data
    },
    error => {
        console.log(error)
        return Promise.reject(error.response)  // 返回接口返回的错误信息
    }
)

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
    return passwordData
}

export const request = ax 