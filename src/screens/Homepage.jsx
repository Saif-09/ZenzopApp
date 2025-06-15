import { ScrollView, StatusBar, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Header,
    SearchBar,
    PriceSection,
    NavigationTabs,
    CarouselComponent,
    CategorySections
} from '../components';
import { fruitsVegetablesData, beveragesData, frozenFoodsData, pantryGroceriesData, meatSeafoodPlantBasedData, dairyEggsCheeseData } from '../data';
import { rw } from '../utils/responsiveUtil';

const Homepage = () => {
    const navigation = useNavigation();
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [trackingStatus, setTrackingStatus] = useState('');
    const [remainingTime, setRemainingTime] = useState('');

    useEffect(() => {
        const checkTimer = async () => {
            try {
                const storedData = await AsyncStorage.getItem('deliveryTimer');
                if (storedData) {
                    const { startTime, initialSeconds, state } = JSON.parse(storedData);
                    const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
                    const remaining = Math.max(0, initialSeconds - elapsed);

                    if (remaining > 0 && state !== 'delivered') {
                        setIsTimerRunning(true);
                        setTrackingStatus(formatStatus(state || 'preparing')); // Fallback to 'preparing' if state is undefined
                        setRemainingTime(formatRemainingTime(remaining));
                    } else {
                        setIsTimerRunning(false);
                        setTrackingStatus('');
                        setRemainingTime('');
                    }
                } else {
                    setIsTimerRunning(false);
                    setTrackingStatus('');
                    setRemainingTime('');
                }
            } catch (error) {
                console.error('Error checking timer:', error);
            }
        };

        // Initial check
        checkTimer();

        // Poll every 5 seconds to update button visibility, status, and remaining time
        const interval = setInterval(checkTimer, 5000);

        return () => clearInterval(interval);
    }, []);

    // Format the tracking status for display
    const formatStatus = (state) => {
        switch (state) {
            case 'preparing':
                return 'Preparing';
            case 'on_the_way':
                return 'On the Way';
            case 'at_the_address':
                return 'At the Address';
            case 'delivered':
                return 'Delivered';
            default:
                return 'Preparing';
        }
    };

    // Format remaining time into "MM:SS away"
    const formatRemainingTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs} away`;
    };

    const handleTrackOrder = () => {
        navigation.navigate('OrderTrackingScreen');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar barStyle={'default'} />
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <SearchBar />
                <PriceSection />
                <NavigationTabs />
                <CarouselComponent />
                <CategorySections title="Fruits & Vegetables" data={fruitsVegetablesData} />
                <CategorySections title="Beverages" data={beveragesData} />
                <CategorySections title="Frozen Foods" data={frozenFoodsData} />
                <CategorySections title="Pantry & Groceries" data={pantryGroceriesData} />
                <CategorySections title="Meat, Seafood & Plant-Based" data={meatSeafoodPlantBasedData} />
                <CategorySections title="Dairy, Eggs & Cheese" data={dairyEggsCheeseData} />
            </ScrollView>
            {isTimerRunning && (
                <View style={{paddingHorizontal:rw(64)}}>
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={handleTrackOrder}
                >
                    <Text style={styles.floatingButtonText}>Track Order</Text>
                    <Text style={styles.statusText}>{trackingStatus}</Text>
                    <Text style={styles.timeText}>{remainingTime}</Text>
                </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Homepage;

const styles = StyleSheet.create({
    floatingButton: {
        // position: 'absolute',
        bottom: 20,
        // right: '50%',
        backgroundColor: 'black',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    floatingButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '400',
        opacity: 0.8,
    },
    timeText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '400',
        opacity: 0.8,
    },
});