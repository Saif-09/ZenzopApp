import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Homepage')
        }, 3000)
    }, [])
    return (
        <View style={{flex:1, backgroundColor:'blue'}}>
            <Text>SplashScreen</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})