import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { rw } from '../utils/responsiveUtil';
import { FONTS } from '../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import { addToCart } from '../redux/slices/cartSlice';
import ProductItem from './ProductItem';

const CategorySections = ({ title, data }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleAddPress = (item) => {
        dispatch(addToCart({ item: { ...item, store: 'Safeway' }, quantity: 1 }));
    };

    const handleItemPress = (item) => {
        navigation.navigate('ProductDetails', { productId: item.id });
    };

    const handleSeeAll = () => {
        console.log(`Navigate to all ${title.toLowerCase()}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <TouchableOpacity onPress={handleSeeAll} style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>See all</Text>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {data.map((item) => (
                    <ProductItem
                        key={item.id}
                        item={item}
                        onAddPress={handleAddPress}
                        onItemPress={handleItemPress}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: rw(10),
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: rw(18),
        fontWeight: '500',
        fontFamily: FONTS.medium,
        color: '#000',
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        fontSize: 16,
        color: '#666',
        marginRight: 4,
    },
    chevron: {
        fontSize: 18,
        color: '#666',
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingHorizontal: 20,
    },
});

export default CategorySections;