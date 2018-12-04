import React, { Component } from 'react'
import { observer } from "mobx-react"
import {
    StyleSheet,
    ScrollView,
    Text
} from 'react-native'
import {
    Toast
} from 'antd-mobile-rn'
import RecordListItem from '../components/RecordListItem'

import * as u from '../utils'

@observer
class InviteRecord extends Component {
    state = {
        conShow: false,
        data: []
    }
    componentDidMount = ()=>{
        this.init()
    }
    init = async () => {
        Toast.loading('加载中')
        const res = await u.post(u.config.baseUrl + '/common/v1/Record/getInviteLog')
        this.setState(() => {
            return { conShow: true }
        })
        Toast.hide()
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return
        }
        let arr = []
        res.data.forEach((item,i)=>{
            let o = {
                title:{
                    text_label:"邀请记录",
                    tip:"是否孵化：" + (item.user_activate===1?'是':'否')
                },
                list:[{
                    label:"邀请人昵称：",
                    value:item.username
                },{
                    label:"注册时间：",
                    value:item.add_time
                },{
                    label:"实名认证：",
                    value:item.auth_time
                },{
                    label:"节点人数：",
                    value:item.tem_num
                },{
                    label:"节点孵化总额：",
                    value:item.amount
                }]
            }
            arr.push(o)
        })
        this.setState(() => {
            return { data: arr }
        });
    }
    // 根据数据返回新的列表项
    renderRecordListItem(o, i) {
        return <RecordListItem data={o} key={i}/>
    }

    render() {
        if (!this.state.conShow) {
          return null;
        }
        return (
            <ScrollView style={s.container}>
                {
                    this.state.data.length>0 ? this.state.data.map((o,i)=>this.renderRecordListItem(o,i)):<Text style={s.textCenter}>暂无数据</Text>
                }
            </ScrollView>
        )
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1
    },
    textCenter: {
        marginTop: 100,
        textAlign:'center'
    }
})

export default InviteRecord