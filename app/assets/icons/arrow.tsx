import React from "react";
import { Path, Svg } from "react-native-svg";
import { ArrowProps } from ".";

export default function Arrow({ Fill, onPress, hitSlop, style }: ArrowProps) {
  return (
    <Svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      onPress={onPress}
      hitSlop={hitSlop}
      style={style}
    >
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
