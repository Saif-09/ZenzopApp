import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProgressBar = ({ progress }) => (
        <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
        </View>
    );

export default ProgressBar

const styles = StyleSheet.create({
    progressContainer: {
        marginVertical: 10,
    },
    progressBackground: {
        height: 4,
        backgroundColor: '#e0e0e0',
        borderRadius: 2,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#00C851',
        borderRadius: 2,
    },
})