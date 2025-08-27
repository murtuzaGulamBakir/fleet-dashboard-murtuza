import { create } from "zustand";

export type StatusKey = "all" | "idle" | "en_route" | "delivered" | null;

interface StatusFilterState {
    activeStatus: StatusKey;
    setActiveStatus: (status: StatusKey) => void;
    resetStatus: () => void;
}

export const useStatusFilterStore = create<StatusFilterState>((set) => ({
    activeStatus: "all", // default to "All"
    setActiveStatus: (status) => set({ activeStatus: status }),
    resetStatus: () => set({ activeStatus: "all" }),
}));
