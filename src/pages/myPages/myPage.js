import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity } from 'react-native'
import { Button, Toast } from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'

import * as u from '../../utils'

export default class myPage extends Component {
    state={
      
    }
    render() {
        return (
            <View>
                <ImageBackground source={require('../../assets/img/mybg.png')} style={{width:u.WIDTH,height:u.rh(250)}}>
                    <View style={[styles.topBar]}>
                        <Image source={require('../../assets/img/indexMoney.png')} style={{width:u.rw(55),height:u.rw(55),marginTop:u.rh(55)}}></Image>
                        <Text style={{color:'#fff',marginTop:u.rh(20)}}>136565669@qq.com</Text>
                        <Text style={{color:'#fff',marginTop:u.rh(10)}}>邀请码：H1K18</Text>
                        <View style={[styles.assetsLayer]}>
                            <View style={{flex:1, justifyContent:'center',borderRightColor:'#BFBFBF',borderRightWidth:1}}>
                                <View style={[styles.assetsTextBar]}><Text style={[styles.iconfont]}>&#xe670;</Text><Text style={[styles.assetsText]}>总资产</Text></View>
                                <Text style={styles.assetsNum}>0</Text>
                            </View>
                            <View style={{flex:1, justifyContent:'center',borderRightColor:'#BFBFBF',borderRightWidth:1}}>
                                <View style={[styles.assetsTextBar]}><Text style={[styles.iconfont]}>&#xe636;</Text><Text style={[styles.assetsText]}>区域资产</Text></View>
                                <Text style={styles.assetsNum}>0</Text>
                            </View>
                            <View style={{flex:1, justifyContent:'center'}}>
                                <View style={[styles.assetsTextBar]}><Text style={[styles.iconfont]}>&#xe604;</Text><Text style={[styles.assetsText]}>孵化资产</Text></View>
                                <Text style={styles.assetsNum}>0</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',backgroundColor:'#fff',width:u.WIDTH,marginTop:u.rh(10),paddingBottom:u.rh(10),paddingTop:u.rh(10)}}>
                        <TouchableOpacity style={{flex:1}}>
                            <Text style={{color:'#DCB125',fontSize:14,textAlign:'center'}}>存入资产</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}}>
                            <Text style={{color:'#DCB125',fontSize:14,textAlign:'center'}}>提取资产</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.itemLayer,{marginTop:u.rh(15)}]}>
                        <TouchableOpacity>
                            <View style={[styles.item]}>
                                <Text style={[styles.iconfont]}>&#xe657;</Text>
                                <Text style={styles.itemText}>推荐好友</Text>
                                <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.item]}>
                                <Text style={[styles.iconfont]}>&#xe657;</Text>
                                <Text style={styles.itemText}>推荐好友</Text>
                                <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.item]}>
                                <Text style={[styles.iconfont]}>&#xe657;</Text>
                                <Text style={styles.itemText}>推荐好友</Text>
                                <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.item]}>
                                <Text style={[styles.iconfont]}>&#xe657;</Text>
                                <Text style={styles.itemText}>推荐好友</Text>
                                <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.item]}>
                                <Text style={[styles.iconfont]}>&#xe657;</Text>
                                <Text style={styles.itemText}>推荐好友</Text>
                                <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.itemLayer,{marginTop:u.rh(10)}]}>
                        <TouchableOpacity>
                            <View style={[styles.item]}>
                                <Text style={[styles.iconfont]}>&#xe657;</Text>
                                <Text style={styles.itemText}>推荐好友</Text>
                                <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.item]}>
                                <Text style={[styles.iconfont]}>&#xe657;</Text>
                                <Text style={styles.itemText}>推荐好友</Text>
                                <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.item]}>
                                <Text style={[styles.iconfont]}>&#xe657;</Text>
                                <Text style={styles.itemText}>推荐好友</Text>
                                <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    topBar:{
        alignItems:'center',
    },
    assetsLayer:{
        width:u.rw(350),
        flexDirection:'row',
        backgroundColor:'#fff',
        marginTop:u.rh(20),
        paddingTop:u.rh(20),
        paddingBottom:u.rh(15),
    },
    iconfont:{
        fontFamily:'iconfont',
        fontSize:18,
        color:'#DCB125',
    },
    assetsTextBar:{
        flexDirection:'row',
        justifyContent:'center',
    },
    assetsText:{
        color:'#333333',
        fontSize:14,
        marginLeft:u.rw(8)
    },
    assetsNum:{
        color:'#999',
        fontSize:12,
        textAlign:'center',
        marginTop:u.rh(11),
    },
    itemLayer:{
        backgroundColor:'#fff',
        paddingLeft:u.rw(13),
        paddingRight:u.rw(13),
    },
    item:{
        flexDirection:'row',
        paddingBottom:u.rh(8),
        paddingTop:u.rh(8),
        borderBottomColor:'#E5E5E5',
        borderBottomWidth:1,
        alignItems:'center',
    },
    itemText:{
        color:'#666666',
        flex:1,
        marginLeft:u.rw(21),
    }
})

