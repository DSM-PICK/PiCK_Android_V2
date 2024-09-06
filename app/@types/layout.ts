declare module "HiddenType" {
  export interface PropType {
    data: any;
    children: React.ReactElement[] | React.ReactElement;
  }
}

declare module "BoxType" {
  type roundType = "none" | "sm" | "lg" | "full" | "big";
  export interface propType {
    children: React.ReactNode;
    rounded?: roundType;
    onPress?: () => void;
    width?: string | number;
    height?: string | number;
  }
}

declare module "TernaryType" {
  export interface PropType {
    data: any;
    onTrue: React.ReactElement[] | React.ReactElement;
    onFalse: React.ReactElement[] | React.ReactElement;
  }
}

declare module "CarouselType" {
  export interface PropType {
    children: React.ReactElement[];
    height: string;
    onScroll?: (item: number) => void;
    first?: number | undefined;
  }
}
