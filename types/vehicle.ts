export type VehicleStatus = "IDLE" | "DELIVERED" | "EN_ROUTE" | "STOPPED";

export interface Vehicle {
    id: string;
    vehicleNumber: string;
    driverName: string;
    driverPhone: string;
    status: VehicleStatus;
    speed: number;
    destination: string;
    estimatedArrival: string | null;
    lastUpdated: string;
    batteryLevel: number;
    fuelLevel: number;
    currentLocation: {
        lat: number;
        lng: number;
    };
}
    