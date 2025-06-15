import * as React from "react";
import Svg, { G, Circle, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const PlusIcon = (props) => (
    <Svg
        width={props.size || 43}
        height={props.size || 43}
        viewBox="0 0 43 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G filter="url(#filter0_d_2_369)">
            <Circle cx={21.5} cy={17.5} r={17.5} fill="white" />
        </G>
        <Path
            d="M21.1111 12.4445V23.3333"
            stroke="black"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M15.6666 17.8889H26.5555"
            stroke="black"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Defs></Defs>
    </Svg>
);
export default PlusIcon;
