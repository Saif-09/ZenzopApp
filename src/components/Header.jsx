import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { rw } from '../utils/responsiveUtil'
import ProfileIcon from '../assets/svgs/ProfileIcon'
import CartIcon from '../assets/svgs/CartIcon'
import { FONTS } from '../utils/fonts'

const Header = () => {
    return (
        <View style={{ width: '100%', height: rw(56), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: rw(16) }}>
            {/* Title */}
            <View>
                <Text style={{ fontSize: rw(24), fontFamily: FONTS.bold, color: '#5D1ABA', fontWeight: '600' }}>Zenzop</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: rw(24) }}>
                <TouchableOpacity onPress={() => console.log('Profile icon pressed')}>
                    <ProfileIcon size={rw(24)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Cart icon pressed')}>
                    <CartIcon size={rw(24)} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})