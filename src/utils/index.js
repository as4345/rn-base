import { AsyncStorage } from 'react-native'

// 请求方法
import * as req from './http'
export const post = req.request.post
export const get = req.request.get

import Store from './store'
export const store  = Store

import Config from '../config'
export const config = Config

// 样式方法属性
import * as Style from './style'
export const { WIDTH, HEIGHT, INNERWIDTH, rh, rw} = Style


import * as key from './pageKey'
export const KEY = key;

export const storage = AsyncStorage

