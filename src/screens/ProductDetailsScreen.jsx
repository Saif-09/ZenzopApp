import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { rw } from '../utils/responsiveUtil';
import { FONTS } from '../utils/fonts';
import PlusIcon from '../assets/svgs/PlusIcon';
import MinusIcon from '../assets/svgs/MinusIcon';
import { fruitsVegetablesData } from '../data/fruitsVegetablesData';
import CommonHeader from '../components/CommonHeader';
import { addToCart } from '../redux/slices/cartSlice';
import { beveragesData } from '../data/beveragesData';
import { frozenFoodsData } from '../data/frozenFoodsData';
import { pantryGroceriesData } from '../data/pantryGroceriesData';
import { meatSeafoodPlantBasedData } from '../data/meatSeafoodPlantBasedData';
import { dairyEggsCheeseData } from '../data/dairyEggsCheeseData';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const productId = route.params?.productId || 1;
    const allProducts = [
        ...fruitsVegetablesData,
        ...beveragesData,
        ...frozenFoodsData,
        ...pantryGroceriesData,
        ...meatSeafoodPlantBasedData,
        ...dairyEggsCheeseData
    ];
    const product = allProducts.find(item => item.id === productId) || fruitsVegetablesData[0];

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart({ item: { ...product, store: 'Safeway' }, quantity }));
        navigation.navigate('CartScreen');
    };

    const renderNutritionFacts = () => {
        const { nutritionFacts } = product;

        return (
            <View style={styles.nutritionContainer}>
                <Text style={styles.nutritionTitle}>Nutrition facts</Text>
                <View style={styles.nutritionCard}>
                    <View style={styles.servingContainer}>
                        <Text style={styles.servingText}>Serving Size {nutritionFacts.servingSize}</Text>
                    </View>
                    <View style={styles.caloriesRow}>
                        <Text style={styles.caloriesLabel}>Calories {nutritionFacts.calories}</Text>
                        <Text style={styles.dailyValueHeader}>% Daily Value</Text>
                    </View>
                    <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Total Fat {nutritionFacts.totalFat.value}{nutritionFacts.totalFat.unit}</Text>
                        <Text style={styles.nutritionValue}>{nutritionFacts.totalFat.dailyValue}%</Text>
                    </View>
                    <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Saturated Fat {nutritionFacts.saturatedFat.value}{nutritionFacts.saturatedFat.unit}</Text>
                        <Text style={styles.nutritionValue}>{nutritionFacts.saturatedFat.dailyValue}%</Text>
                    </View>
                    <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Sodium {nutritionFacts.sodium.value}{nutritionFacts.sodium.unit}</Text>
                        <Text style={styles.nutritionValue}>{nutritionFacts.sodium.dailyValue}%</Text>
                    </View>
                    <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Total Carbohydrate {nutritionFacts.totalCarbohydrate.value}{nutritionFacts.totalCarbohydrate.unit}</Text>
                        <Text style={styles.nutritionValue}>{nutritionFacts.totalCarbohydrate.dailyValue}%</Text>
                    </View>
                    <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Dietary Fiber {nutritionFacts.dietaryFiber.value}{nutritionFacts.dietaryFiber.unit}</Text>
                        <Text style={styles.nutritionValue}>{nutritionFacts.dietaryFiber.dailyValue}%</Text>
                    </View>
                    <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Sugars {nutritionFacts.sugars.value}{nutritionFacts.sugars.unit}</Text>
                        <Text style={styles.nutritionValue}></Text>
                    </View>
                    <View style={styles.nutritionRow}>
                        <Text style={styles.nutritionLabel}>Protein {nutritionFacts.protein.value}{nutritionFacts.protein.unit}</Text>
                        <Text style={styles.nutritionValue}></Text>
                    </View>
                    <View style={styles.mineralsContainer}>
                        <View style={styles.mineralRow}>
                            <Text style={styles.mineralLabel}>Potassium</Text>
                            <Text style={styles.mineralValue}>{nutritionFacts.potassium.dailyValue}%</Text>
                        </View>
                        <View style={styles.mineralRow}>
                            <Text style={styles.mineralLabel}>Calcium</Text>
                            <Text style={styles.mineralValue}>{nutritionFacts.calcium.dailyValue}%</Text>
                        </View>
                        <View style={styles.mineralRow}>
                            <Text style={styles.mineralLabel}>Iron</Text>
                            <Text style={styles.mineralValue}>{nutritionFacts.iron.dailyValue}%</Text>
                        </View>
                        <View style={styles.mineralRow}>
                            <Text style={styles.mineralLabel}>Vitamin A</Text>
                            <Text style={styles.mineralValue}>{nutritionFacts.vitaminA.dailyValue}%</Text>
                        </View>
                        <View style={styles.mineralRow}>
                            <Text style={styles.mineralLabel}>Vitamin C</Text>
                            <Text style={styles.mineralValue}>{nutritionFacts.vitaminC.dailyValue}%</Text>
                        </View>
                    </View>
                    <Text style={styles.nutritionDisclaimer}>
                        * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutritional advice.
                    </Text>
                </View>
            </View>
        );
    };

    const renderRelatedProducts = () => {
        // Determine the category of the current product
        const isBeverage = beveragesData.some(item => item.id === product.id);
        const isFrozenFood = frozenFoodsData.some(item => item.id === product.id);
        const isPantryGrocery = pantryGroceriesData.some(item => item.id === product.id);
        const isMeatSeafoodPlantBased = meatSeafoodPlantBasedData.some(item => item.id === product.id);
        const isDairyEggsCheese = dairyEggsCheeseData.some(item => item.id === product.id);

        // Filter related products based on category
        let relatedProducts;
        if (isBeverage) {
            relatedProducts = beveragesData.filter(item => item.id !== product.id).slice(0, 4);
        } else if (isFrozenFood) {
            relatedProducts = frozenFoodsData.filter(item => item.id !== product.id).slice(0, 4);
        } else if (isPantryGrocery) {
            relatedProducts = pantryGroceriesData.filter(item => item.id !== product.id).slice(0, 4);
        } else if (isMeatSeafoodPlantBased) {
            relatedProducts = meatSeafoodPlantBasedData.filter(item => item.id !== product.id).slice(0, 4);
        } else if (isDairyEggsCheese) {
            relatedProducts = dairyEggsCheeseData.filter(item => item.id !== product.id).slice(0, 4);
        } else {
            relatedProducts = fruitsVegetablesData.filter(item => item.id !== product.id).slice(0, 4);
        }

        return (
            <View style={styles.relatedContainer}>
                <Text style={styles.relatedTitle}>Related</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedScroll}>
                    {relatedProducts.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.relatedItem}
                            onPress={() => navigation.replace('ProductDetails', { productId: item.id })}
                        >
                            <Image source={{ uri: item.image }} style={styles.relatedImage} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>Information</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Price</Text>
                            <Text style={styles.infoValue}>${product.price.toFixed(2)}/pc</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Price per pound</Text>
                            <Text style={styles.infoValue}>${product.pricePerPound.toFixed(2)}/lb</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Package</Text>
                            <Text style={styles.infoValue}>{product.package}</Text>
                        </View>
                    </View>
                    {renderNutritionFacts()}
                    {renderRelatedProducts()}
                </View>
            </ScrollView>
            <View style={styles.bottomActions}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => handleQuantityChange(-1)}
                        style={styles.quantityButton}
                    >
                        <MinusIcon width={rw(24)} height={rw(24)} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}pc</Text>
                    <TouchableOpacity
                        onPress={() => handleQuantityChange(1)}
                        style={styles.quantityButton}
                    >
                        <PlusIcon />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    imageContainer: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#FFFFFF',
    },
    productImage: {
        width: 200,
        height: 200,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
    },
    productInfo: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    productName: {
        fontSize: rw(24),
        fontWeight: '600',
        fontFamily: FONTS.medium,
        color: '#000',
        marginBottom: 32,
    },
    infoSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: rw(16),
        fontWeight: '600',
        fontFamily: FONTS.medium,
        color: '#000',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    infoLabel: {
        fontSize: 16,
        color: '#666',
        fontFamily: FONTS.regular,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        fontFamily: FONTS.medium,
    },
    nutritionContainer: {
        marginBottom: 32,
    },
    nutritionTitle: {
        fontSize: rw(16),
        fontWeight: '600',
        fontFamily: FONTS.medium,
        color: '#000',
        marginBottom: 16,
    },
    nutritionCard: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 16,
    },
    servingContainer: {
        backgroundColor: '#E8E8E8',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginBottom: 12,
    },
    servingText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        fontFamily: FONTS.medium,
    },
    caloriesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        marginBottom: 8,
    },
    caloriesLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        fontFamily: FONTS.medium,
    },
    dailyValueHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        fontFamily: FONTS.medium,
    },
    nutritionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    nutritionLabel: {
        fontSize: 14,
        color: '#000',
        fontFamily: FONTS.regular,
    },
    nutritionValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        fontFamily: FONTS.medium,
    },
    mineralsContainer: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#DDD',
    },
    mineralRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    mineralLabel: {
        fontSize: 14,
        color: '#888',
        fontFamily: FONTS.regular,
    },
    mineralValue: {
        fontSize: 14,
        color: '#888',
        fontFamily: FONTS.regular,
    },
    nutritionDisclaimer: {
        fontSize: 12,
        color: '#666',
        fontFamily: FONTS.regular,
        marginTop: 12,
        lineHeight: 16,
    },
    relatedContainer: {
        marginBottom: 20,
    },
    relatedTitle: {
        fontSize: rw(16),
        fontWeight: '600',
        fontFamily: FONTS.medium,
        color: '#000',
        marginBottom: 16,
    },
    relatedScroll: {
        flexDirection: 'row',
    },
    relatedItem: {
        marginRight: 12,
        borderRadius: 8,
        overflow: 'hidden',
    },
    relatedImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
    },
    bottomActions: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        paddingHorizontal: 4,
    },
    quantityButton: {
        padding: 12,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        fontFamily: FONTS.medium,
        marginHorizontal: 16,
    },
    addToCartButton: {
        backgroundColor: '#000000',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
    },
    addToCartText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: FONTS.medium,
    },
});