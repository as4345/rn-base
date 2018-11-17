import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView  } from 'react-native'
import * as u from '../utils'


/**
 *
 * @export
 * @param {string} text *显示文本 
 * @param {function} start *点击事件
 * @param {function} timeOut  *倒数方法  通过ref调用
 * @returns {number}
 */
export default class CountDownBtn extends Component {
    state = {
        state : true,
        num : 60,
        time : null
    }
    timeOut(){
        const _this = this;
        this.setState({
            state : false
        })
        let num = 60
        this.state.time = setInterval(()=>{
            this.setState({
                num : --num
            })
            if( num == 0){
                clearInterval(_this.state.time)
                _this.setState({
                    state : true,
                    num : 60
                })
            }
        },1000)
    }

    componentWillUnmount() {
        clearInterval(this.state.time)
    }
    render() {
        const { text,start } = this.props;
        const _this = this.state;
        return (
            <View>
                {
                    _this.state && (
                        <TouchableOpacity style={styles.Button}
                                underlayColor="#d9d9d9"
                                onPress={()=>{ start() }}>
                            <Text style={styles.Text}>{text}</Text>
                        </TouchableOpacity>
                    )
                }
                {
                    !_this.state && (<Text style={[styles.Text,{width: u.rw(50) }]}>{this.state.num}</Text>)
                }
                
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    Button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text:{
        color:'#DCB125',
        fontSize:12,
        textAlign:'center',
    }
})
