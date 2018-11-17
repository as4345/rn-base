/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {name as appName} from './app.json';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Root from './src/Root';

import applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor'

import initializerDefineProperty from '@babel/runtime/helpers/esm/initializerDefineProperty'

Object.assign(babelHelpers, { applyDecoratedDescriptor, initializerDefineProperty })

export default class App extends Component {
    render() {
        return (
            <Root />
        );
    }
}

AppRegistry.registerComponent(appName, () => App);