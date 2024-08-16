type fontKeysType =
  | "heading"
  | "subTitle"
  | "body"
  | "caption"
  | "label"
  | "button";

type fontWeightType =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

type fontType = {
  [key in fontKeysType]: {
    [key: number]: {
      fontSize: number;
      fontWeight: fontWeightType;
    };
  };
};

export const font: fontType = {
  heading: {
    1: {
      fontSize: 42,
      fontWeight: "600",
    },
    2: {
      fontSize: 32,
      fontWeight: "600",
    },
    3: {
      fontSize: 24,
      fontWeight: "600",
    },
    4: {
      fontSize: 20,
      fontWeight: "600",
    },
  },
  subTitle: {
    1: {
      fontSize: 18,
      fontWeight: "600",
    },
    2: {
      fontSize: 16,
      fontWeight: "600",
    },
    3: {
      fontSize: 14,
      fontWeight: "600",
    },
  },
  body: {
    1: {
      fontSize: 14,
      fontWeight: "500",
    },
    2: {
      fontSize: 12,
      fontWeight: "500",
    },
    3: {
      fontSize: 10,
      fontWeight: "500",
    },
  },
  caption: {
    1: {
      fontSize: 16,
      fontWeight: "400",
    },
    2: {
      fontSize: 14,
      fontWeight: "400",
    },
  },
  label: {
    1: {
      fontSize: 16,
      fontWeight: "500",
    },
    2: {
      fontSize: 12,
      fontWeight: "500",
    },
  },
  button: {
    1: {
      fontSize: 16,
      fontWeight: "600",
    },
    2: {
      fontSize: 12,
      fontWeight: "600",
    },
  },
};
