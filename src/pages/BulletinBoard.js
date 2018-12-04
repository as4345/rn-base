import React, { Component } from 'react'
import { observer } from "mobx-react"
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    WebView 
} from 'react-native'
import {
    Toast
} from 'antd-mobile-rn'
import RecordListItem from '../components/RecordListItem'

import * as u from '../utils'

@observer
class BulletinBoard extends Component {
    state = {
        html: '',
        create_time: '',
        title: ''

    }
    componentDidMount = ()=>{
        this.init()
    }
    init = async () => {
        Toast.loading('加载中')
        const res = await u.post(u.config.baseUrl + '/common/v1/notice/detail')
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            Toast.hide()
            return
        }
        this.setState(() => {
            return { 
                html: res.data.content,
                title: res.data.title,
                create_time: res.data.create_time
            }
        });
    }
    // 根据数据返回新的列表项
    renderRecordListItem(o, i) {
        return <RecordListItem data={o} key={i}/>
    }

    render() {
        return (
            <View style={s.container}>
                <Text style={s.time}>{this.state.create_time}</Text>
                <Text style={s.title}>{this.state.title}</Text>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: this.state.html, baseUrl: '' }}
                    onLoad={() => {
                        Toast.hide()
                    }}
                />
            </View>
        )
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    time: {
        textAlign:'center',
        color: '#666',
        fontSize:12,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#efefef'
    },
    title: {
        paddingTop: 10,
        textAlign:'center',
        fontSize:16,
        color:'#000'
    }
})

export default BulletinBoard