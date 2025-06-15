import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { rw } from '../utils/responsiveUtil';

const InviteFriends = () => (
        <View style={styles.inviteContainer}>
            <Text style={styles.sectionTitle}>Invite friends</Text>
            <View style={styles.inviteContent}>
                <Text style={styles.inviteIcon}>🍔</Text>
                <Text style={styles.inviteText}>Invite a friend, get $5 off</Text>
            </View>
        </View>
    );

export default InviteFriends

const styles = StyleSheet.create({
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
    sectionTitle: {
            fontSize: rw(18),
            fontWeight: 'bold',
            marginBottom: rw(15),
        },
})