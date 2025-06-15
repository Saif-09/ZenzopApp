import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import Homepage from '../screens/Homepage';
const Stack = createStackNavigator();


const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
            />
            <Stack.Screen
                name="Homepage"
                component={Homepage}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})