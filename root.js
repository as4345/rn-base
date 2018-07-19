import React from 'react'
import {
    Navigator
} from 'react-native';
import App from './app.js'

class Root extends React.Component {
    render() {
        return (
            //在原来<App />的基础上添加Navigator
            <Navigator
                initialRoute={{ component: App }}
                configureScene={(route) => {
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator} />
                }} />
        );
    }
}
export default Root;
