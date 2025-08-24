// stores/fleetStore.ts
import { create } from "zustand";
import type { Vehicle } from "@/types/vehicle";
import type { FleetStatistics } from "@/types/statistics";
import { connectSocket, SocketEvent, subscribeSocket } from "@/services/socket";

interface FleetState {
    vehicles: Vehicle[];
    stats: FleetStatistics | null;
    lastUpdated: string | null;

    loadingVehicles: boolean;
    loadingStats: boolean;
    error: string | null;

    // Actions
    initialize: () => void;
    setVehicles: (vehicles: Vehicle[]) => void;
    // updateVehicle: (vehicle: Vehicle) => void;
    setStats: (stats: FleetStatistics) => void;
    setLoadingVehicles: (loading: boolean) => void;
    setLoadingStats: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useFleetStore = create<FleetState>((set, get) => ({
    vehicles: [],
    stats: null,
    lastUpdated: null,

    loadingVehicles: true,
    loadingStats: true,
    error: null,

    setVehicles: (vehicles) =>
        set({
            vehicles,
            lastUpdated: new Date().toISOString(),
            loadingVehicles: false,
        }),

    setStats: (stats) =>
        set({
            stats,
            lastUpdated: new Date().toISOString(),
            loadingStats: false,
        }),

    setLoadingVehicles: (loading) => set({ loadingVehicles: loading }),
    setLoadingStats: (loading) => set({ loadingStats: loading }),
    setError: (error) => set({ error }),

    initialize: () => {
        try {
            connectSocket();

            subscribeSocket((event: SocketEvent) => {
                switch (event.type) {
                    case "initial_data":
                    case "vehicle_update":
                        get().setVehicles(event.data);
                        break;

                    case "stats_update":
                        get().setStats(event.payload);
                        break;

                    case "heartbeat":
                        console.log("Heartbeat:", event);
                        break;

                    default:
                        console.warn("Unknown WS event:", event);
                }
            });
        } catch (err: any) {
            set({ error: err.message ?? "WebSocket connection failed" });
        }
    },
}));
