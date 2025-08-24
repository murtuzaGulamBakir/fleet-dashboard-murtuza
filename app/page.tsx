"use client";

import { DetailCard } from "@/components/DetailCard";
import FleetStats from "@/components/FleetStats";
import StatusFilter from "@/components/StatusFilter";
import VehicleList from "@/components/VehicleList/VehicleList";
import { Typography, Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useFleetStore } from "@/store/fleetStore";
export default function HomePage() {
    const initialize = useFleetStore((s) => s.initialize);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <div style={{ padding: "10px 5px 10px 5px" }}>
            <Box sx={{ py: 0, textAlign: "left" ,mb : 2}}>
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
                {/* ✅ Fleet statistics cards */}
                <Box mb={4} flexBasis={"30%"}>
                    <StatusFilter />
                    <Divider sx={{ my: 2 }} />
                    <FleetStats />
                    {/* <VehicleDetailGrid /> */}
                </Box>
                <Box mb={4} flexBasis={"70%"}>
                    <VehicleList />
                </Box>
            </Box>
        </div>
    );
}
