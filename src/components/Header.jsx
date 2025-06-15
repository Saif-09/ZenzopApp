import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { rw } from '../utils/responsiveUtil'
import ProfileIcon from '../assets/svgs/ProfileIcon'
import CartIcon from '../assets/svgs/CartIcon'
import { FONTS } from '../utils/fonts'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
    const navigation = useNavigation();
    const cartItems = useSelector(state => state.cart.items);
    const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleProfilePress = () => {
        console.log('Profile icon pressed');
        // Add profile navigation logic here if needed
    };

    const handleCartPress = () => {
        navigation.navigate('CartScreen');
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Zenzop</Text>
            </View>
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={handleProfilePress}>
                    <ProfileIcon size={rw(24)} />
                </TouchableOpacity>
                <View style={styles.cartContainer}>
                    <TouchableOpacity onPress={handleCartPress}>
                        <CartIcon size={rw(24)} />
                        {cartItemCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cartItemCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: rw(56),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: rw(16),
    },
    title: {
        fontSize: rw(24),
        fontFamily: FONTS.bold,
        color: '#5D1ABA',
        fontWeight: '600',
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: rw(24),
    },
    cartContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        right: -8,
        top: -8,
        backgroundColor: '#E53E3E',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: FONTS.medium,
    },
})