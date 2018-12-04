import React, { Component } from 'react';
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import Home from './pages/Home'
import Test_Home from './pages/Test_Home'
import LangTest from './pages/LangTest'
import MyPage from './pages/myPages/myPage'
import Register from './pages/userJoin/register'
import Login from './pages/Login'
import ForgotPassword from './pages/userJoin/ForgotPassword'
import TotalAssets from './pages/myPages/TotalAssets'
import AddWallet from './pages/myPages/AddWallet'
import ExtractWallet from './pages/myPages/ExtractWallet'
import FriendsRotation from './pages/myPages/FriendsRotation'
import ChangePassword from './pages/myPages/ChangePassword'
import ChangeTransactionPassword from './pages/myPages/ChangeTransactionPassword'
import SecuritySetting from './pages/myPages/SecuritySetting'
import Certification from './pages/myPages/Certification'
import WalletAdmin from './pages/myPages/WalletAdmin'
import BindPhone from './pages/myPages/BindPhone'
import ChargeCoin from './pages/myPages/ChargeCoin'
import DealRecord from './pages/DealRecord'
import InviteRecord from './pages/InviteRecord'
import Share from './pages/myPages/Share'
import BulletinBoard from './pages/BulletinBoard'
import setTransactionPassword from './pages/myPages/setTransactionPassword';
import Proposal from './pages/myPages/Proposal'
import DemoTest from './pages/DemoTest'
import { Button, Toast } from 'antd-mobile-rn'
import * as u from './utils'

export default class Root extends Component {
  render() {
    return (
        <Router>
            <Scene key="root">
                <Scene
                    key={'SCENE_LOGIN'}
                    component={Login}
                    type={ActionConst.RESET}
                    duration={0}
                    navTransparent ={true}
                />
                <Scene
                    key={'SCENE_HOME'}
                    component={Home}
                    type={ActionConst.RESET}
                    initial
                    duration={0}
                    navTransparent ={true}
                />
                <Scene
                    key={'SCENE_BULLETINBOARD'}
                    component={BulletinBoard}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="公告详情"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_CHARGECOIN'}
                    component={ChargeCoin}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="充币"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_DEMOTEST'}
                    component={DemoTest}
                    type={ActionConst.RESET}
                    duration={0}
                    navTransparent ={true}
                />
                <Scene
                    key={'SCENE_TESTHOME'}
                    component={Test_Home}
                    type={ActionConst.RESET}
                    duration={0}
                    title="测试首页"
                    titleStyle={{color:'#fff'}}
                    navTransparent ={true}
                    navBarButtonColor='#fff'
                    renderRightButton = {()=>(<Button onClick={Actions['SCENE_LANGTEST']}>语言测试</Button>)}
                />
                <Scene
                    key={'SCENE_MYPAGE'}
                    component={MyPage}
                    type={ActionConst.RESET}
                    duration={0}
                    navTransparent ={true}
                />
                <Scene
                    key={'SCENE_REGISTER'}
                    component={Register}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="欢迎注册"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_FORGOTPASSWORD'}
                    component={ForgotPassword}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="找回密码"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_TOTALASSETS'}
                    component={TotalAssets}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="算力资产"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_ADDWALLET'}
                    component={AddWallet}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="添加钱包"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_EXTRACTWALLET'}
                    component={ExtractWallet}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="提取资产"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_FRIENDSROTATION'}
                    component={FriendsRotation}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="好友互转"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_CHANGEPASSWORD'}
                    component={ChangePassword}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="修改登录密码"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_SETTRANSACTIONPASSWORD'}
                    component={setTransactionPassword}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="设置交易密码"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_CHANGETRANSACTIONPASSWORD'}
                    component={ChangeTransactionPassword}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="修改交易密码"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_BINDPHONE'}
                    component={BindPhone}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="绑定手机"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_PROPOSAL'}
                    component={Proposal}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="反馈建议"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                      key={'SCENE_SECURITY_SETTING'}
                      component={SecuritySetting}
                      type={ActionConst.PUSH}
                      back={true}
                      navBarButtonColor='#fff'
                      duration={0}
                      title="安全设置"
                      titleStyle={{color:'#fff'}}
                      navTransparent ={true}
                      navBarButtonColor='#fff'
                    />
                    <Scene
                      key={'SCENE_SHARE'}
                      component={Share}
                      type={ActionConst.PUSH}
                      back={true}
                      navBarButtonColor='#fff'
                      duration={0}
                      title="邀请好友"
                      titleStyle={{color:'#fff'}}
                      navTransparent ={true}
                      navBarButtonColor='#fff'
                    />
                    <Scene
                   
                    key={'SCENE_INVITERECORD'}
                    component={InviteRecord}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="邀请记录"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_DEALRECORD'}
                    component={DealRecord}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="交易记录"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                     key={'SCENE_WALLETADMIN'}
                     component={WalletAdmin}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="钱包管理"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                    />
                    <Scene
                    key={'SCENE_CERTIFICATION'}
                    component={Certification}
                    type={ActionConst.PUSH}
                    back={true}
                    duration={0}
                    title="实名认证"
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                    />
                    <Scene
                        key={'SCENE_LANGTEST'}
                        component={LangTest}
                        type={ActionConst.RESET}
                        duration={0}
                        title="语言测试"
                        titleStyle={{color:'#fff'}}
                        navTransparent ={true}
                        navBarButtonColor='#fff'
                        renderRightButton = {()=>(<Button onClick={Actions['SCENE_TESTHOME']}>首页</Button>)}
                    />
            </Scene>
        </Router>
    )
  }
}
