import React, { Component } from 'react';
import { Scene, Router, ActionConst,Actions } from 'react-native-router-flux'
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
import BindPhone from './pages/myPages/BindPhone'
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
                    type={ActionConst.RESET}
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
                    type={ActionConst.RESET}
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
                    type={ActionConst.RESET}
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
                    type={ActionConst.RESET}
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
                    type={ActionConst.RESET}
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
                    type={ActionConst.RESET}
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
                    type={ActionConst.RESET}
                    back={true}
                    duration={0}
                    title="修改登录密码"
                    initial
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_CHANGETRANSACTIONPASSWORD'}
                    component={ChangeTransactionPassword}
                    type={ActionConst.RESET}
                    back={true}
                    duration={0}
                    title="修改交易密码"
                    initial
                    titleStyle={{color:'#fff'}}
                    navigationBarStyle={{backgroundColor: '#0C0B0B'}}
                    navTransparent ={false}
                    navBarButtonColor='#fff'
                />
                <Scene
                    key={'SCENE_BINDPHONE'}
                    component={BindPhone}
                    type={ActionConst.RESET}
                    back={true}
                    duration={0}
                    title="绑定手机"
                    initial
                    title="修改密码"
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
