import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const ShareIcon = (props) => (
    <Svg
        width={17}
        height={17}
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G
            clipPath="url(#a)"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="M3.167 8.5v5.333A1.333 1.333 0 0 0 4.5 15.167h8a1.333 1.333 0 0 0 1.333-1.334V8.5m-2.666-4L8.5 1.833 5.833 4.5M8.5 1.833V10.5" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M.5.5h16v16H.5z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default ShareIcon;
