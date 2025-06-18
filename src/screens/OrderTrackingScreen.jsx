import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { CommonHeader, ProgressBar, DeliveryDetails, ShareSection, InviteFriends } from '../components';
import CookingIllustration from '../assets/svgs/CookingIllustration';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import CallIcon from '../assets/svgs/CallIcon';
import { rw } from '../utils/responsiveUtil';
import { FONTS } from '../utils/fonts';
import TipIcon from '../assets/svgs/TipIcon';

const { width } = Dimensions.get('window');

const CART_STORAGE_KEY = 'cartItems';
const ORDER_STORAGE_KEY = 'orderData';
const DELIVERY_TIMER_KEY = 'deliveryTimer';

const OrderTrackingScreen = () => {
    const route = useRoute();
    const naviation = useNavigation()
    const { cartItems: routeCartItems = [], subtotal: routeSubtotal = 0 } = route.params || {};
    const [cartItems, setCartItems] = useState(routeCartItems);
    const [subtotal, setSubtotal] = useState(routeSubtotal);
    const [trackingState, setTrackingState] = useState('preparing');
    const [arrivalTime, setArrivalTime] = useState('');
    const [latestArrivalTime, setLatestArrivalTime] = useState('');
    const [remainingSeconds, setRemainingSeconds] = useState(600); // 10 minutes in seconds
    const timerRef = useRef(null);

    // Format time for arrival display
    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    // Initialize cart and order state from AsyncStorage
    useEffect(() => {
        const initializeState = async () => {
            try {
                // Load cart and order data
                const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
                const storedOrder = await AsyncStorage.getItem(ORDER_STORAGE_KEY);
                const storedTimer = await AsyncStorage.getItem(DELIVERY_TIMER_KEY);

                // If route params exist, treat as new order
                if (routeCartItems.length > 0) {
                    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(routeCartItems));
                    await AsyncStorage.setItem(
                        ORDER_STORAGE_KEY,
                        JSON.stringify({ cartItems: routeCartItems, subtotal: routeSubtotal })
                    );
                    setCartItems(routeCartItems);
                    setSubtotal(routeSubtotal);

                    // Reset timer for new order
                    const now = new Date();
                    const arrival = new Date(now.getTime() + 10 * 60000); // 10 minutes from now
                    const latest = new Date(now.getTime() + 25 * 60000); // 25 minutes from now

                    const arrivalTimeValue = formatTime(arrival);
                    const latestArrivalTimeValue = formatTime(latest);

                    setArrivalTime(arrivalTimeValue);
                    setLatestArrivalTime(latestArrivalTimeValue);
                    setTrackingState('preparing');
                    setRemainingSeconds(600);

                    await AsyncStorage.setItem(
                        DELIVERY_TIMER_KEY,
                        JSON.stringify({
                            startTime: Date.now().toString(),
                            initialSeconds: 600,
                            state: 'preparing',
                            arrivalTime: arrivalTimeValue,
                            latestArrivalTime: latestArrivalTimeValue,
                        })
                    );
                } else if (storedOrder && storedTimer) {
                    // Load existing order and timer
                    const { cartItems: savedCartItems, subtotal: savedSubtotal } = JSON.parse(storedOrder);
                    setCartItems(savedCartItems || []);
                    setSubtotal(savedSubtotal || 0);

                    const { startTime, initialSeconds, state, arrivalTime, latestArrivalTime } =
                        JSON.parse(storedTimer);
                    const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
                    const remaining = Math.max(0, initialSeconds - elapsed);

                    setRemainingSeconds(remaining);
                    setArrivalTime(arrivalTime);
                    setLatestArrivalTime(latestArrivalTime);

                    if (remaining <= 0 || state === 'delivered') {
                        setTrackingState('delivered');
                        await AsyncStorage.removeItem(DELIVERY_TIMER_KEY);
                        await AsyncStorage.removeItem(ORDER_STORAGE_KEY);
                        setArrivalTime('');
                        setLatestArrivalTime('');
                        naviation.navigate('DeliveryScreen')
                    } else if (elapsed >= 480) {
                        setTrackingState('at_the_address');
                    } else if (elapsed >= 10) {
                        setTrackingState('on_the_way');
                    } else {
                        setTrackingState('preparing');
                    }

                    if (state) {
                        setTrackingState(state);
                    }
                } else if (storedCart) {
                    // Fallback to cart items if no order data
                    const parsedCart = JSON.parse(storedCart);
                    setCartItems(parsedCart || []);
                    const calculatedSubtotal = parsedCart.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                    );
                    setSubtotal(calculatedSubtotal);

                    // Start new timer if no timer data exists
                    const now = new Date();
                    const arrival = new Date(now.getTime() + 10 * 60000);
                    const latest = new Date(now.getTime() + 25 * 60000);

                    const arrivalTimeValue = formatTime(arrival);
                    const latestArrivalTimeValue = formatTime(latest);

                    setArrivalTime(arrivalTimeValue);
                    setLatestArrivalTime(latestArrivalTimeValue);
                    setTrackingState('preparing');
                    setRemainingSeconds(600);

                    await AsyncStorage.setItem(
                        DELIVERY_TIMER_KEY,
                        JSON.stringify({
                            startTime: Date.now().toString(),
                            initialSeconds: 600,
                            state: 'preparing',
                            arrivalTime: arrivalTimeValue,
                            latestArrivalTime: latestArrivalTimeValue,
                        })
                    );
                } else {
                    // No data available, reset to empty state
                    setCartItems([]);
                    setSubtotal(0);
                    setTrackingState('delivered');
                    setArrivalTime('');
                    setLatestArrivalTime('');
                    setRemainingSeconds(0);
                    await AsyncStorage.removeItem(DELIVERY_TIMER_KEY);
                    await AsyncStorage.removeItem(ORDER_STORAGE_KEY);
                }
            } catch (error) {
                console.error('Error initializing state:', error);
            }
        };
        initializeState();
    }, [routeCartItems, routeSubtotal]);

    // Countdown timer effect and state transitions
    useEffect(() => {
        if (remainingSeconds > 0 && trackingState !== 'delivered') {
            timerRef.current = setInterval(() => {
                setRemainingSeconds((prev) => {
                    const newTime = prev - 1;
                    const elapsed = 600 - newTime;

                    if (newTime <= 0) {
                        setTrackingState('delivered');
                        AsyncStorage.removeItem(DELIVERY_TIMER_KEY).catch((error) =>
                            console.error('Error clearing timer:', error)
                        );
                        AsyncStorage.removeItem(ORDER_STORAGE_KEY).catch((error) =>
                            console.error('Error clearing order data:', error)
                        );
                        clearInterval(timerRef.current);
                        setArrivalTime('');
                        setLatestArrivalTime('');
                        naviation.navigate('DeliveredScreen')
                        return 0;
                    } else if (elapsed >= 480 && trackingState !== 'at_the_address') {
                        setTrackingState('at_the_address');
                        AsyncStorage.setItem(
                            DELIVERY_TIMER_KEY,
                            JSON.stringify({
                                startTime: (Date.now() - elapsed * 1000).toString(),
                                initialSeconds: 600,
                                state: 'at_the_address',
                                arrivalTime: arrivalTime,
                                latestArrivalTime: latestArrivalTime,
                            })
                        ).catch((error) => console.error('Error updating state:', error));
                    } else if (elapsed >= 10 && trackingState === 'preparing') {
                        setTrackingState('on_the_way');
                        AsyncStorage.setItem(
                            DELIVERY_TIMER_KEY,
                            JSON.stringify({
                                startTime: (Date.now() - elapsed * 1000).toString(),
                                initialSeconds: 600,
                                state: 'on_the_way',
                                arrivalTime: arrivalTime,
                                latestArrivalTime: latestArrivalTime,
                            })
                        ).catch((error) => console.error('Error updating state:', error));
                    }
                    return newTime;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [remainingSeconds, trackingState, arrivalTime, latestArrivalTime]);

    // Format remaining time
    const formatRemainingTime = () => {
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} away`;
    };

    const OrderSummary = () => (
        <View style={styles.summaryContainer}>
            <View style={styles.summaryHeader}>
                <Text style={styles.sectionTitle}>Order summary</Text>
                <TouchableOpacity>
                    <Text style={styles.viewReceipt}>view receipt</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.restaurantName}>Subway, Warriors Arena Road</Text>
            {cartItems.map((item) => (
                <View key={item.id} style={styles.orderItem}>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                    </View>
                </View>
            ))}
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>${subtotal.toFixed(2)}</Text>
            </View>
        </View>
    );

    const renderTrackingScreen = () => {
        let title, progress;
        switch (trackingState) {
            case 'preparing':
                title = 'Preparing your order...';
                progress = 40;
                break;
            case 'on_the_way':
                title = 'On the way...';
                progress = 60;
                break;
            case 'at_the_address':
                title = 'At the address...';
                progress = 90;
                break;
            case 'delivered':
                title = 'Delivered!';
                progress = 100;
                break;
            default:
                title = 'Preparing your order...';
                progress = 40;
        }

        if (trackingState === 'preparing') {
            return (
                <SafeAreaView style={styles.container}>
                    <CommonHeader />
                    <ScrollView style={styles.content}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.timeContainer}>
                            <Text style={styles.arrivalText}>Arriving at {arrivalTime}</Text>
                            <ProgressBar progress={progress} />
                            <Text style={styles.latestText}>Latest arrival by {latestArrivalTime}</Text>
                        </View>
                        <View style={styles.illustrationContainer}>
                            <CookingIllustration />
                        </View>
                        <DeliveryDetails />
                        <ShareSection />
                        <OrderSummary />
                        <InviteFriends />
                    </ScrollView>
                </SafeAreaView>
            );
        }

        return (
            <SafeAreaView style={styles.container}>
                <CommonHeader />
                <ScrollView style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.timeContainer}>
                        <Text style={styles.arrivalText}>
                            {trackingState === 'delivered' ? '' : `Arriving at ${arrivalTime}`}
                        </Text>
                        <ProgressBar progress={progress} />
                        <Text style={styles.latestText}>
                            {trackingState === 'delivered' ? '' : `Latest arrival by ${latestArrivalTime}`}
                        </Text>
                    </View>
                    {trackingState !== 'delivered' && (
                        <View style={styles.mapContainer}>
                            <Image
                                source={require('../assets/images/Map.png')}
                                style={styles.mapImage}
                                resizeMode="cover"
                            />
                            <View style={styles.deliveryInfo}>
                                <Text style={styles.minutesAway}>{formatRemainingTime()}</Text>
                            </View>
                        </View>
                    )}
                    {trackingState !== 'delivered' && (
                        <View style={styles.driverContainer}>
                            <Image
                                source={require('../assets/images/DriverAvatar.png')}
                                style={styles.driverAvatar}
                            />
                            <View style={styles.driverInfo}>
                                <View style={styles.driverHeader}>
                                    <Text style={styles.driverName}>🟢 Jonathan</Text>
                                    <Text style={styles.licensePlate}>• 7EL005</Text>
                                </View>
                                <Text style={styles.carInfo}>White Honda Civic</Text>
                                <Text style={styles.rating}>95% 👍</Text>
                            </View>
                        </View>
                    )}
                    {trackingState !== 'delivered' && (
                        <View style={styles.actionButtons}>
                            <TouchableOpacity>
                                <CallIcon />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: rw(190),
                                    height: rw(44),
                                    borderRadius: rw(99),
                                    backgroundColor: '#EEEEEE',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: rw(16),
                                        fontFamily: FONTS.regular,
                                        fontWeight: '400',
                                        color: 'black',
                                    }}
                                >
                                    Send Message
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#EEEEEE',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: rw(84),
                                    height: rw(44),
                                    borderRadius: rw(99),
                                    gap: rw(10),
                                }}
                            >
                                <TipIcon />
                                <Text style={styles.tipButtonText}>Tip</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <DeliveryDetails />
                    <ShareSection />
                    <OrderSummary />
                    <InviteFriends />
                </ScrollView>
            </SafeAreaView>
        );
    };

    return renderTrackingScreen();
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    timeContainer: {
        marginBottom: 30,
    },
    arrivalText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color:'black'
    },
    latestText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    illustrationContainer: {
        alignItems: 'center',
        marginVertical: 40,
    },
    mapContainer: {
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 20,
        position: 'relative',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
    deliveryInfo: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    minutesAway: {
        fontSize: 14,
        fontWeight: '600',
        color: 'black',
    },
    driverContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
    },
    driverAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    driverInfo: {
        flex: 1,
    },
    driverHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    driverName: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
    },
    licensePlate: {
        fontSize: 14,
        color: '#666',
        marginLeft: 5,
    },
    carInfo: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    rating: {
        fontSize: 14,
        marginTop: 2,
        color: 'black',
    },
    actionButtons: {
        flexDirection: 'row',
        marginBottom: 30,
        gap: 10,
    },
    tipButtonText: {
        color: 'black',
        fontSize: rw(14),
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: rw(18),
        fontWeight: 'bold',
        marginBottom: rw(15),
        color: 'black',
    },
    summaryContainer: {
        marginBottom: 30,
    },
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 10,
    },
    viewReceipt: {
        color: '#00C851',
        fontSize: 14,
        fontWeight: '500',
    },
    restaurantName: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    itemQuantity: {
        fontSize: 16,
        fontWeight: '600',
        width: 30,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: 'black',
    },
    itemPrice: {
        fontSize: 14,
        color: '#666',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
    },
});

export default OrderTrackingScreen;