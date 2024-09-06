import { create } from "zustand";

interface PickerState {
  Picker: "time" | "classTime";
  ChangePicker: () => void;
}

const useTimePickerSetting = create<PickerState>((set) => ({
  Picker: "time",
  ChangePicker: () =>
    set((state) => ({
      Picker: state.Picker === "classTime" ? "time" : "classTime",
    })),
}));

export default useTimePickerSetting;
