import create from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { light, dark } from "@/utils/function/color/constant";

type Theme = typeof light;

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set, get) => ({
  theme: light,
  toggleTheme: async () => {
    const newTheme = get().theme === light ? dark : light;
    await AsyncStorage.setItem("theme", JSON.stringify(newTheme));
    set({ theme: newTheme });
  },
}));

const loadTheme = async () => {
  const storedTheme = await AsyncStorage.getItem("theme");
  if (storedTheme) {
    const theme = JSON.parse(storedTheme);
    useThemeStore.setState({ theme });
  }
};

loadTheme();

export default useThemeStore;
