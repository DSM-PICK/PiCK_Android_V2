import React from "react";
import { Path, Svg } from "react-native-svg";
import { Iconprops } from ".";

export default function Back({ Fill }: Iconprops) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.75 19.5L8.25 12L15.75 4.5"
        stroke={Fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
