"use client";

import { DetailCard } from "@/components/DetailCard";
import FleetStats from "@/components/FleetStats";
import StatusFilter from "@/components/StatusFilter";
import VehicleList from "@/components/VehicleList/VehicleList";
import { Container, Typography, Box, Divider } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import VehicleDetailGrid from "@/components/VehicleDetail";
import { Vehicle } from "@/types/vehicle";
import { useState } from "react";
export default function HomePage() {
    return (
        <div style={{ padding: "10px 5px 10px 5px" }}>
            <Box sx={{ py: 0, textAlign: "left" }}>
                <Typography variant="h3" gutterBottom>
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
                    <VehicleDetailGrid
                        open={false}
                        onClose={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        vehicleId={""}
                    />
                </Box>
                <VehicleList />
            </Box>
        </div>
    );
}
