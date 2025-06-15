import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FONTS } from '../utils/fonts';
import { rw } from '../utils/responsiveUtil';
import MinusIcon from '../assets/svgs/MinusIcon';
import PlusIcon from '../assets/svgs/PlusIcon';

const CartItem = ({ item, onQuantityChange, onRemove }) => (
    <View style={styles.cartItem}>
        <Text style={styles.quantity}>{item.quantity} pc</Text>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}/pc</Text>
        </View>
        <View style={styles.quantityControls}>
            <TouchableOpacity
                onPress={() => onQuantityChange(item.id, item.quantity - 1)}
                style={styles.quantityButton}
            >
                <MinusIcon width={rw(20)} height={rw(20)} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onQuantityChange(item.id, item.quantity + 1)}
                style={styles.quantityButton}
            >
                <PlusIcon width={rw(20)} height={rw(20)} />
            </TouchableOpacity>
        </View>
    </View>
);

export default CartItem

const styles = StyleSheet.create({
    cartItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0',
        },
        quantity: {
            fontSize: 16,
            fontWeight: '500',
            color: '#000',
            fontFamily: FONTS.medium,
            marginRight: 16,
            minWidth: 40,
        },
        itemImage: {
            width: 50,
            height: 50,
            borderRadius: 8,
            backgroundColor: '#F5F5F5',
            marginRight: 16,
        },
        itemDetails: {
            flex: 1,
        },
        itemName: {
            fontSize: 16,
            fontWeight: '500',
            color: '#000',
            fontFamily: FONTS.medium,
            marginBottom: 4,
        },
        itemPrice: {
            fontSize: 14,
            color: '#666',
            fontFamily: FONTS.regular,
        },
        quantityControls: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        quantityButton: {
            padding: 8,
        },
})