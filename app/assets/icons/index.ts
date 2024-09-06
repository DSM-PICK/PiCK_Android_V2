import {
  GestureResponderEvent,
  Insets,
  StyleProp,
  ViewStyle,
} from "react-native";

export { default as Eye } from "./eye";
export { default as EyeOff } from "./eye-off";
export { default as PickMan } from "./pickman";
export { default as PickLogo } from "./picklogo";
export { default as AlarmIcon } from "./alarm";
export { default as DisplayModeIcon } from "./displayMode";
export { default as ViewSettingIcon } from "./viewSetting";
export { default as DownArrow } from "./downArrow.svg";
export { default as Calendar } from "./selfCalendar.png";
export { default as New } from "./new";
export { default as NoticeIcon } from "./NoticeIcon";
export { default as AllIcon } from "./all";
export { default as ApplicationIcon } from "./application";
export { default as HomeIcon } from "./home";
export { default as ScheduleIcon } from "./schedule";
export { default as BackIcon } from "./backIcon";
export { default as MoveIcon } from "./move";
export { default as EarlyReturnIcon } from "./earlyReturn";
export { default as MelasIcon } from "./meal";
export { default as Arrow } from "./arrow";
export { default as BugIcon } from "./bug";
export { default as CardIcon } from "./card";
export { default as LogOutIcon } from "./logout";
export { default as MyPageIcon } from "./my";
export { default as SmailIcon } from "./smail";
export { default as SpeakerIcon } from "./speaker";
export { default as MainIcon } from "./main";
export { default as TimeIcon } from "./time";

export interface Iconprops {
  Fill?: string;
  OnPress?: () => void;
}

export interface PickManProps {
  face: string;
  body: string;
  leg?: string;
}

export interface ArrowProps {
  Fill: string;
  style?: StyleProp<ViewStyle>;
  hitSlop: number | Insets | null | undefined;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}
