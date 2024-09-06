import React from "react";
import { Circle, ClipPath, Defs, G, Rect, Svg } from "react-native-svg";
import { PickManProps } from ".";

export default function BasicProfile({ face, body }: PickManProps) {
  return (
    <Svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <G clip-path="url(#clip0_77_14676)">
        <Rect width="60" height="60" rx="30" fill={face} />
        <Circle cx="30" cy="26" r="10" fill={body} />
        <Circle cx="30" cy="60" r="20" fill={body} />
      </G>
      <Defs>
        <ClipPath id="clip0_77_14676">
          <Rect width="60" height="60" rx="30" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
