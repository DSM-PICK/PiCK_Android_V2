import AsyncStorage from "@react-native-async-storage/async-storage";
import { light, dark } from "@/constants";
import { create } from "zustand";

interface ThemeState {
  theme: typeof light;
  toggleTheme: () => void;
}

const loadTheme = async () => {
  const storedTheme = await AsyncStorage.getItem("theme");
  if (storedTheme) {
    const theme = JSON.parse(storedTheme);
    useTheme.setState({ theme });
  }
};

loadTheme();

export const useTheme = create<ThemeState>((set, get) => ({
  theme: light,
  toggleTheme: async () => {
    const newTheme = get().theme === light ? dark : light;
    await AsyncStorage.setItem("theme", JSON.stringify(newTheme));
    set({ theme: newTheme });
  },
}));
