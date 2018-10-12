

import * as pages from './src/pages'
import { createStackNavigator } from 'react-navigation'


const App = createStackNavigator({
  // 放第一的页面会成为进app后的首面
  AppTabContent: {screen: pages.AppTabContent},
  Home: {screen: pages.Home},
  SecondTab: {screen: pages.SecondTab},
  Second: {screen: pages.Second},
});

export default App