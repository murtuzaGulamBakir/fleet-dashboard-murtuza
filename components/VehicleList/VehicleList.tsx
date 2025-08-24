"use client";

import { useEffect, useState } from "react";
import { CircularProgress, Typography, Chip, Tooltip } from "@mui/material";

import { fetchVehicles } from "@/services/api";
import type { Vehicle } from "@/types/vehicle";
import { TableColumn } from "@/types/table";
import { formatDistanceToNow, format } from "date-fns";
import { StatusCell } from "./TableCells/StatusCell";
import { DataTable } from "../Table";
import { SpeedCell } from "./TableCells/SpeedCell";
import { EtaCell } from "./TableCells/EtaCell";
import { LastUpdateCell } from "./TableCells/LastUpdateCell";
import { LocationCell } from "./TableCells/LocationCell";
import { vehicleTableColums as columns } from "./VehicleColums.data";
import { useStatusFilterStore } from "@/store/statusFilterStore";
import VehicleDetailDialog from "../VehicleDetail";
import { useVehicleDetailStore } from "@/store/vehicleDetailStore";
import { useFleetStore } from "@/store/fleetStore";

export default function VehicleList() {
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { vehicles, loadingVehicles } = useFleetStore();
    const { activeStatus, setActiveStatus } = useStatusFilterStore();
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
