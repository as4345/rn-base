
let url = ''
let _apkUrl = ''
if (process.env['NODE_ENV'] == "development") {
    url = 'https://ttt.jbp.im/backend'
    _apkUrl = 'https://ttt.jbp.im/app/jbp.apk'
} else {
    url = 'https://jbp.im/backend'
    _apkUrl = 'https://jbp.im/app/jbp.apk'
}
export const baseUrl = url // 接口host
export const apkUrl = _apkUrl // 下载apk地址