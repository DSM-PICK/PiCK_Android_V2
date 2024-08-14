import create from "zustand";
import { light, dark } from "@/utils/function/color/constant";

type Theme = typeof light;

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: light,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === light ? dark : light,
    })),
}));

export default useThemeStore;
