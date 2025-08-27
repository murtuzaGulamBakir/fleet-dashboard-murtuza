"use client";

import { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import type { Vehicle } from "@/types/vehicle";
import { DataTable } from "../../../components/Table";
import { vehicleTableColums as columns } from "./components/VehicleTableColums";
import { useStatusFilterStore } from "@/store/status-filter/statusFilterStore";
import VehicleDetailDialog from "./components/VehicleDetail/VehicleDetail";
import { useVehicleDetailStore } from "@/store/vehicle/vehiclePopUpStore";
import { useFleetStore } from "@/store/fleet/fleetStore";

export default function VehicleList() {
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { vehicles, loadingVehicles } = useFleetStore();
    const { activeStatus } = useStatusFilterStore();
    const { vehicle, clearVehicle } = useVehicleDetailStore();

    useEffect(() => {
        const filteredVehicles = vehicles.filter((vehicle) => {
            if (activeStatus === "all") return true;
            return vehicle.status.toLocaleLowerCase() == activeStatus;
        });
        setFilteredVehicles(filteredVehicles);
    }, [activeStatus, vehicles]);

    if (loadingVehicles)
        return (
            <Typography align="center" sx={{ mt: 3 }}>
                <CircularProgress />
            </Typography>
        );

    if (error)
        return (
            <Typography color="error" align="center" sx={{ mt: 3 }}>
                {error}
            </Typography>
        );

    if (!loadingVehicles && vehicles.length === 0)
        return (
            <Typography align="center" sx={{ mt: 3 }}>
                No vehicles found.
            </Typography>
        );

    return (
        <>
            <DataTable
                title="Vehicles"
                columns={columns}
                data={filteredVehicles}
            />
            <VehicleDetailDialog
                vehicle={vehicle}
                onClose={() => clearVehicle()}
                open={!!vehicle}
            />
        </>
    );
}
