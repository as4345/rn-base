/**
 * 记录列表
 * author： liubf
 * usePage：交易记录、邀请记录
 */
import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground
} from 'react-native'

import * as u from '../utils'

/**
 * [props接收值]
 * @param  {
 *     data: {
 *         title: {
 *             text_label:''        // 标题label
 *             text_value:''        // 标题值
 *             tip：''              // 标题右边提示
 *         },
 *         list:[{                  // 内容数组
 *             label:'',            // 内容label
 *             value:''             // 内容值
 *         }]
 *     }
 * }
 */
export default props => {
    // 块背景
    let bgImg = require('../assets/img/recordingBg.png')
    let data = props.data
    return (
        <ImageBackground style={s.block_bg} resizeMode='stretch' source={bgImg}>
            <View style={s.title}>
                <View style={s.titleLeft}>
                    <Text style={s.title_label}>{data.title.text_label}</Text>
                    <Text style={s.title_con}>{data.title.text_value}</Text>
                </View>
                <Text style={s.titleRight}>{data.title.tip}</Text>
            </View>
            <View style={s.text_bg}>
                {
                    // 生成内容项
                    data.list.map((o, i)=>{
                        return <View style={data.list.length-1 === i ? s.text_bg_con_nohr : s.text_bg_con} key={i}>
                            <View style={s.text_p}>
                                <Text style={s.text_p_label}>{o.label}</Text>
                                <Text style={s.text_p_con}>{o.value}</Text>
                            </View>
                        </View> 
                    })
                }
            </View>
        </ImageBackground>
    )
}
const s = StyleSheet.create({
    block_bg: {
        width: u.rw(400),
        paddingBottom: u.rh(13),
        marginBottom: u.rh(13)
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: u.rw(350),
        marginLeft: u.rw(12.5),
        marginBottom: u.rh(13),
        paddingTop: u.rh(10),
        paddingBottom: u.rh(10),
        borderBottomWidth: 1,
        borderBottomColor: '#686666',
    },
    titleLeft: {
        flexDirection: 'row',
        width: u.rw(200)
    },
    titleRight: {
        color: '#dcb125'
    },
    title_label: {
        color: '#fff',
        paddingLeft: u.rw(15),
        paddingRight: u.rw(15),
        borderLeftColor: '#fff',
        borderLeftWidth: 2
    },
    title_con: {
        color: '#dcb125',
    },
    text_bg: {
        width: u.rw(350),
        marginLeft: u.rw(12.5),
        backgroundColor: '#dcb126',
        paddingTop: u.rh(5),
        paddingBottom: u.rh(5)
    },
    text_bg_con: {
        borderBottomWidth: 1,
        borderBottomColor: '#e7c967',
        paddingLeft: u.rh(15),
        paddingRight: u.rh(15)
    },
    text_bg_con_nohr: {
        paddingLeft: u.rh(15),
        paddingRight: u.rh(15)
    },
    text_p: {
        flexDirection: 'row',
        textAlign: 'center',
        color: "#fff",
        marginTop: u.rh(8),
        marginBottom: u.rh(8)
    },
    text_p_label: {
        fontSize: 10,
        width: u.rw(80)
    },
    text_p_con: {
        width: u.rw(250),
        fontSize: 10
    }
})