import React, { Component } from 'react'
import { View, Text, ImageBackground, Image,StyleSheet,TouchableOpacity,KeyboardAvoidingView  } from 'react-native'
import { Button, Toast ,InputItem,List} from 'antd-mobile-rn'
import { I18n } from '../language/I18n'

import * as u from '../utils'
/**
 *
 * @export
 * @param {string} type *类型
 * @param {string} label *标题
 * @param {comments} RightItem *右边展示的组件
 * @param {comments} content *中间的组件 默认input
 * @param {string} value *input值
 * @param {string} placeholder *input提示
 * @param {Boolean} editable * 是否可编辑
 * @param {function} onBlur 
 * @param {function} onChange 
 * @param {function} onFocus 
 * @returns {number}
 */
export default class Rinput extends Component {
    state={
      
    }
    RightItemFn(){
        return this.props.RightItem
    }
    contentFn(){
        return this.props.content
    }
    render() {
        let { type,onBlur,onChange,onFocus,label,RightItem ,placeholder,editable,value,content} = this.props
        return (
            <View  style={[styles.itemLayer]}>
                <View>
                    <Text style={{color:'#353535',fontSize:14,width:u.rw(90)}}>{label}</Text>
                </View>
                <View style={{flex:1,}}>
                    {
                        !content && (<InputItem 
                                        onBlur={()=>{ onBlur && onBlur() }}  
                                        // maxLength={maxLength?maxLength:''} 
                                        onChange={(val)=>{ onChange &&  onChange(val)}}  
                                        placeholder={ placeholder } 
                                        editable={editable ? false : true}
                                        type={ type ? type : ''}
                                        value={value}
                                        onFocus={()=>{ onFocus && onFocus()}}>
                                        </InputItem>)
                    }
                    {
                        content && this.contentFn()
                    }
                </View>
                <View>
                   { RightItem &&  this.RightItemFn() }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    FormLayer:{
        marginTop:u.rh(10),
        backgroundColor: '#fff',
    },
    itemLayer:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#E5E5E5',
        borderBottomWidth:1,
    }
})

