import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { rw } from "../../utils/responsiveUtil";
const TipIcon = (props) => (
    <Svg
        width={rw(20)}
        height={rw(20)}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={10} cy={10} r={10} fill="#000" />
        <Path
            d="M14.286 8.929H11.07V5.714A.714.714 0 0 0 10.357 5h-.714a.714.714 0 0 0-.714.714V8.93H5.714A.714.714 0 0 0 5 9.643v.714c0 .395.32.714.714.714H8.93v3.215c0 .394.32.714.714.714h.714c.395 0 .714-.32.714-.714V11.07h3.215c.394 0 .714-.32.714-.714v-.714a.714.714 0 0 0-.714-.714"
            fill="#fff"
        />
    </Svg>
);
export default TipIcon;