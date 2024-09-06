import create from "zustand";

interface ViewState {
  view: "timetable" | "meals";
  Change: () => void;
}

const useViewSettingStore = create<ViewState>((set) => ({
  view: "timetable",
  Change: () =>
    set((state) => ({
      view: state.view === "timetable" ? "meals" : "timetable",
    })),
}));

export default useViewSettingStore;
