import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    StatusBar,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Platform,
    Animated
} from 'react-native'
import {
    List,
    InputItem,
    Toast,
    Button
} from 'antd-mobile-rn'


import * as u from '../utils'

class RollView extends Component {

    state = {
        page: 1,
        listData: [],
        refreshing: false,
        feching: false,
        dataOver: false,
        refreshViewHeight: new Animated.Value(0),
        fetchSuccess: false,
    }

    rFecth = false

    // 拿数据
    getlist = async isRefresh => {
        const { url } = this.props
        const res = await u.post(u.config.baseUrl + url, {
            page: this.state.page
        })
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return 
        }
        let newData = []
        if (isRefresh) {
            newData = res.data
        } else {
            newData = JSON.parse(JSON.stringify(this.state.listData))
            newData = newData.concat(res.data)
        }
        this.setState({
            listData: newData,
            refreshing: false,
            feching: false,
            dataOver: (this.state.dataOver || !res.data.length) ? true : false
        })
        if (isRefresh) {
            this.setState({
                fetchSuccess: true,
            })
            setTimeout(() => {
                Animated.timing(                  // 随时间变化而执行动画
                    this.state.refreshViewHeight,            // 动画中的变量值
                    {
                        toValue: u.rh(0),                   // 透明度最终变为1，即完全不透明
                        duration: 200,              // 让动画持续一段时间
                    }
                ).start()
            }, 1200)
            setTimeout(() => {
                this.setState({
                    fetchSuccess: false,
                })
            }, 4000)
        }
    }

    // 上拉加载
    handleReached = () => {
        // if (this.rFecth && (this.state.dataOver || this.state.refreshing || this.state.feching)) {
        //     console.log('!!!触发硬性阻止')
        // }
        // if (this.rFecth) { // 硬性阻止，使用state有延迟可能多次触发拉取
        //     return
        // } else {
        //     this.rFecth = true
        // }
        console.log('触发拉数据，页面：', this.state.page + 1)
        console.log(this.state.dataOver, this.state.refreshing , this.state.feching)

        const { disabledReached } = this.props // 禁止上拉加载
        if (this.state.dataOver || this.state.refreshing || this.state.feching || disabledReached) {
            console.log('没有走通的拉数据，页面：', this.state.page + 1)
            this.rFecth = false
            return
        }

        console.log('走通的拉数据，页面：', this.state.page + 1)
        this.setState({
            page: this.state.page + 1,
            feching: true,
        }, () => {
            this.getlist()
            this.rFecth = false
        })
    }

    //下拉刷新
    handleRefresh = () => {
        // if (this.rFecth) { // 硬性阻止，使用state有延迟可能多次触发拉取
        //     return
        // } else {
        //     this.rFecth = true
        // }
        const { refreshCallback } = this.props
        console.log('触发复位数据，页面：', 1)
        
        Animated.timing(                  // 随时间变化而执行动画
            this.state.refreshViewHeight,            // 动画中的变量值
            {
                toValue: u.rh(34),                   // 透明度最终变为1，即完全不透明
                duration: 200,              // 让动画持续一段时间
            }
        ).start()
        this.setState({
            page: 1,
            refreshing: true,
            dataOver: false,
        }, () => {
            console.log('走通复位，页面：', this.state.page)
            this.getlist(true)
            refreshCallback && refreshCallback()
            this.rFecth = false
        })
    }

    defaultHead = () => {
        const { headView } = this.props
        return (
            <View>
                <Animated.Text style={{...s.at, height: this.state.refreshViewHeight}}>
                    {this.state.fetchSuccess ? '刷新成功！' : '正在刷新...'}
                </Animated.Text>
                {
                    headView && headView
                }
            </View>
        )
    }
    defaultFoot = () => {
        const { footView } = this.props
        return (
            <View>
                {
                    footView && footView
                }
                {
                    this.state.page != 1 && (
                    <Text style={s.freshing}>
                        {
                            this.state.feching && !this.state.dataOver
                            ? '正在加载...'
                            : '数据已加载完'
                        }
                    </Text>
                    )
                }
            </View>
        )
    }
    
    componentDidMount() {
        this.handleRefresh()
    }
    render() {
        const { headView, itemView, footView } = this.props
        return (
            <FlatList
                ref='flatList'
                data={this.state.listData}
                extraData={this.state}
                keyExtractor={(item, index) => String(index)}
                ListHeaderComponent={this.defaultHead} // 头部默认组件
                ListFooterComponent={this.defaultFoot} // 底部默认组件
                ListEmptyComponent={
                    !(this.state.feching || this.state.refreshing) && !this.state.listData.length && 
                    <Text style={s.t5}>暂无数据</Text>
                }
                renderItem={itemView}
                onEndReached={this.handleReached}
                refreshing={this.state.refreshing}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={this.handleRefresh}
                    />
                }
                onEndReachedThreshold={0.5}
            />
        )
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#0e0e11',
    },
    t1: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        paddingLeft: u.rw(6),
        paddingRight: u.rw(6),
    },
    t2: {
        fontSize: 27,
        color: '#ffb400',
        marginTop: u.rh(12),
        marginBottom: u.rh(18),
        textAlign: 'center',
    },
    v1_1: {
        marginTop: u.rh(16),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    v1_2: {
        backgroundColor: '#FFB400',
        width: u.rw(3),
        height: u.rh(12),
        borderRadius: u.rw(3)
    },
    v2: {
        width: u.rw(348),
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: u.rh(16),
        paddingBottom: u.rh(16),
        paddingLeft: u.rw(29),
        paddingRight: u.rw(29),
        backgroundColor: '#1C1E29',
        borderRadius: u.rw(10),
        marginBottom: u.rh(10),
    },
    v2_1: {
        flexDirection: 'row',
        marginBottom: u.rh(4)
    },
    v3: {
        flex: 1
    },
    t3: {
        fontSize: 13,
        color: '#5d6368'
    },
    t3_1: {
        fontSize: 13,
        color: '#fff'
    },
    t4: {
        fontSize: 15,
        color: '#CA9117'
    },
    at: {
        color: 'gray',
        textAlign: 'center',
        textAlignVertical:'center',
        ...Platform.select({
            ios:{
                lineHeight: u.rh(34),
            },
            android:{
            }
        }),
    },
    freshing: {
        color: 'gray',
        textAlign: 'center',
        marginTop: u.rh(10),
        paddingBottom: u.rh(10)
    },
    t5: {
        textAlign: 'center',
        paddingTop: u.rh(20),
        paddingBottom: u.rh(20),
        color: 'gray'
    }

})

export default RollView