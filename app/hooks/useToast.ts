import { create } from "zustand";
export type typeType = "success" | "error" | "wait";

type toastType = {
  type: typeType;
  id: string;
  message: string;
  wasWait?: boolean;
};

interface IToast {
  toasts: toastType[];
  success: (messaeg: string) => void;
  error: (message: string) => void;
  wait: (name: string, message: string) => string;
  update: (id: string, type: typeType, message: string) => void;
  close: (id: string) => void;
}

type optionsType = {
  wasWait?: boolean;
  id?: string;
};

const createToast = (type: typeType, message: string, options?: optionsType) => ({
  type,
  message,
  id: options?.id || Math.random() + "",
  wasWait: options?.wasWait,
});

export const useToast = create<IToast>((set) => ({
  toasts: [],
  success: (message) =>
    set((prev) => ({
      ...prev,
      toasts: [...prev.toasts, createToast("success", message)],
    })),
  error: (message) =>
    set((prev) => ({
      ...prev,
      toasts: [...prev.toasts, createToast("error", message)],
    })),
  wait: (name, message) => {
    const id = `${name}_${new Date().getTime()}`;
    set((prev) => ({
      ...prev,
      toasts: [...prev.toasts, createToast("wait", message, { id })],
    }));
    return id;
  },
  update: (id, type, message) => {
    set((prev) => ({
      ...prev,
      toasts: prev.toasts.map((i) =>
        i.id === id ? createToast(type, message, { wasWait: true }) : i
      ),
    }));
  },
  close: (id) => {
    set((prev) => ({
      ...prev,
      toasts: prev.toasts.filter((i) => i.id !== id),
    }));
  },
}));
