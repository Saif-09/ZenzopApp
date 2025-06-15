import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS } from '../utils/fonts';
import { InfoIcon } from '../assets/svgs/InfoIcon';

const MinimumOrderNotice = ({ currentTotal, minimumAmount, freeDeliveryAmount }) => {
    const remainingAmount = freeDeliveryAmount - currentTotal;

    return (
        <View style={styles.noticeContainer}>
            <View style={styles.minimumOrderRow}>
                <InfoIcon />
                <Text style={styles.minimumOrderText}>
                    The minimum order amount is ${minimumAmount.toFixed(2)}
                </Text>
            </View>

            {remainingAmount > 0 && (
                <View style={styles.freeDeliveryNotice}>
                    <Text style={styles.freeDeliveryText}>
                        Add ${remainingAmount.toFixed(2)} more to your order and get your items delivered for free
                    </Text>
                </View>
            )}
        </View>
    );
};
export default MinimumOrderNotice

const styles = StyleSheet.create({
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
})