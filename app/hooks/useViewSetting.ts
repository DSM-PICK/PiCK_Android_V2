import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface ViewState {
  view: "timetable" | "meals";
  changeView: () => void;
}

const loadViewSetting = async () => {
  const storedView = await AsyncStorage.getItem("view");
  if (storedView) {
    useViewSettingStore.setState({ view: storedView as "timetable" | "meals" });
  }
};

loadViewSetting();

export const useViewSettingStore = create<ViewState>((set, get) => ({
  view: "timetable",
  changeView: async () => {
    const newView = get().view === "timetable" ? "meals" : "timetable";
    await AsyncStorage.setItem("view", newView);
    set({ view: newView });
  },
}));
