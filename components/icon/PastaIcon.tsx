import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function PastaIcon(props: SvgProps) {
  // Dynamic color binding para sa selected state
  const iconColor = props.stroke || props.fill || "#16AB4C";

  return (
    <Svg width={18} height={18} viewBox="0 0 15 13" fill="none" {...props}>
      <Path
        d="M1.417 9.563V3.542h-.709v-.709h.709v-.708h-.709v-.708h.709V.708h-.709V0h4.25c.354.021.673.17.949.446.276.276.432.616.468.97h7.083v.709H6.375c-.035.375-.191.708-.467 1.013-.277.304-.596.44-.95.404H3.542v4.994c.035 0 .092-.007.17-.035.078-.028.142 0 .184 0 .397 0 .85.1 1.36.298.29-.652.786-1.233 1.494-1.715.708-.481 1.417-.708 2.125-.708 1.084 0 2.005.375 2.756 1.126.75.751 1.119 1.672 1.119 2.77v.192c0 .092-.021.141-.021.163H.808c.092-.355.29-.709.609-1.063zM2.833 8.663V3.542h-.708v5.454c.354-.177.574-.283.708-.333zM4.958 2.833V2.125H3.542v.708h1.416zM4.958.708H3.542v.709h1.416V.708zM2.125.708v.709h.708V.708h-.708zm0 1.417v.708h.708v-.708h-.708zM0 11.333h14.167L12.75 12.75H1.417L0 11.333z"
        fill={iconColor}
      />
    </Svg>
  );
}

export default PastaIcon;
