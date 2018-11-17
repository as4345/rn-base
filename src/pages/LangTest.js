import React, { Component } from 'react'
import { observer } from "mobx-react"
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'

import { I18n } from '../language/I18n'
import DeviceInfo from 'react-native-device-info'
import * as u from '../utils'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'

@observer
class LangTest extends Component {

    constructor(props){
        super(props)

        this.state = {
            localeLanguage: null,
        }

    }

    async componentWillMount() {
        this.setState({
            localeLanguage: I18n.locale
        })
    }


    refreshLanguage = async index => {

        switch (index) {
            case 0:
                I18n.locale = 'en'
                break
            case 1:
                I18n.locale = 'zh'
                break
            case 2:
                I18n.locale = DeviceInfo.getDeviceLocale()
                break
            case 3:
                I18n.locale = 'zh-Hant'
                break
        }
        await u.storage.setItem('localLanguage', I18n.locale)
        const localLanguage = await u.storage.getItem('localLanguage')
        console.log(localLanguage)
        this.setState({
            localeLanguage: I18n.locale
        })

    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
            home页的计时器为{u.store.stayHomeTime}
        </Text>
        <Text style={styles.welcome}>
            {I18n.t('english')}
        </Text>
        <Text style={styles.welcome}>
            {I18n.t('chinese')}
        </Text>

          <TouchableOpacity style={styles.buttonMargin} onPress={() => this.refreshLanguage(0)}>
              <Text  style={styles.text}>
                  {I18n.t('changeToEnglish')}
              </Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.buttonMargin} onPress={() => this.refreshLanguage(1)}>
              <Text  style={styles.text}>
                  {I18n.t('changeToChinese')}
              </Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.buttonMargin} onPress={() => this.refreshLanguage(2)}>
              <Text  style={styles.text}>
                  {I18n.t('changeToSystem')}
              </Text>
          </TouchableOpacity>

            <TouchableOpacity style={styles.buttonMargin} onPress={() => this.refreshLanguage(3)}>
                <Text  style={styles.text}>
                    {I18n.t('changeToChineseHants')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonMargin} onPress={Actions['SCENE_HOME']}>
                <Text  style={styles.text}>
                    跳到首页
                </Text>
            </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    buttonMargin: {
        marginVertical: 20,
        backgroundColor: '#FA8072'
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
})

export default LangTest