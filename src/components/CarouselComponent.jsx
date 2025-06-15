import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { rw } from '../utils/responsiveUtils';
import FastImage from 'react-native-fast-image';
import { rw } from '../utils/responsiveUtil';
// import Toast from 'react-native-toast-message';

const CarouselComponent = ({ data, handleShopNow }) => {
    // Sample data with provided image URLs
    const carouselData = [
        { id: '1', image: 'https://plus.unsplash.com/premium_photo-1686878940830-9031355ec98c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '2', image: 'https://images.unsplash.com/photo-1695654390723-479197a8c4a3?q=80&w=3468&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '3', image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?q=80&w=3446&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ];

    // Only render if we have valid data
    if (!carouselData || carouselData.length === 0) {
        return null;
    }

    // const showToast = () => {
    //     Toast.show({
    //         type: 'success',
    //         text1: 'Image Clicked',
    //         text2: 'You clicked on the carousel image!',
    //     });
    // };

    const renderCarouselItem = ({ item }) => {
        // Skip items without images
        if (!item?.image) return null;

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => {
                    // showToast();
                    handleShopNow?.(item); // Call handleShopNow if provided
                }}
            >
                <Image
                    source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                    style={styles.cardImage}
                    resizeMode="cover" // Changed to cover for better fit
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.carouselContainer}>
            <FlatList
                data={carouselData}
                renderItem={renderCarouselItem}
                keyExtractor={(item, index) => `${item?.id}-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={rw(327) + rw(16)} // Adjusted for new card width + margin
                decelerationRate="fast"
                contentContainerStyle={styles.carouselContent}
            />
        </View>
    );
};

export default CarouselComponent;

const styles = StyleSheet.create({
    carouselContainer: {
        marginTop: rw(16),
    },
    carouselContent: {
        paddingHorizontal: rw(0),
        paddingLeft: rw(24),
    },
    card: {
        width: rw(327), // Adjusted to match image width
        height: rw(121), // Adjusted to match image height
        borderRadius: rw(12),
        marginRight: rw(16),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // elevation: 3,
        overflow: 'hidden',
    },
    cardImage: {
        width: rw(327), // Set to exact dimensions
        height: rw(121), // Set to exact dimensions
        borderRadius: rw(12),
    },
});