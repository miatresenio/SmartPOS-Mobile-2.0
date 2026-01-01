import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SoupIcon(props: SvgProps) {
  // Kunin ang kulay mula sa props para maging dynamic
  const iconColor = props.stroke || props.fill || "#16AB4C";

  return (
    <Svg
      width={props.width || 15}
      height={props.height || 16}
      viewBox="0 0 15 16"
      fill="none"
      {...props}
    >
      <Path
        d="M3.333 14.555h7.084m1.77-7.028l1.771-4.684M9.885.5c.192.078.567.414.532 1.062-.043.648-.66.937-.709 1.577-.035.61.241.968.517 1.265M6.344.5c.191.078.566.414.524 1.062-.036.648-.659.937-.694 1.577-.043.61.233.968.51 1.265M2.802.5c.191.078.567.414.531 1.062-.042.648-.658.937-.708 1.577-.035.61.24.968.524 1.265m3.726 10.15c1.69 0 3.312-.74 4.508-2.058 1.195-1.318 1.867-3.105 1.867-4.969H.5c0 1.864.672 3.651 1.867 4.97 1.196 1.317 2.817 2.058 4.508 2.058z"
        stroke={iconColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SoupIcon;
