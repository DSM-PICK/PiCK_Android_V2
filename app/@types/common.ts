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
  // CalanderType.ts
  export interface weekPropType {
    date: number[]; // [year, month]
    picks?: number[];
    onSelect?: (date: number) => void; // 날짜를 number로 받도록 수정
    selected?: number | undefined; // 선택된 날짜
    setSelected?: (date: number) => void; // 선택된 날짜를 설정하는 함수
  }
}
