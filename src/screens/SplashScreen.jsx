import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { rw } from '../utils/responsiveUtil'
import { FONTS } from '../utils/fonts'

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Homepage')
        }, 3000)
    }, [])
    return (
        <View style={{flex:1, backgroundColor:'#5D1ABA', alignItems:'center', justifyContent:'center',}}>
            <Text style={{fontSize:rw(52), fontFamily:FONTS.bold, color:'white', fontStyle:'italic', fontWeight:'800'}}>Zenzop</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})