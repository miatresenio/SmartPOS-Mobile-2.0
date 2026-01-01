import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function FilterIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M2.5 5.83331H17.5M5 10H15M7.5 14.1666H12.5"
        stroke={props.fill || "#1E1E1E"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default FilterIcon;
