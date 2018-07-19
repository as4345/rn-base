import { AppRegistry, YellowBox } from 'react-native';
import App from './App';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);   // 解决黄色warning
AppRegistry.registerComponent('rnBase', () => App);
