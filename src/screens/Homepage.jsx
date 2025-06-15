import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { rw } from '../utils/responsiveUtil'
import { FONTS } from '../utils/fonts'
import ProfileIcon from '../assets/svgs/ProfileIcon'
import CartIcon from '../assets/svgs/CartIcon'
import Header from '../components/Header'
import SearchIcon from '../assets/svgs/SearchIcon'
import SearchBar from '../components/SearchBar'
import ClockIcon from '../assets/svgs/ClockIcon'
import DollarIcon from '../assets/svgs/DollarIcon'
import PriceSection from '../components/PriceSection'
import NavigationTabs from '../components/NavigationTabs'
import CarouselComponent from '../components/CarouselComponent'

const Homepage = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={'default'} />
            <Header />
            <SearchBar/>
            <PriceSection/>
            <NavigationTabs/>
            <CarouselComponent/>

            
        </SafeAreaView>
    )
}

export default Homepage

const styles = StyleSheet.create({})