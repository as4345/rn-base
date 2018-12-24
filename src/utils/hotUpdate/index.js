
import codePush from "react-native-code-push" 
import { Alert } from 'react-native'
import {
    Toast,
} from 'antd-mobile-rn'

export default () => {
    codePush.sync(null, status => {
        switch(status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                // console.log("Checking for updates.");
                // Toast.info("检查更新", 2);
                break;
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                // console.log("Downloading package.");
                Toast.loading("正在下载安装更新...", 99);
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                // console.log("Installing update.");
                // Toast.info("正在安装", 2);
                break;
            case codePush.SyncStatus.UP_TO_DATE:
                // console.log("Up-to-date.");
                // Toast.info("目前已是最新版", 2);
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                // console.log("Update installed.");
                // Toast.info("更新成功", 2);
                Toast.hide()
                Alert.alert(
                    '提示',
                    '更新成功，点击确定重启APP!',
                    [
                      {text: '确定', onPress: () => {codePush.restartApp()}},
                    ],
                    { cancelable: false }
                )
                break;
        }
    }) // 更新
}