import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { rw } from "../../utils/responsiveUtil";
const CallIcon = (props) => (
  <Svg
    width={rw(44)}
    height={rw(44)}
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={22} cy={22} r={22} fill="#EEE" />
    <Path
      d="m32.373 26.546-4.813-2.063a1.03 1.03 0 0 0-1.203.297l-2.131 2.604a15.93 15.93 0 0 1-7.614-7.614l2.604-2.131a1.03 1.03 0 0 0 .296-1.203l-2.062-4.813a1.04 1.04 0 0 0-1.182-.597L11.8 12.057a1.03 1.03 0 0 0-.8 1.005C11 24.084 19.933 33 30.938 33a1.03 1.03 0 0 0 1.005-.8l1.032-4.468a1.044 1.044 0 0 0-.602-1.186"
      fill="#000"
    />
  </Svg>
);
export default CallIcon;
