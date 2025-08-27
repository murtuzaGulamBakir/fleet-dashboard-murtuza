"use client";
import { useEffect } from "react";
import StatusFilter from "@/features/dashboard/status-filter/StatusFilter";
import VehicleList from "@/features/dashboard/vehicles/VehicleTable";
import { Typography, Box, Divider } from "@mui/material";
import { useFleetStore } from "@/store/fleet/fleetStore";
import FleetStats from "@/features/dashboard/statistics/FleetStats";
export default function HomePage() {
    const initialize = useFleetStore((s) => s.initialize);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <div style={{ padding: "10px 5px 10px 5px" }}>
            <Box sx={{ py: 0, textAlign: "left", mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    🚚 Fleet Tracking Dashboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Real-time monitoring of vehicles using LogiNext APIs
                </Typography>
            </Box>
            <Box
                display={"flex"}
                gap={2}
                borderRadius={3}
                border={"1px solid #eee"}
                px={1}
            >
                <Box mb={4} width={"27%"}>
                    <StatusFilter />
                    <Divider sx={{ my: 2 }} />
                    <FleetStats />
                </Box>
                <Box mb={4} flexBasis={"73%"} width={"73%"}>
                    <VehicleList />
                </Box>
            </Box>
        </div>
    );
}
