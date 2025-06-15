import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { rw } from '../utils/responsiveUtil';
import PlusIcon from '../assets/svgs/PlusIcon';
import MinusIcon from '../assets/svgs/MinusIcon';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity } from '../redux/slices/cartSlice';

const ProductItem = ({ item, onAddPress, onItemPress }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleDecreaseQuantity = () => {
        if (quantity > 0) {
            dispatch(updateQuantity({ itemId: item.id, quantity: quantity - 1 }));
        }
    };

    return (
        <TouchableOpacity style={styles.productItem} onPress={() => onItemPress(item)}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.buttonContainer}>
                    {quantity > 0 && (
                        <TouchableOpacity
                            style={[styles.actionButton, styles.minusButton]}
                            onPress={handleDecreaseQuantity}
                        >
                            <MinusIcon />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={[styles.actionButton, styles.plusButton]}
                        onPress={() => onAddPress(item)}
                    >
                        <PlusIcon />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.productInfo}>
                <Text numberOfLines={2} style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.productPackage}>{item.package}</Text>
                {quantity > 0 && (
                    <Text style={styles.quantityText}>Qty: {quantity}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default ProductItem;

const styles = StyleSheet.create({
    productInfo: {
        flex: 1,
        alignItems: 'center',
    },
    productName: {
        fontSize: rw(16),
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: rw(14),
        fontWeight: 'bold',
        color: '#000',
    },
    productPackage: {
        fontSize: rw(14),
        color: '#666',
    },
    productItem: {
        width: rw(144),
        height: rw(220),
        marginRight: rw(12),
        // backgroundColor: '#f3f3f3',
        paddingVertical: rw(8),
    },
    imageContainer: {
        position: 'relative',
        marginBottom: rw(12),
        alignItems: 'center',
    },
    productImage: {
        width: rw(100),
        height: rw(100),
        borderRadius: rw(8),
        backgroundColor: '#f5f5f5',
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: rw(-8),
        width: '100%',
        // backgroundColor:'blue',
        justifyContent: 'space-between',
        paddingHorizontal: rw(2),
    },
    actionButton: {
        borderRadius: rw(12),
        padding: rw(4),
    },
    minusButton: {
        left: rw(2),
        top: rw(5),
        // position: 'absolute',
        backgroundColor: 'white',
        width: rw(32),
        height: rw(32),
        flexBasis:'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: rw(30),
    },
    plusButton: {
        right: rw(2),
    },
    quantityText: {
        fontSize: rw(12),
        color: '#333',
        marginTop: rw(4),
    },
});