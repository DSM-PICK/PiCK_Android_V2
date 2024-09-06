import React from "react";
import { Iconprops } from ".";
import { Defs, G, Path, Rect, Svg, ClipPath } from "react-native-svg";

export default function New({ Fill }: Iconprops) {
  return (
    <Svg width="14" height="15" viewBox="0 0 14 15" fill="none">
      <G clip-path="url(#clip0_3332_5089)">
        <Rect y="0.5" width="14" height="14" rx="7" fill={Fill} />
        <Path
          d="M9.17188 10.5H8.26562L5.58594 6.63281H5.53906V10.5H4.52344V4.84375H5.44531L8.10938 8.71094H8.16406V4.84375H9.17188V10.5Z"
          fill="#FAF6FF"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3332_5089">
          <Rect y="0.5" width="14" height="14" rx="7" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
