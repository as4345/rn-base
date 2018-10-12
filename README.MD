RN 基础架子

目前已集成：
底部导航 createBottomTabNavigator，
请求方法 axios


window下安装环境及模拟器调试

环境：
1，按照中文官网安装好 jdk，android studio以，Genymotion及对应的各种包，别漏

2，正常来讲你会开不了模拟器，需要打开bios的某个设置，自行百度

调试：
1，模拟器里面按出调试界面（我这里是按F1），点 remote debugger

2，这里报红，点开node终端看看报什么错，如果是关于打不开chrome的错就把chrome添加进环境变量，然后cmd使用start chrome看看能不打开chrome

3，可以打开后发现调试连不进去，将浏览器自动打开的调试地址更改为http://localhost:8081/debugger-ui/即可
