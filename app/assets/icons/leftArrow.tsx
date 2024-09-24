import React from "react";
import { Path, Svg } from "react-native-svg";
import { Iconprops } from ".";

export default function RightArrow({ Fill }: Iconprops) {
  return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
      <Path
        d="M15.5 17L10.5 12L15.5 7"
        stroke={Fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
