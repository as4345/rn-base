import { observable, action, computed, autorun } from 'mobx'
import { AsyncStorage } from 'react-native'
class store {
	// 用户信息
	@observable userInfo = {}
	@action async setUserInfo(data) {
		this.userInfo = data
        await AsyncStorage.setItem('userInfo', JSON.stringify(data))
	}

	// 计时测试
	@observable stayHomeTime = 0
	@action setStayHomeTime(data) {
		this.stayHomeTime = data
	}
}
const nStore = new store()
// 初始app获取本地用户信息存进store
const getLocUserInfo = async () => {
	const res = await AsyncStorage.getItem('userInfo')
	nStore.setUserInfo(res ? JSON.parse(res) : {})
}
getLocUserInfo()
export default nStore