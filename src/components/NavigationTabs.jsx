import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { rw } from '../utils/responsiveUtil';
import { FONTS } from '../utils/fonts';

const NavigationTabs = () => {
    const [activeTab, setActiveTab] = useState('Featured');

    const tabs = ['Featured', 'Categories', 'Orders'];

    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    style={[
                        styles.tab,
                        activeTab === tab ? styles.activeTab : styles.inactiveTab
                    ]}
                    onPress={() => handleTabPress(tab)}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === tab ? styles.activeTabText : styles.inactiveTabText
                    ]}>
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: rw(16),
        marginTop:rw(22),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tab: {
        paddingHorizontal: rw(24),
        paddingVertical: rw(8),
        borderRadius: rw(24),
        minWidth: rw(100),
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#000000',
    },
    inactiveTab: {
        backgroundColor: 'transparent',
    },
    tabText: {
        fontSize: rw(14),
        fontWeight: '500',
        fontFamily:FONTS.medium
    },
    activeTabText: {
        color: '#ffffff',
    },
    inactiveTabText: {
        color: '#666666',
    },
});

export default NavigationTabs;