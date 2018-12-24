
let url = ''
let _apkUrl = ''
if (process.env['NODE_ENV'] == "development") {
    url = 'https://ttt.jbp.im/backend'  // 测试环境debug包
    _apkUrl = 'https://ttt.jbp.im/app/jbp.apk'
    _mWeb = 'https://ttt.jbp.im'
} else {
    // url = 'https://ttt.jbp.im/backend' // 测试环境正式包
    // _apkUrl = 'https://ttt.jbp.im/app/jbp.apk'
    // _mWeb = 'https://ttt.jbp.im'

    url = 'https://jbp.im/backend'   // 正式环境正式包
    _apkUrl = 'https://jbp.im/app/jbp.apk'
    _mWeb = 'https://jbp.im'
}
export const baseUrl = url // 接口host
export const apkUrl = _apkUrl // 下载apk地址
export const mWeb = _mWeb   // 手机网站地址