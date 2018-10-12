import axios from "axios"
import qs from "qs"

//二次封装的axios
/**
 * 入参
 * arg Object
 * 例：{
 *  url: String 接口地址，会被拼接上host前缀
 *  type: String 请求类型 get、post
 *  data: Object 请求携带数据，无论get还是post都将数据放在这里面
 *  noHost: Boolean 默认false 是否不带前缀，传true则不带host前缀
 *  noFormat: Boolean 默认false 是否不用qs插件格式化，部分post类型请求会用到，传true则不用qs格式化，以解决部分请求报错
 * }
 */


const host = ""


export default arg => {
    if(!arg.noHost){
        arg.url = host + arg.url
    }
    let parmArr = []
    let data = {}   // 最终调接口用的数据

    // 接口参数分解
    if(arg.type === "GET" || arg.type === "get" || !arg.type){    // get类型
        if(arg.data){
            const temData = arg.data
            for(var key in temData){
                parmArr.push(key + "=" + temData[key])
            }
        }
    }else{  // post类型
        if(arg.noFormat){   // 如果不需要格式化
            data["data"] = arg.data
        }else{
            data["data"] = qs.stringify(arg.data)
        }
    }

    const parmStr = parmArr.join("&") ? "?" + parmArr.join("&") : ""
    data["url"] = arg.url + parmStr     // get类型请求拼接上请求数据
    arg.type && (data["method"] = arg.type)
    	
    return axios({
            ...data,
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            // withCredentials: true
        })
        .then(res => {
            // 正常回调
            return res.data
        })
        .catch(err => {
            // 错误回调
            console.log(err)
        })
}