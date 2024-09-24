import { create } from "zustand";

type fnType = (message: string) => void;

interface ToastType {
  show: boolean;
  type: string;
  message: string;
  success: fnType;
  error: fnType;
  waiting: fnType;
  stop: () => void;
}

const defaultData = {
  show: false,
  type: "",
  message: "",
};

export const useToast = create<ToastType>((set) => ({
  ...defaultData,
  success: (message: string) => {
    console.log("Success called with message: ", message);
    set({ show: true, type: "success", message: message });
  },
  error: (message: string) => {
    console.log("Error called with message: ", message);
    set({ show: true, type: "error", message: message });
  },
  waiting: (message: string) => {
    console.log("Waiting called with message: ", message);
    set({ show: true, type: "waiting", message: message });
  },
  stop: () => set((prev: any) => ({ ...prev, show: false })),
}));
