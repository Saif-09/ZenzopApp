import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { rw } from '../utils/responsiveUtil';
import ShareIcon from '../assets/svgs/ShareIcon';

const ShareSection = () => (
        <View style={styles.shareContainer}>
            <View>
                <Text style={styles.shareTitle}>Share this delivery</Text>
                <Text style={styles.shareSubtitle}>Let someone follow along</Text>
            </View>
            <TouchableOpacity style={styles.shareButton}>
                <ShareIcon/>
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
        backgroundColor: 'white',
        // paddingHorizontal: rw(16),
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
        backgroundColor: '#EEEEEE',
        paddingHorizontal: rw(20),
        paddingVertical: rw(10),
        borderRadius: rw(60),
        gap:rw(10),
        flexDirection:'row',
        alignItems:'center'
    },
    shareButtonText: {
        fontSize: rw(14),
        fontWeight: '500',
        color: 'black',
    },
})