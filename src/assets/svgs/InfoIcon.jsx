import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export const InfoIcon = ({ width = 20, height = 20, color = '#000000' }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Circle
                cx="12"
                cy="12"
                r="10"
                stroke={color}
                strokeWidth="2"
            />
            <Path
                d="M12 16V12"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M12 8H12.01"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};