import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { rw } from '../utils/responsiveUtil';
import { FONTS } from '../utils/fonts';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import { StoreHeader , CartItem, LocationSection, MinimumOrderNotice, CommonHeader } from '../components';


const CartScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const storeData = {
        name: 'Safeway',
        logo: 'SAFEWAY'
    };

    const locationData = {
        location: 'San Francisco Bay Area',
        listName: "John's List"
    };

    const orderSettings = {
        minimumAmount: 10.00,
        freeDeliveryAmount: 30.00
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const canCheckout = subtotal >= orderSettings.minimumAmount;

    const handleClose = () => {
        navigation.goBack();
    };

    const handleEdit = () => {
        console.log('Edit cart pressed');
    };

    const handleLocationPress = () => {
        console.log('Location pressed');
    };

    const handleStorePress = () => {
        console.log('Store pressed');
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        dispatch(updateQuantity({ itemId, quantity: newQuantity }));
    };

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleCheckout = () => {
        if (canCheckout) {
            navigation.navigate('OrderTrackingScreen', { cartItems, subtotal });
            console.log('Proceeding to checkout');
        }
    };

    const renderEmptyCart = () => (
        <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <TouchableOpacity
                style={styles.continueShoppingButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader/>

            {cartItems.length === 0 ? renderEmptyCart() : (
                <>
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        <LocationSection
                            location={locationData.location}
                            listName={locationData.listName}
                            onLocationPress={handleLocationPress}
                        />
                        <StoreHeader
                            storeName={storeData.name}
                            storePrice={subtotal}
                            onStorePress={handleStorePress}
                        />
                        <View style={styles.cartItemsContainer}>
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={() => handleRemoveItem(item.id)}
                                />
                            ))}
                        </View>
                        <MinimumOrderNotice
                            currentTotal={subtotal}
                            minimumAmount={orderSettings.minimumAmount}
                            freeDeliveryAmount={orderSettings.freeDeliveryAmount}
                        />
                    </ScrollView>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            style={[
                                styles.checkoutButton,
                                !canCheckout && styles.checkoutButtonDisabled
                            ]}
                            onPress={handleCheckout}
                            disabled={!canCheckout}
                        >
                            <Text style={[
                                styles.checkoutButtonText,
                                !canCheckout && styles.checkoutButtonTextDisabled
                            ]}>
                                Go to Checkout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    closeButton: {
        padding: 8,
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
    scrollView: {
        flex: 1,
    },
    
    cartItemsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    
    noticeContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    minimumOrderRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    minimumOrderText: {
        fontSize: 14,
        color: '#000',
        fontFamily: FONTS.regular,
        marginLeft: 8,
        lineHeight: 20,
    },
    freeDeliveryNotice: {
        backgroundColor: '#F8F8F8',
        padding: 16,
        borderRadius: 8,
    },
    freeDeliveryText: {
        fontSize: 14,
        color: '#666',
        fontFamily: FONTS.regular,
        lineHeight: 20,
        textAlign: 'center',
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        backgroundColor: '#FFFFFF',
    },
    checkoutButton: {
        backgroundColor: '#000000',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutButtonDisabled: {
        backgroundColor: '#CCCCCC',
    },
    checkoutButtonText: {
        fontSize: rw(16),
        fontWeight: '600',
        color: '#FFFFFF',
        fontFamily: FONTS.medium,
    },
    checkoutButtonTextDisabled: {
        color: '#999999',
    },
    emptyCartContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    emptyCartText: {
        fontSize: rw(18),
        fontWeight: '500',
        color: '#666',
        fontFamily: FONTS.medium,
        marginBottom: 24,
    },
    continueShoppingButton: {
        backgroundColor: '#000000',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    continueShoppingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        fontFamily: FONTS.medium,
    },
});