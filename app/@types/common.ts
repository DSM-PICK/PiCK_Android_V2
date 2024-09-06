type SON = string | number;

declare module "ScrollPickerType" {
  export interface PropType {
    items: SON[];
    onScroll: (selected: SON, id: SON) => void;
    id?: SON;
  }
}

declare module "ScrollPickerType" {
  export interface PropType {
    items: SON[];
    onScroll: (selected: SON, id: SON) => void;
    id?: SON;
  }
}

declare module "ModalType" {
  export interface PropType {
    children: React.ReactElement;
    type: number;
    visible: boolean;
    onAccept: () => void;
    onCancel?: () => void;
    setVisible: (visible: any) => void;
  }
}

declare module "CalanderType" {
  export interface calPropType {
    picks?: number[];
    onMove?: ({}: any) => void;
    onSelect?: ({}: any) => void;
  }
  export interface weekPropType {
    date: number[];
    setSelected: ([]) => void;
    picks: number[] | undefined;
    selected: number[] | undefined;
    onSelect: (({}) => void) | undefined;
  }
}
