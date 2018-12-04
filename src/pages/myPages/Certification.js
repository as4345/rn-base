import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Picker ,ScrollView } from 'react-native'
import { Button, Toast ,InputItem,List,Switch} from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'
import Rinput from '../../components/Rinput'
import CountDownBtn from '../../components/CountDownBtn'
import Positive from '../../assets/img/authentication_1.png'
import Back from '../../assets/img/authentication_2.png'
import Hand from '../../assets/img/authentication_3.png' 
import * as u from '../../utils'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-crop-picker';
import { observer } from "mobx-react"
@observer
export default class Certification extends Component {
    state={
        switch : true,
        items:[
            {title:'请上传您的身份证人像面', img:Positive, typeStr:'head', imgKey:'', imgPath:''},
            {title:'请上传您的身份证反面', img:Back, typeStr:'side', imgKey:'',imgPath:''},
            {title:'请上传您的手持证件', img:Hand, typeStr:'hand', imgKey:'',imgPath:''},
        ],
        cardlist:[
            {
                text:'身份证',
                value:'1'
            },
            {
                text:'港澳台',
                value:'2'
            },
            {
                text:'护照',
                value:'3'
            }
        ],
        cardType:'1',
        idcard:'',
        nickname:'',
        disabled : false,
    }
    async upDataImage(item){ 
        ImagePicker.openPicker({
            width: 380,
            height: 230,
            cropping: true,
            includeBase64 : true,
            compressImageQuality : 0.32,
          }).then( async (image) => {
            this.upImage(image,item)
        });
    }
    async upImage (image,item){
        Toast.loading('上传中',20);
        let data = await u.post(u.config.baseUrl+'/common/v1/user/uploadImge',{
            imageType : item.typeStr,
            base64_image : 'data:image/png;base64,'+image.data,
        })
        Toast.hide()
        if(data.code != 0){
            Toast.fail(data.msg, 2)
            return
        }
        Toast.success('上传成功', 2);
        let itemArr = [...this.state.items]
        for(let i = 0 ; i < this.state.items.length; i++){
                if(itemArr[i].typeStr == item.typeStr){
                    itemArr[i].imgKey = data.data.key
                    itemArr[i].imgPath = data.data.imgUrl
                    break;
                }
                
        }
        this.setState({items:itemArr})
    }

    getUserInfo = async () => {
        Toast.loading('加载中', 20)
        const res = await u.post(u.config.baseUrl + '/common/v1.user/getUserInfo')
        Toast.hide()
        if (res.code != 0) {
            Toast.fail(res.msg, 2)
            return 
        }
        u.store.setUserInfo(res.data)
        Actions.pop()
    }
    async refor(){
        const _this = this.state;
        if(!_this.nickname){ Toast.fail('请输入姓名',2);return }
        if(!_this.idcard){ Toast.fail('请输入证件号码',2);return }
        if(!_this.items[0].imgKey){ Toast.fail('请上传正面照！',2);return }
        if(!_this.items[1].imgKey){ Toast.fail('请上传反面照！',2);return }
        if(!_this.items[2].imgKey){ Toast.fail('请上传手持照！',2);return }
        Toast.loading('正在提交',20)
        let data = await u.post(u.config.baseUrl+'/common/v1.user/realSubmit',{
            idcard : _this.idcard,
            cardtype : _this.cardType,
            nickname : _this.nickname,
            headphoto : _this.items[0].imgKey,
            sidephoto : _this.items[1].imgKey,
            handphoto : _this.items[2].imgKey,
        })
        Toast.hide();
        if(data.code!=0){
            Toast.fail(data.msg,2)
            return
        }
        Toast.success('提交成功',2);
        this.getUserInfo()
       

    }
    componentDidMount(){ // 
        this.setState({
            nickname : u.store.userInfo.nickname,
            idcard : u.store.userInfo.idcard,
        })
        if(['1','2'].includes(u.store.userInfo.is_exam)){
            let items = [...this.state.items];
            items[0].imgPath = u.store.userInfo.headphoto;
            items[1].imgPath = u.store.userInfo.sidephoto;
            items[2].imgPath = u.store.userInfo.handphoto;
            this.setState({items:items,disabled:true})
        }else{
            this.setState({disabled:false})
        }
    }
    render() {
        return (
            <ScrollView>
            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <List style={[styles.FormLayer]}>
                        <Rinput   
                            label={'证件类型'}   
                            content={<Picker
                                        selectedValue={this.state.cardType}
                                        style={{ height: u.rh(45),marginLeft:u.rw(10)}}
                                        onValueChange={(itemValue, itemIndex) => this.setState({cardType: itemValue})}
                                        enabled={this.state.disabled ? false : true}>
                                        {
                                            this.state.cardlist.map((item,index)=>{
                                                return <Picker.Item label={item.text} value={item.value} key={index} />
                                            })
                                        }
                                        
                                    </Picker>}>
                        </Rinput> 
                        <Rinput label={'真实姓名'} placeholder={'请输入真实姓名'}  value={this.state.nickname} onChange={(val)=>{ this.setState({nickname : val}) }} editable={this.state.disabled} ></Rinput>
                        <Rinput label={'证件号码'} placeholder={'请输入证件号码'} value={this.state.idcard} onChange={(val)=>{ this.setState({idcard : val}) }} editable={this.state.disabled} ></Rinput>
                    </List>
                    {
                        this.state.items.map((item,index)=>{
                            return (
                                <View style={[styles.upDataLayer]} key={index}> 
                                    <Text style={[styles.upDataTitle]}>{item.title}</Text>
                                    <View style={[styles.upDataImageLayer]}>
                                        <Image source={item.imgPath ? {uri:item.imgPath} : item.img} style={[styles.upDataImage]} />
                                    </View>
                                    {
                                        !this.state.disabled && (
                                            <TouchableOpacity onPress={()=>{ this.upDataImage(item) }}>
                                                <Text style={[styles.upDataBtn]}>上传照片</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                    
                                </View>  
                            )
                        })
                    }
                    {
                        !this.state.disabled &&  <Button  onClick={()=>{ this.refor() }} activeStyle={{opacity:0.2,backgroundColor:'#fff'}} style={[styles.button]}>提交</Button>  
                    }          
                    
                    <View style={styles.tipLayer}>
                        <Text style={[styles.tipText]}>注：</Text>   
                        <Text style={[styles.tipText]}>签署阅读说明则表示:我已阅读并同意用户协议</Text>
                        <Text style={[styles.tipText]}>实名认证将作为实名依据！一经绑定不可修改（一个 证件只能绑定一个节点）</Text>
                    </View>
                 
                </View>
            </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    FormLayer:{
        width:u.WIDTH,
        marginTop:u.rh(10),
        backgroundColor: '#fff',
        paddingLeft:u.rw(13),
        paddingRight:u.rw(13),
    },
    itemLayer:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#E5E5E5',
        borderBottomWidth:1,
    },
    button:{
        width:u.rw(300),
        backgroundColor:'#DCB125',
        borderRadius:u.rw(20),
        marginTop:u.rh(20),
    },
    tipLayer:{
        marginTop:u.rh(20),
        paddingLeft:u.rw(13),
        paddingRight:u.rw(13),
        marginBottom:u.rh(20),
    },
    tipText:{
        color:'#E60012',
        fontSize: 13,
        lineHeight : u.rh(23),
    },
    upDataLayer:{
        width:u.WIDTH,
        paddingTop: u.rh(32),
        paddingBottom: u.rh(15),
        alignItems: 'center',
        backgroundColor:'#fff',
        marginTop: u.rh(10),
    },
    upDataImageLayer:{
        width:u.rw(280),
        height:u.rw(182),
        marginTop:u.rh(20),
        marginBottom:u.rh(20),
        alignItems:'center',
        justifyContent: 'center',
        borderWidth:u.rw(1),
        borderColor:'#C9C9C9',
    },
    upDataTitle:{
        color:'#333',
        fontSize:15,
    },
    upDataImage:{
        width:u.rw(250),
        height:u.rw(160),
    },
    upDataBtn:{
        width:u.rw(100),
        height:u.rw(25),
        lineHeight:u.rw(25),
        textAlign: 'center',
        borderColor:'#DCB125',
        borderWidth:1,
        borderRadius:u.rw(5),
        color:'#333333',
        fontSize:12,
    }
})

