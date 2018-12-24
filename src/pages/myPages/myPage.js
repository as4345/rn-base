import React, { Component } from 'react'
import { View, ScrollView, Text, ImageBackground, Image,StyleSheet,TouchableOpacity, Linking} from 'react-native'
import { Button, Toast , Modal} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as u from '../../utils'
import grade0 from '../../assets/img/grade-0.png'
import grade1 from '../../assets/img/grade-1.png'
import grade2 from '../../assets/img/grade-2.png'
import { observer } from "mobx-react"
import RefreshView from '../../components/RefreshView'
@observer
class myPage extends Component {
    state={
        totalAssets : 0,
        tem_income : 0,
        product_income : 0,
        grade : 0,
        visible:false,
        gradeImgs: [grade0,grade1,grade2],
    }
    componentDidMount(){
    }
    didMountFn = () => new Promise.all([this.getAssets(), this.getUserStatistics()])
    //item点击事件
    itemActions = async path => {
        switch(path){
        case 'SCENE_SHARE' : 
            Toast.loading('加载中',20)
            let data = await u.post(u.config.baseUrl+'/common/v1.user/getQrcodeUrl')
            Toast.hide()
            if(data.code != 0){
                Toast.fail(data.msg, 2)
                return
            }
            Actions[path]()
            break;
        // case 'SCENE_HATCHRECORD' :
        //     global.changeHomeTab(I18n.t('incubation'))
        //     break;
        case  'SCENE_EXTRACTWALLET' :
            if(u.store.userInfo.is_exam == '1'){
                Toast.fail('实名认证中，请耐心等待！',2)
                return
            }
            if(['0','3'].includes(u.store.userInfo.is_exam)){
                Toast.fail('请先实名认证!',2)
                Actions['SCENE_CERTIFICATION']();
                return
            }
            Actions[path]()
            break;
        case 'out':
            this.setState({ visible:true })
            break;    
        default: Actions[path]()
        }
    }
    getAssets = () => new Promise(async (rl, rj) => {
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/asset/v1.assets/getAssets')
        Toast.hide()
        if(data.code != 0){
            Toast.fail(data.msg, 2)
            rj()
            return
        }
        u.store.assets = data.data
        rl()
    })
    getUserStatistics = () => new Promise(async (rl, rj) => {
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/common/v1.user/getUserStatistics')
        Toast.hide()
        if(data.code != 0){
            Toast.fail(data.msg, 2)
            rj()
            return
        }
        u.store.statistics = data.data
        rl()
    })
    async loginOut(){
        Toast.loading('加载中',20)
        let data = await u.post(u.config.baseUrl+'/common/v1.user/loginOut')
        Toast.hide()
        if (data.code != 0) {
            Toast.fail(data.msg, 2)
            return 
        }
        await u.storage.removeItem('tokenData')
        u.store.setUserInfo({})
        Actions.replace('SCENE_LOGIN')
    }
    render() {
        const { email,inviteCode } = u.store.userInfo
        const _this = this.state
        return (
            
            <RefreshView
                rView={
                    <ScrollView>
                    <View style={{flex:1}}>
                        <ImageBackground source={require('../../assets/img/mybg.png')} style={{width:u.WIDTH,height:u.rw(200),marginBottom:u.rw(35)}}>
                            <View style={[styles.topBar]}>
                                <Image source={require('../../assets/img/indexMoney.png')} style={{width:u.rw(55),height:u.rw(55),marginTop:u.rh(25)}}></Image>
                                <Text style={{color:'#fff',marginTop:u.rh(20)}}>{email || '--'}</Text>
                                <Text style={{color:'#fff',marginTop:u.rh(10)}}>邀请码：{inviteCode}</Text>
                                {
                                    _this.grade != 0 && <Image source={_this.gradeImgs[_this.grade-1]} style={{width:u.rw(79.5),height:u.rw(20.5),marginTop:u.rh(25),position:'absolute',right:u.rw(5),top:u.rw(75)}}></Image>
                                }
                                <View style={[styles.assetsLayer]}>
                                    <View style={{flex:1, justifyContent:'center',borderRightColor:'#BFBFBF',borderRightWidth:1}}>
                                        <View style={[styles.assetsTextBar]}><Text style={[styles.iconfont]}>&#xe670;</Text><Text style={[styles.assetsText]}>总资产</Text></View>
                                        <Text style={styles.assetsNum}>{parseFloat(u.store.assets.totalAssets).toFixed(2)}</Text>
                                    </View>
                                    <View style={{flex:1, justifyContent:'center',borderRightColor:'#BFBFBF',borderRightWidth:1}}>
                                        <View style={[styles.assetsTextBar]}><Text style={[styles.iconfont]}>&#xe636;</Text><Text style={[styles.assetsText]}>团队收益</Text></View>
                                        <Text style={styles.assetsNum}>{parseFloat(u.store.statistics.tem_income).toFixed(2)}</Text>
                                    </View>
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        <View style={[styles.assetsTextBar]}><Text style={[styles.iconfont]}>&#xe604;</Text><Text style={[styles.assetsText]}>孵化收益</Text></View>
                                        <Text style={styles.assetsNum}>{ parseFloat(u.store.statistics.product_income).toFixed(2)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                            <Modal
                            title="点击确定退出！"
                            transparent
                            // onClose={()=>{ this.setState({visible : false}) }}
                            maskClosable
                            visible={this.state.visible}
                            // closable
                            footer={[
                                { text: '取消', onPress: ()=>{ this.setState({visible : false}) } },
                                { text: '确定', onPress: () => { this.loginOut(); } },
                            ]}
                            />
                        </ImageBackground>
                        <View style={{flexDirection:'row',backgroundColor:'#fff',width:u.WIDTH,marginTop:u.rh(5),paddingBottom:u.rh(10),paddingTop:u.rh(10)}}>
                                <TouchableOpacity style={{flex:1}} onPress={() => {this.itemActions('SCENE_CHARGECOIN')}}>
                                    <Text style={{color:'#DCB125',fontSize:14,textAlign:'center'}}>充币</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1}}  onPress={()=>{ this.itemActions('SCENE_EXTRACTWALLET')}}>
                                    <Text style={{color:'#DCB125',fontSize:14,textAlign:'center'}}>提币</Text>
                                </TouchableOpacity>
                        </View>
                        <View style={[styles.itemLayer,{marginTop:u.rh(10)}]}>
                            <TouchableOpacity  onPress={()=>{ this.itemActions('SCENE_SHARE') }}>
                                <View style={[styles.item]}>
                                    <Text style={[styles.iconfont]}>&#xe657;</Text>
                                    <Text style={styles.itemText}>推荐好友</Text>
                                    <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{ this.itemActions('SCENE_TOTALASSETS') }}>
                                <View style={[styles.item]}>
                                    <Text style={[styles.iconfont]}>&#xe609;</Text>
                                    <Text style={styles.itemText}>算力资产</Text>
                                    <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{ this.itemActions('SCENE_FRIENDSROTATION') }}> 
                                <View style={[styles.item]}>
                                    <Text style={[styles.iconfont]}>&#xe68e;</Text>
                                    <Text style={styles.itemText}>好友互转</Text>
                                    <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{ this.itemActions('SCENE_DEALRECORD') }}>
                                <View style={[styles.item]}>
                                    <Text style={[styles.iconfont]}>&#xe63b;</Text>
                                    <Text style={styles.itemText}>交易记录</Text>
                                    <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                        <View style={[styles.itemLayer,{marginTop:u.rh(10)}]}>
                            <TouchableOpacity onPress={()=>{ this.itemActions('SCENE_WALLETADMIN') }}>
                                <View style={[styles.item]}>
                                    <Text style={[styles.iconfont]}>&#xe657;</Text>
                                    <Text style={styles.itemText}>钱包管理</Text>
                                    <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{ this.itemActions('SCENE_SECURITY_SETTING') }}>
                                <View style={[styles.item]}>
                                    <Text style={[styles.iconfont]}>&#xe625;</Text>
                                    <Text style={styles.itemText}>安全设置</Text>
                                    <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{ Linking.openURL(u.config.apkUrl)}}>
                                <View style={[styles.item]}>
                                    <Text style={[styles.iconfont]}>&#xe600;</Text>
                                    <Text style={styles.itemText}>下载最新版app</Text>
                                    <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{ this.itemActions('SCENE_PROPOSAL') }}>
                                <View style={[styles.item]}>
                                    <Text style={[styles.iconfont]}>&#xe682;</Text>
                                    <Text style={styles.itemText}>反馈建议</Text>
                                    <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>{ this.itemActions('out') }}>
                                <View style={[styles.item]}>
                                    <Text style={[styles.iconfont]}>&#xe65f;</Text>
                                    <Text style={styles.itemText}>安全退出</Text>
                                    <Text style={[styles.iconfont,{transform:[{rotateY:'180deg'}],color:'#808080',fontSize:11}]}>&#xe602;</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </ScrollView>
                }
                freshFn={this.didMountFn}
            />
            
        )
    }
}
const styles = StyleSheet.create({
    topBar:{
        alignItems:'center',
        position: 'relative',
    },
    assetsLayer:{
        width:u.rw(350),
        flexDirection:'row',
        backgroundColor:'#fff',
        marginTop:u.rh(15),
        paddingTop:u.rh(15),
        paddingBottom:u.rh(10),
        elevation:5,
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
        paddingBottom:u.rh(12),
        paddingTop:u.rh(12),
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

export default myPage