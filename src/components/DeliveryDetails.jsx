import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { rw } from '../utils/responsiveUtil';

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

export default DeliveryDetails

const styles = StyleSheet.create({
    detailsContainer: {
        marginBottom: rw(30),
    },
    sectionTitle: {
        fontSize: rw(18),
        fontWeight: 'bold',
        marginBottom: rw(15),
    },
    detailRow: {
        marginBottom: rw(10),
    },
    detailLabel: {
        fontSize: rw(14),
        color: '#666',
        marginBottom: rw(3),
    },
    detailValue: {
        fontSize: rw(14),
        color: '#000',
    },
})