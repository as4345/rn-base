/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {name as appName} from './app.json';
import React, { Component } from 'react';
import { AppRegistry, AppState, Alert } from 'react-native';
import codePush from "react-native-code-push" 
import Root from './src/Root';
import * as u from './src/utils'

import applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor'

import initializerDefineProperty from '@babel/runtime/helpers/esm/initializerDefineProperty'

Object.assign(babelHelpers, { applyDecoratedDescriptor, initializerDefineProperty })

export default class App extends Component {
    componentDidMount() {
        AppState.addEventListener("change", (newState) => {
            if (newState === "active") {
                u.hotUpdate()
                // console.log("设备唤醒")
            }
        })
    }
    render() {
        return (
            <Root />
        )
    }
}

AppRegistry.registerComponent(appName, () => App);