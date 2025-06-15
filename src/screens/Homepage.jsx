import { ScrollView, StatusBar, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    Header,
    SearchBar,
    PriceSection,
    NavigationTabs,
    CarouselComponent,
    CategorySections
} from '../components'
import { fruitsVegetablesData, beveragesData, frozenFoodsData, pantryGroceriesData, meatSeafoodPlantBasedData, dairyEggsCheeseData } from '../data'

const Homepage = () => {
    const navigation = useNavigation();
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        const checkTimer = async () => {
            try {
                const storedData = await AsyncStorage.getItem('deliveryTimer');
                if (storedData) {
                    const { startTime, initialSeconds } = JSON.parse(storedData);
                    const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
                    const remaining = Math.max(0, initialSeconds - elapsed);
                    setIsTimerRunning(remaining > 0);
                } else {
                    setIsTimerRunning(false);
                }
            } catch (error) {
                console.error('Error checking timer:', error);
            }
        };

        // Initial check
        checkTimer();

        // Poll every 5 seconds to update button visibility
        const interval = setInterval(checkTimer, 5000);

        return () => clearInterval(interval);
    }, []);

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
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={handleTrackOrder}
                >
                    <Text style={styles.floatingButtonText}>Track Order</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    )
}

export default Homepage

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#00C851',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    floatingButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
})