import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import BackIcon from '../assets/svgs/BackIcon'
import CartIcon from '../assets/svgs/CartIcon'
import ShareIcon from '../assets/svgs/ShareIcon' 
import { rw } from '../utils/responsiveUtil'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FONTS } from '../utils/fonts'

const CommonHeader = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const cartItems = useSelector(state => state.cart.items);
    const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const isCartScreen = route.name === 'CartScreen';
    const isOrderTrackingScreen = route.name === 'OrderTrackingScreen';

    const handleBackPress = () => {
        navigation.goBack();
    }
    
    const handleCartPress = () => {
        navigation.navigate('CartScreen');
    }

    const handleEdit = () => {
        console.log('Edit cart pressed');
        // Add edit functionality here
    }

    const handleSharePress = () => {
        console.log('Share pressed');
        // Add share functionality here
    }

    const handleHelpPress = () => {
        console.log('Help pressed');
        // Add help functionality here
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBackPress}>
                <BackIcon size={rw(24)} />
            </TouchableOpacity>

            {isCartScreen ? (
                <View style={styles.titleContainer}>
                    <Text style={styles.headerTitle}>Your order</Text>
                    <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            ) : isOrderTrackingScreen ? (
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={handleSharePress} style={styles.iconButton}>
                        <ShareIcon size={rw(24)} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleHelpPress} style={styles.helpButton}>
                        <Text style={styles.helpText}>Help</Text>
                    </TouchableOpacity>
                </View>
            ) : (
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
            )}
        </View>
    )
}

export default CommonHeader

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: rw(56),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: rw(16),
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: rw(16),
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    headerTitle: {
        fontSize: rw(18),
        fontWeight: '600',
        fontFamily: FONTS.medium,
        color: '#000',
    },
    editButton: {
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    editText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
        fontFamily: FONTS.medium,
    },
    iconButton: {
        marginLeft: rw(16),
        padding: rw(8),
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
    },
    helpButton: {
        marginLeft: rw(16),
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    helpText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
        fontFamily: FONTS.medium,
    },
})