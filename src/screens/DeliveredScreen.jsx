import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CommonHeader } from '../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { rw } from '../utils/responsiveUtil'
import { FONTS } from '../utils/fonts'
import { useNavigation } from '@react-navigation/native'

const DeliveredScreen = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <CommonHeader />
            <View style={{ paddingHorizontal: rw(16), marginTop: rw(10) }}>
                <Text style={{ fontSize: rw(24), fontWeight: '500', color: 'black' }}>Enjoy your order</Text>
                <Text style={{ marginTop: rw(26), fontSize: rw(16), fontFamily: FONTS.regular, fontWeight: '400', color: 'black' }}>Jonathan and Subway (Warriors Arena Road)
                    worked their magic for you. Take a minute to
                    rate, tip, and say thanks.</Text>

            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: rw(205), height: rw(210), alignSelf: 'center', marginTop: rw(94) }}>
                <Image source={require('../assets/images/deliveryBag.png')} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '90%', alignSelf: 'center', paddingVertical: rw(14), backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', marginTop: rw(140), borderRadius: rw(8) }}>
                <Text style={{ fontSize: rw(16), fontFamily: FONTS.medium, fontWeight: '500', color: 'white' }}>Close</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default DeliveredScreen

const styles = StyleSheet.create({})