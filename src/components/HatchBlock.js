import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native'
import MarqueeLabel from 'react-native-lahk-marquee-label'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../utils'

export default props => {
    const bgImg = props.title ? require('../assets/img/indexBg.png') : require('../assets/img/recordingBg.png')
    const time = props.mqrqueeLabel && props.mqrqueeLabel.length ? props.mqrqueeLabel.length * 0.05 * 10000 : 0
    return (
        <View>            
            <ImageBackground style={s.bg_con} resizeMode='stretch' source={bgImg}>
                {
                    props.mqrqueeLabel && 
                    <TouchableOpacity onPress={() => {Actions['SCENE_BULLETINBOARD']()}}> 
                        <View style={s.mq_con}>
                            <MarqueeLabel
                                duration={time}
                                text={props.mqrqueeLabel}
                                textContainerWidth={props.mqrqueeLabel.length * 12}
                                textContainerHeight={14}
                                textStyle={{ fontSize: 13, color: '#fff', }}
                            />
                        </View>
                    </TouchableOpacity>       
                }
                <View style={s.fq_con}>
                    <View style={s.fq_title}>
                        <View style={s.fq_bar}></View>
                        {
                            props.title && 
                            <Text style={s.fq_t0}>{props.title}</Text>
                        }
                        
                        {
                            props.hatchTitle && 
                            <Text style={s.fq_t0}>孵化状态：<Text style={{...s.fq_t0, color: '#dcb125'}}>{props.hatchTitle}</Text></Text>
                        }
                    </View>
                    <ImageBackground style={s.fq_bg} resizeMode='stretch' source={require('../assets/img/fq_main_bg.png')}>
                        <Text style={s.fq_main_t1}>预期日化率（%）</Text>
                        <Text style={s.fq_main_t2}>{props.percent && props.percent}</Text>
                        <View style={s.fq_main_v1}>
                            <Text style={s.fq_main_t3}>孵化期</Text>
                            <Text style={s.fq_main_t3}>{props.date && props.date}</Text>
                        </View>
                        <View style={s.fq_main_v1}>
                            <Text style={s.fq_main_t3}>{props.hatchTitle ? '孵化时间' : '开始时间'}</Text>
                            <Text style={s.fq_main_t3}>{props.beginTime && props.beginTime}</Text>
                        </View>
                    </ImageBackground>
                    {
                        !props.hatchTitle &&
                        <TouchableOpacity onPress={() => {props.pressFn && props.pressFn()}}>
                            <ImageBackground style={s.fq_btnbg} resizeMode='stretch' source={require('../assets/img/btn.png')}>
                                <Text style={s.fq_main_t4}>立即孵化</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    }
                    {
                        props.hatchTitle &&
                        <View>
                            <View style={s.fq_main_v1}>
                                <Text style={s.fq_main_t5}>{props.amount && props.amount}</Text>
                                <Text style={s.fq_main_t5}>{props.hadInterest && props.hadInterest}</Text>
                            </View>
                            <View style={s.fq_main_v1}>
                                <Text style={s.fq_main_t5}>{props.allInterest && props.allInterest}</Text>
                                <Text style={s.fq_main_t5}>{props.hatchEndTime && props.hatchEndTime}</Text>
                            </View>
                        </View>
                    }
                </View>
            </ImageBackground>

            <View style={{height: u.rh(10)}}></View>
        </View>
    )
}
const s = StyleSheet.create({
    bg_con: {
        width: u.WIDTH,
        paddingBottom: 22
    },
    mq_con: {
        backgroundColor: '#62626294',
        marginLeft: 13,
        marginRight: 13,
        overflow: 'hidden'
    },
    fq_con: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    fq_title: {
        height: u.rh(40),
        flexDirection: 'row',
        borderBottomColor: '#ffffff10',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    fq_bar: {
        width: 3,
        height: 18,
        backgroundColor: "#ffffff",
        marginRight: 13
    },
    fq_t0: {
        fontSize: 16,
        color: "#ffffff"
    },
    fq_bg: {
        width: u.rw(350),
        marginTop: 22,
        paddingBottom: u.rh(13)
    },
    fq_main_t1: {
        marginTop: u.rh(22),
        textAlign: 'center',
        fontSize: 15,
        color: "#000000"
    },
    fq_main_t2: {
        textAlign: 'center',
        fontSize: 26,
        color: "#000000"
    },
    fq_main_v1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15
    },
    fq_main_t3: {
        fontSize: 14,
        marginTop: u.rh(12),
        color: "#000000"
    },
    fq_btnbg: {
        width: u.rw(310),
        height: u.rh(43),
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
    },
    fq_main_t4: {
        fontSize: 18,
        color: "#121010",
        textAlign: 'center'
    },
    fq_main_t5: {
        fontSize: 14,
        color: "#ffffff",
        marginTop: u.rh(12)
    }
})