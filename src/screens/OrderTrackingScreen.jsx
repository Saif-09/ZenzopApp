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
import { CommonHeader } from '../components';
import CookingIllustration from '../assets/svgs/CookingIllustration';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import CallIcon from '../assets/svgs/CallIcon';
import { rw } from '../utils/responsiveUtil';
import { FONTS } from '../utils/fonts';
import TipIcon from '../assets/svgs/TipIcon';

const { width } = Dimensions.get('window');

const OrderTrackingScreen = () => {
    const route = useRoute();
    const { cartItems = [], subtotal = 0 } = route.params || {};
    const [trackingState, setTrackingState] = useState('preparing');
    const [arrivalTime, setArrivalTime] = useState('');
    const [latestArrivalTime, setLatestArrivalTime] = useState('');
    const [remainingSeconds, setRemainingSeconds] = useState(600); // 10 minutes in seconds
    const timerRef = useRef(null);

    // Initialize timer and state from AsyncStorage
    useEffect(() => {
        const initializeState = async () => {
            try {
                const storedData = await AsyncStorage.getItem('deliveryTimer');
                const now = new Date();
                const arrival = new Date(now.getTime() + 10 * 60000); // 10 minutes from now
                const latest = new Date(now.getTime() + 25 * 60000); // 25 minutes from now

                const formatTime = (date) => {
                    return date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    });
                };

                setArrivalTime(formatTime(arrival));
                setLatestArrivalTime(formatTime(latest));

                if (storedData) {
                    const { startTime, initialSeconds } = JSON.parse(storedData);
                    const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
                    const remaining = Math.max(0, initialSeconds - elapsed);

                    setRemainingSeconds(remaining);
                    if (remaining <= 0) {
                        await AsyncStorage.removeItem('deliveryTimer');
                        setTrackingState('preparing');
                    } else if (elapsed >= 10) {
                        setTrackingState('almost_there');
                    } else {
                        setTrackingState('preparing');
                    }
                } else {
                    setTrackingState('preparing');
                    // Start new timer with 10 minutes
                    try {
                        await AsyncStorage.setItem('deliveryTimer', JSON.stringify({
                            startTime: Date.now().toString(),
                            initialSeconds: 600 // 10 minutes
                        }));
                    } catch (error) {
                        console.error('Error saving timer:', error);
                    }

                    // Transition to 'almost_there' after 10 seconds
                    const stateTimer = setTimeout(() => {
                        setTrackingState('almost_there');
                    }, 10000);

                    return () => clearTimeout(stateTimer);
                }
            } catch (error) {
                console.error('Error initializing state:', error);
            }
        };
        initializeState();
    }, []);

    // Countdown timer effect for both states
    useEffect(() => {
        if (remainingSeconds > 0) {
            timerRef.current = setInterval(() => {
                setRemainingSeconds(prev => {
                    const newTime = prev - 1;
                    if (newTime <= 0) {
                        AsyncStorage.removeItem('deliveryTimer').catch(error =>
                            console.error('Error clearing timer:', error)
                        );
                        clearInterval(timerRef.current);
                        return 0;
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
    }, [remainingSeconds]);

    // Format remaining time
    const formatRemainingTime = () => {
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} away`;
    };

    const ProgressBar = ({ progress }) => (
        <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
        </View>
    );

    const DeliveryDetails = () => (
        <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Delivery details</Text>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Address</Text>
                <Text style={styles.detailValue}>Bay Area, San Francisco, California, USA</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>Leave at door</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Instructions</Text>
                <Text style={styles.detailValue}>
                    Please knock to let me know it has arrive and then leave it at the doorstep
                </Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Service</Text>
                <Text style={styles.detailValue}>Standard</Text>
            </View>
        </View>
    );

    const ShareSection = () => (
        <View style={styles.shareContainer}>
            <View>
                <Text style={styles.shareTitle}>Share this delivery</Text>
                <Text style={styles.shareSubtitle}>Let someone follow along</Text>
            </View>
            <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
        </View>
    );

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

    const InviteFriends = () => (
        <View style={styles.inviteContainer}>
            <Text style={styles.sectionTitle}>Invite friends</Text>
            <View style={styles.inviteContent}>
                <Text style={styles.inviteIcon}>🍔</Text>
                <Text style={styles.inviteText}>Invite a friend, get $5 off</Text>
            </View>
        </View>
    );

    if (trackingState === 'preparing') {
        return (
            <SafeAreaView style={styles.container}>
                <CommonHeader />
                <ScrollView style={styles.content}>
                    <Text style={styles.title}>Preparing your order...</Text>
                    <View style={styles.timeContainer}>
                        <Text style={styles.arrivalText}>Arriving at {arrivalTime}</Text>
                        <ProgressBar progress={40} />
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
                <Text style={styles.title}>Almost there...</Text>
                <View style={styles.timeContainer}>
                    <Text style={styles.arrivalText}>Arriving at {arrivalTime}</Text>
                    <ProgressBar progress={80} />
                    <Text style={styles.latestText}>Latest arrival by {latestArrivalTime}</Text>
                </View>
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
                <View style={styles.actionButtons}>
                    <TouchableOpacity >
                        <CallIcon />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: rw(190), height: rw(44), borderRadius: rw(99), backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: rw(16), fontFamily: FONTS.regular, fontWeight: '400', color: 'black' }}>Send Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#EEEEEE', flexDirection:'row', alignItems: 'center', justifyContent: 'center', width: rw(84), height: rw(44), borderRadius: rw(99), gap: rw(10)}}>
                        <TipIcon/>
                        <Text style={styles.tipButtonText}>Tip</Text>
                    </TouchableOpacity>
                </View>
                <DeliveryDetails />
                <ShareSection />
                <OrderSummary />
                <InviteFriends />
            </ScrollView>
        </SafeAreaView>
    );
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
    },
    timeContainer: {
        marginBottom: 30,
    },
    arrivalText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    progressContainer: {
        marginVertical: 10,
    },
    progressBackground: {
        height: 4,
        backgroundColor: '#e0e0e0',
        borderRadius: 2,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#00C851',
        borderRadius: 2,
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
    cookingIllustration: {
        width: 150,
        height: 150,
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
    },
    actionButtons: {
        flexDirection: 'row',
        marginBottom: 30,
        gap: 10,
    },
    messageButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    messageButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    tipButton: {
        backgroundColor: '#000',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    tipButtonText: {
        color: 'black',
        fontSize: rw(14),
        fontWeight: '500',
    },
    detailsContainer: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    detailRow: {
        marginBottom: 15,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    detailValue: {
        fontSize: 16,
        color: '#000',
    },
    shareContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 20,
        borderRadius: 12,
        marginBottom: 30,
    },
    shareTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    shareSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    shareButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    shareButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    summaryContainer: {
        marginBottom: 30,
    },
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
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
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: '600',
    },
    inviteContainer: {
        marginBottom: 30,
    },
    inviteContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 12,
    },
    inviteIcon: {
        fontSize: 24,
        marginRight: 15,
    },
    inviteText: {
        fontSize: 16,
        color: '#00C851',
        fontWeight: '500',
    },
});

export default OrderTrackingScreen;