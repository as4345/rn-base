

import * as pages from './src/pages'
import { createStackNavigator } from 'react-navigation'


const App = createStackNavigator({
  AppTabContent: {screen: pages.AppTabContent},
  Home: {screen: pages.Home},
  SecondTab: {screen: pages.SecondTab},
  Second: {screen: pages.Second},
});

export default App