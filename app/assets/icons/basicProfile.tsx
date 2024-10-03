import React from "react";
import { Circle, ClipPath, Defs, G, Rect, Svg } from "react-native-svg";
import { PickManProps } from ".";
import { View } from "react-native";

export default function BasicProfile({ face, body }: PickManProps) {
  return (
    <View style={{ overflow: "hidden", height: 60, width: 60, borderRadius: 200 }}>
      <Svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <G clip-path="url(#clip0_34_5326)">
          <Rect width="60" height="60" rx="30" fill="#A66AFB" />
          <Circle cx="30" cy="26" r="10" fill="#F1F1F2" />
          <Circle cx="30" cy="60" r="20" fill="#F1F1F2" />
        </G>
        <Defs>
          <ClipPath id="clip0_34_5326">
            <Rect width="60" height="60" rx="30" ry="30" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}
