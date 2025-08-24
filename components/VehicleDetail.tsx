"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Box,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SpeedIcon from "@mui/icons-material/Speed";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import type { Vehicle } from "@/types/vehicle";
import { DetailCard } from "./DetailCard";

interface VehicleDetailDialogProps {
    open: boolean;
    onClose: () => void;
    vehicle: Vehicle | null;
}

export default function VehicleDetailDialog({
    open,
    onClose,
    vehicle,
}: VehicleDetailDialogProps) {
    if (!vehicle) return null;
    const DETAIL_CONFIG = [
        {
            title: "Status",
            icon: <DirectionsCarIcon />,
            getValue: (v: Vehicle) => v.status.toUpperCase(),
        },
        {
            title: "Current Speed",
            icon: <SpeedIcon />,
            getValue: (v: Vehicle) => `${v.speed} mph`,
        },
        {
            title: "Driver",
            icon: <PersonIcon />,
            getValue: (v: Vehicle) => v.driverName,
        },
        {
            title: "Phone",
            icon: <PhoneIcon />,
            getValue: (v: Vehicle) => v.driverPhone,
        },
        {
            title: "Destination",
            icon: <PlaceIcon />,
            getValue: (v: Vehicle) => v.destination,
        },
        {
            title: "Location",
            icon: <PlaceIcon />,
            getValue: (v: Vehicle) =>
                `${v.currentLocation.lat}, ${v.currentLocation.lng}`,
        },
        {
            title: "Battery Level",
            icon: <BatteryChargingFullIcon />,
            getValue: (v: Vehicle) => `${v.batteryLevel}%`,
        },
        {
            title: "Fuel Level",
            icon: <LocalGasStationIcon />,
            getValue: (v: Vehicle) => `${v.fuelLevel}%`,
        },
        {
            title: "Last Updated",
            icon: <AccessTimeIcon />,
            getValue: (v: Vehicle) => v.lastUpdated,
        },
    ] as const;
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                        variant="h6"
                        color="text.primary"
                        fontWeight={600}
                    >
                        🚚 {vehicle.vehicleNumber} •{" "}
                    </Typography>
                    <Typography
                        variant="overline"
                        color="text.secondary"
                        fontWeight={600}
                        fontSize={18}
                    >
                        {vehicle.status.toLocaleUpperCase()}
                    </Typography>
                </Box>

                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))"
                    gap={2}
                >
                    {DETAIL_CONFIG.map(({ title, icon, getValue }) => (
                        <DetailCard
                            key={title}
                            title={title}
                            value={getValue(vehicle)}
                            icon={icon}
                        />
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    );
}
