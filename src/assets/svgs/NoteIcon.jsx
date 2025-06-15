import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
    <Svg
        width={props.width || 22}
        height={props.height || 19}
        viewBox="0 0 22 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M17.5557 6.86577L3.62695 18.2681L0.459961 14.399L14.3887 2.99663L17.5557 6.86577ZM3.10645 18.1343L0 17.815L0.438477 14.7232L3.10645 18.1343ZM17.4512 0.507371C18.5512 -0.327005 20.1197 -0.111159 20.9541 0.988817C21.7885 2.08882 21.5735 3.65731 20.4736 4.49175L18.4814 6.00249L15.46 2.01909L17.4512 0.507371Z"
            fill="black"
        />
    </Svg>
);
export default SVGComponent;
