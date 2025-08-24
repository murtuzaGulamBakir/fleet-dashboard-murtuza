// components/VehicleListTableCells/VehicleNumberCell.tsx
"use client";

import { Typography } from "@mui/material";
import { useVehicleDetailStore } from "@/store/vehicleDetailStore";
import type { Vehicle } from "@/types/vehicle";

interface VehicleNumberCellProps {
    vehicle: Vehicle;
}

export function VehicleNumberCell({ vehicle }: VehicleNumberCellProps) {
    const setVehicle = useVehicleDetailStore((s) => s.setVehicle);
    return (
        <Typography
            variant="body2"
            fontWeight={600}
            sx={{
                "cursor": "pointer",
                "color": "primary.main",
                "textDecoration": "underline",
                "&:hover": { opacity: 0.8 },
            }}
            onClick={() => setVehicle(vehicle)}
        >
            {vehicle.vehicleNumber}
        </Typography>
    );
}
