"use client";

import { useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import { FilterCard } from "./FilterCard";
import { useStatusFilterStore } from "@/store/statusFilterStore";
import { useFleetStore } from "@/store/fleetStore";

const STATUS_CONFIG = [
    { key: "all", label: "All", color: "#9e9e9e" },
    { key: "idle", label: "Idle", color: "#ff9800" },
    { key: "en_route", label: "En Route", color: "#2196f3" },
    { key: "delivered", label: "Delivered", color: "#4caf50" },
];

export default function StatusFilter() {
    const { activeStatus, setActiveStatus } = useStatusFilterStore();
    const { stats, loadingStats } = useFleetStore();

    if (loadingStats) {
        return (
            <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress size={20} />
            </Box>
        );
    }

    if (!stats) {
        return (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
                {"No data"}
            </Typography>
        );
    }

    return (
        <Box mt={2}>
            {/* Heading */}
            <Box display="flex" alignItems="center" mb={2}>
                <TimelineIcon sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                    Filter by Status
                </Typography>
            </Box>

            {/* Grid for two cards per row */}
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                {STATUS_CONFIG.map(({ key, label, color }) => (
                    <FilterCard
                        key={key}
                        title={label}
                        count={
                            key === "all"
                                ? stats.total
                                : key === "idle"
                                ? stats.idle
                                : key === "en_route"
                                ? stats.en_route
                                : stats.delivered
                        }
                        color={color}
                        selected={activeStatus === key}
                        onClick={() =>
                            setActiveStatus(
                                key as
                                    | "all"
                                    | "idle"
                                    | "en_route"
                                    | "delivered"
                                    | null
                            )
                        }
                    />
                ))}
            </Box>
        </Box>
    );
}
