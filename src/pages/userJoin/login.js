import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native'
import { Button, Toast } from 'antd-mobile-rn'
import { I18n } from '../../language/I18n'

import * as u from '../../utils'

export default class login extends Component {
    render() {
        return (
            <View>
                <Text>{I18n.t('homePage')}</Text>
                <Text>{JSON.stringify(u)}</Text>
                <Button onClick={()=>{Toast.loading('加载中')}}>toast一下</Button>
            </View>
        )
    }
}

