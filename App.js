

import * as pages from './src/pages'
import { createStackNavigator } from 'react-navigation'

/**
 * 目前得到的结论就是，createStackNavigator为顶级路由，里面可以放普通页面，也可以放特殊结构的容器页面，如AppTabContent
 * 这类与createStackNavigator同样可以创建的顶级路由页面的容器页面，可以通过这类特殊容器实现所需的页面导航跟底部以及其他特殊需求
 */
const App = createStackNavigator({
  // 放第一的页面会成为进app后的首面
  AppTabContent: {screen: pages.AppTabContent},
  Home: {screen: pages.Home},
  SecondTab: {screen: pages.SecondTab}, // 在AppTabContent里面存在的页面不用此处不用再定义，如需特殊需要请替换名称
  Second: {screen: pages.Second},
});

export default App