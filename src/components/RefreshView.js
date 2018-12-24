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

class RefreshView extends Component {

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

    // 成功拿到数据
    getDataSuccess = async isRefresh => {
        this.setState({
            refreshing: false,
            feching: false,
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

    //下拉刷新
    handleRefresh = () => {
        const { freshFn } = this.props // freshFn必须为Promise对象
        
        Animated.timing(                  // 随时间变化而执行动画
            this.state.refreshViewHeight,            // 动画中的变量值
            {
                toValue: u.rh(34),                   // 透明度最终变为1，即完全不透明
                duration: 200,              // 让动画持续一段时间
            }
        ).start()
        this.setState({
            refreshing: true,
        }, async () => {
            console.log('走通复位，页面：', this.state.page)
            await freshFn()
            this.getDataSuccess()
        })
    }

    defaultHead = () => {
        const { rView } = this.props
        return (
            <View>
                <Animated.Text style={{...s.at, height: this.state.refreshViewHeight}}>
                    {this.state.fetchSuccess ? '刷新成功！' : '正在刷新...'}
                </Animated.Text>
                {
                    rView && rView
                }
            </View>
        )
    }
    
    componentDidMount() {
        this.handleRefresh()
    }
    render() {
        const { rView } = this.props
        return (
            <FlatList
                ref='flatList'
                data={this.state.listData}
                extraData={this.state}
                keyExtractor={(item, index) => String(index)}
                ListHeaderComponent={this.defaultHead} // 头部默认组件
                renderItem={<View></View>}
                refreshing={this.state.refreshing}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={this.handleRefresh}
                    />
                }
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

export default RefreshView