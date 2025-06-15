import { Dimensions, Platform } from 'react-native';

const percentageCalculation = (max, val) => max * (val / 100);

const responsiveWidth = (w) => {
    const { width } = Dimensions.get('window');
    return percentageCalculation(width, w);
};

// Check for Platform
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

// Responsive Dimensions
const width = isAndroid ? 375 : 375;
const screenWidth = width / 100;

export function rw(n) {
    return responsiveWidth(n / screenWidth);
}

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
