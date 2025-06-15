import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { rw } from '../utils/responsiveUtil'
import { FONTS } from '../utils/fonts'
import SearchIcon from '../assets/svgs/SearchIcon'

const SearchBar = () => {
    return (
        <View style={{ height: rw(44), width: '100%', paddingHorizontal: rw(16), marginTop: rw(12) }}>
            <View style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE', borderRadius: rw(8), flexDirection: 'row', alignItems: 'center', paddingHorizontal: rw(12), gap: rw(8) }}>
                <View><SearchIcon size={rw(24)} /></View>
                <Text style={{ fontSize: rw(16), fontFamily: FONTS.regular, fontWeight: '400', color: '#6B6B6B' }}> Search for products... </Text>

            </View>

        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({})