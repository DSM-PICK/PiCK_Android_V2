import React from "react";
import { Path, Svg } from "react-native-svg";
import { Iconprops } from ".";

export default function UpArrow({ Fill }: Iconprops) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 15L12 9L18 15"
        stroke={Fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
