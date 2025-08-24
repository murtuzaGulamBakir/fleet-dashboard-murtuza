// store/vehicleDetailStore.ts
import { create } from "zustand";
import type { Vehicle } from "@/types/vehicle";

interface VehicleDetailState {
    vehicle: Vehicle | null;
    setVehicle: (vehicle: Vehicle | null) => void;
    clearVehicle: () => void;
}

export const useVehicleDetailStore = create<VehicleDetailState>((set) => ({
    vehicle: null,
    setVehicle: (vehicle) => set({ vehicle }),
    clearVehicle: () => set({ vehicle: null }),
}));
