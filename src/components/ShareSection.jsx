import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { rw } from '../utils/responsiveUtil';

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

export default ShareSection

const styles = StyleSheet.create({
    shareContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: rw(20),
        borderRadius: rw(12),
        marginBottom: rw(30),
    },
    shareTitle: {
        fontSize: rw(16),
        fontWeight: '600',
        color: '#333',
    },
    shareSubtitle: {
        fontSize: rw(14),
        color: '#666',
        marginTop: 2,
    },
    shareButton: {
        backgroundColor: '#fff',
        paddingHorizontal: rw(20),
        paddingVertical: rw(10),
        borderRadius: rw(8),
        borderWidth: 1,
        borderColor: '#ddd',
    },
    shareButtonText: {
        fontSize: rw(16),
        fontWeight: '500',
        color: '#007bff',
    },
})