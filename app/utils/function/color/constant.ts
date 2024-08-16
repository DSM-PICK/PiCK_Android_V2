type FontWeight =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export const light = {
  normal: {
    white: "#ffffff",
    black: "#141414",
  },
  BG: "#000000",
  Error: "#FF3B32",
  Main: {
    50: "#F2EAFE",
    100: "#E0CBFE",
    200: "#CBA8FD",
    300: "#B685FC",
    400: "#A66AFB",
    500: "#9650FA",
    600: "#8E49F9",
    700: "#8340F9",
    800: "#7937F8",
    900: "#6827F6",
  },
  Gray: {
    50: "#F1F1F2",
    100: "#DDDCDD",
    200: "#C6C5C7",
    300: "#AFADB1",
    400: "#9D9CA0",
    500: "#8C8A8F",
    600: "#848287",
    700: "#79777C",
    800: "#6F6D72",
    900: "#5C5A60",
  },
};

export const dark = {
  normal: {
    dark: "#ffffff",
    white: "#141414",
  },
  BG: "#222222",
  Error: "#FF756D",
  Main: {
    50: "#987cf1",
    100: "#a68cf3",
    200: "#ae96f5",
    300: "#b79ff6",
    400: "#bda7f7",
    500: "#c7b4f8",
    600: "#d1c1f9",
    700: "#ded3fb",
    800: "#ebe5fd",
    900: "#f7f4fe",
  },
  Gray: {
    50: "#5C5A60",
    100: "#6F6D72",
    200: "#79777C",
    300: "#848287",
    400: "#8C8A8F",
    500: "#9D9CA0",
    600: "#AFADB1",
    700: "#C6C5C7",
    800: "#DDDCDD",
    900: "#F1F1F2",
  },
};

export const font = {
  heading: {
    1: {
      fontSize: 42,
      fontWeight: "600" as FontWeight,
    },
    2: {
      fontSize: 32,
      fontWeight: "600" as FontWeight,
    },
    3: {
      fontSize: 24,
      fontWeight: "600" as FontWeight,
    },
    4: {
      fontSize: 20,
      fontWeight: "600" as FontWeight,
    },
  },
  subTitle: {
    1: {
      fontSize: 18,
      fontWeight: "600" as FontWeight,
    },
    2: {
      fontSize: 16,
      fontWeight: "600" as FontWeight,
    },
    3: {
      fontSize: 14,
      fontWeight: "600" as FontWeight,
    },
  },
  body: {
    1: {
      fontSize: 14,
      fontWeight: "500" as FontWeight,
    },
    2: {
      fontSize: 12,
      fontWeight: "500" as FontWeight,
    },
    3: {
      fontSize: 10,
      fontWeight: "500" as FontWeight,
    },
  },
  caption: {
    1: {
      fontSize: 16,
      fontWeight: "400" as FontWeight,
    },
    2: {
      fontSize: 14,
      fontWeight: "400" as FontWeight,
    },
  },
  label: {
    1: {
      fontSize: 16,
      fontWeight: "500" as FontWeight,
    },
    2: {
      fontSize: 12,
      fontWeight: "500" as FontWeight,
    },
  },
  button: {
    1: {
      fontSize: 16,
      fontWeight: "600" as FontWeight,
    },
    2: {
      fontSize: 12,
      fontWeight: "600" as FontWeight,
    },
  },
};
