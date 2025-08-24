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
    vehicle: Vehicle | null; // pass full vehicle object from parent
}

export default function VehicleDetailDialog({
    open,
    onClose,
    vehicle,
}: VehicleDetailDialogProps) {
    if (!vehicle) return null;

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
                    <DetailCard
                        title="Status"
                        value={vehicle.status.toLocaleUpperCase()}
                        icon={<DirectionsCarIcon />}
                    />
                    <DetailCard
                        title="Current Speed"
                        value={`${vehicle.speed} mph`}
                        icon={<SpeedIcon />}
                    />
                    <DetailCard
                        title="Driver"
                        value={vehicle.driverName}
                        icon={<PersonIcon />}
                    />
                    <DetailCard
                        title="Phone"
                        value={vehicle.driverPhone}
                        icon={<PhoneIcon />}
                    />
                    <DetailCard
                        title="Destination"
                        value={vehicle.destination}
                        icon={<PlaceIcon />}
                    />
                    <DetailCard
                        title="Location"
                        value={`${vehicle.currentLocation.lat}, ${vehicle.currentLocation.lng}`}
                        icon={<PlaceIcon />}
                    />
                    <DetailCard
                        title="Battery Level"
                        value={`${vehicle.batteryLevel}%`}
                        icon={<BatteryChargingFullIcon />}
                    />
                    <DetailCard
                        title="Fuel Level"
                        value={`${vehicle.fuelLevel}%`}
                        icon={<LocalGasStationIcon />}
                    />
                    <DetailCard
                        title="Last Updated"
                        value={vehicle.lastUpdated}
                        icon={<AccessTimeIcon />}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}
