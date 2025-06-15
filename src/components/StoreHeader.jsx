import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SafewayIcon from '../assets/svgs/SafewayIcon';
import { FONTS } from '../utils/fonts';
import { rw } from '../utils/responsiveUtil';

const StoreHeader = ({ storeName, storePrice, onStorePress }) => (
    <TouchableOpacity style={styles.storeHeader} onPress={onStorePress}>
        <View style={styles.storeLogoContainer}>
            <View style={styles.storeLogo}>
                <SafewayIcon />
            </View>
        </View>
        <View style={styles.storeInfo}>
            <Text style={styles.storeName}>{storeName}</Text>
        </View>
        <Text style={styles.storePrice}>${storePrice.toFixed(2)}</Text>
    </TouchableOpacity>
);

export default StoreHeader

const styles = StyleSheet.create({
    storeHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 16,
            backgroundColor: '#F5F5F5',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#E0E0E0',
        },
        storeLogoContainer: {
            marginRight: 12,
        },
        storeLogo: {
            width: 50,
            height: 40,
            backgroundColor: '#E53E3E',
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
        },
        storeLogoText: {
            fontSize: 10,
            fontWeight: 'bold',
            color: '#FFFFFF',
            fontFamily: FONTS.medium,
        },
        storeInfo: {
            flex: 1,
        },
        storeName: {
            fontSize: rw(16),
            fontWeight: '600',
            fontFamily: FONTS.medium,
            color: '#000',
        },
        storePrice: {
            fontSize: rw(16),
            fontWeight: '600',
            fontFamily: FONTS.medium,
            color: '#000',
        },
})