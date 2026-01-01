import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function HomeIcon(props: SvgProps) {
  // Ginagamit natin ang props.fill para sumunod sa kulay na galing sa _layout.tsx
  const iconColor = props.fill || "#B0B0B0";

  return (
    <Svg
      width={18}
      height={19}
      viewBox="0 0 18 19"
      fill="none"
      // TINANGGAL ang xmlns dahil pang-web lang iyon
      {...props}
    >
      <Path
        d="M0 17.631V6.978c0-.314.073-.611.22-.891.145-.28.347-.511.603-.693L7.684.396C8.044.132 8.454 0 8.915 0c.461 0 .874.132 1.239.396l6.86 4.997c.258.181.46.413.605.694.146.28.219.577.219.89v10.654c0 .329-.127.615-.381.86a1.247 1.247 0 01-.893.366h-4.312c-.292 0-.537-.095-.734-.284a.943.943 0 01-.296-.706V12.02a.939.939 0 00-.295-.704 1.018 1.018 0 00-.734-.286H7.645c-.292 0-.536.095-.733.286a.937.937 0 00-.297.704v5.847c0 .28-.098.515-.295.705-.197.19-.442.284-.733.284H1.274c-.341 0-.64-.122-.893-.366A1.156 1.156 0 010 17.63z"
        fill={iconColor} // Dynamic color binding
      />
    </Svg>
  );
}

export default HomeIcon;
