import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";
const ClockIcon = (props) => (
  <Svg
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h24v24H0z" />
    <Defs>
      <Pattern
        id="a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#b" transform="scale(.04167)" />
      </Pattern>
      <Image
        id="b"
        width={24}
        height={24}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAT9JREFUSEu1le0xBFEQRc9GgAyIABmQAREgAyIhA0RABoRABFYGMqBO1b6t2a5+H7Nlu2p+zZt7um/39Fuw41jsWJ+5gMNVQsvRxHqAfeAKuAZOgugH8AQ8Az81YAtwATwCQlqh+A3wmh2qAcxY8WncAWZtJfeJmBAr2ogMYOYvicA58A6cAW+Vki5jJRGgHV8VW0YA2nU07UkE3FbKN+ERgOe08qFUGAF6fFwpfxSgxmkN8NsYl1GAEuvEpxX4E+l/LQrAPsV/Ijb9oPRhG0CWQKw8BfhhyyIHQH+zcHynkVrkgVaTG+5tvPqcWjhnTEcBzTG1gW7KvVG1cO57lf16+c1ZFSPM7qooItmy6wGGl10Rcum5HXt2aYsTNmtdF4g9sRqfuEKcFhPw2erCySz59yuz53v3fe9O7gr0DvwBLFY+GXWGr20AAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);
export default ClockIcon;
