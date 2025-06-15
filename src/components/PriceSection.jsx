import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ClockIcon from '../assets/svgs/ClockIcon'
import { FONTS } from '../utils/fonts'
import { rw } from '../utils/responsiveUtil'
import DollarIcon from '../assets/svgs/DollarIcon'

const PriceSection = () => {
    return (
        <View style={{ width: '100%', paddingHorizontal: rw(16), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: rw(20) }}>
            <View style={{ flexDirection: 'row', gap: rw(8), alignItems: 'center' }}>
                <ClockIcon size={rw(24)} />
                <Text style={{ fontSize: rw(16), fontFamily: FONTS.regular, fontWeight: '400', color: 'black' }}>In 60 minutes</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: rw(8), alignItems: 'center' }}>
                <DollarIcon size={rw(20)} />
                <Text style={{ fontSize: rw(16), fontFamily: FONTS.regular, fontWeight: '400', color: 'black' }}>Pricing and Fees</Text>
            </View>

        </View>
    )
}

export default PriceSection

const styles = StyleSheet.create({})