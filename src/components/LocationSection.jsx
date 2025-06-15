import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LocationIcon } from '../assets/svgs/LocationIcon';
import { ChevronRightIcon } from '../assets/svgs/ChevronRightIcon';
import { FONTS } from '../utils/fonts';
import { rw } from '../utils/responsiveUtil';

const LocationSection = ({ location, listName, onLocationPress }) => (
    <TouchableOpacity style={styles.locationSection} onPress={onLocationPress}>
        <View style={styles.locationIcon}>
            <LocationIcon />
        </View>
        <View style={styles.locationInfo}>
            <Text style={styles.locationName}>{location}</Text>
            <Text style={styles.listName}>{listName}</Text>
        </View>
        <ChevronRightIcon />
    </TouchableOpacity>
);

export default LocationSection

const styles = StyleSheet.create({
    locationSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: rw(20),
        paddingVertical: rw(20),
        backgroundColor: '#FFFFFF',
    },
    locationIcon: {
        marginRight: 16,
    },
    locationInfo: {
        flex: 1,
    },
    locationName: {
        fontSize: rw(16),
        fontWeight: '600',
        fontFamily: FONTS.medium,
        color: '#000',
        marginBottom: rw(4),
    },
    listName: {
        fontSize: rw(14),
        color: '#666',
        fontFamily: FONTS.regular,
    },
})