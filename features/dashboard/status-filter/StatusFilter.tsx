"use client";

import { Box, Typography, CircularProgress } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import { FilterCard } from "./components/FilterCard";
import { StatusKey, useStatusFilterStore } from "@/store/status-filter/statusFilterStore";
import { useFleetStore } from "@/store/fleet/fleetStore";
import { FleetStatistics } from "@/types/statistics";

const STATUS_CONFIG = [
    {
        key: "all",
        label: "All",
        color: "#9e9e9e",
        getCount: (s: FleetStatistics) => s.total,
    },
    {
        key: "idle",
        label: "Idle",
        color: "#ff9800",
        getCount: (s: FleetStatistics) => s.idle,
    },
    {
        key: "en_route",
        label: "En Route",
        color: "#2196f3",
        getCount: (s: FleetStatistics) => s.en_route,
    },
    {
        key: "delivered",
        label: "Delivered",
        color: "#4caf50",
        getCount: (s: FleetStatistics) => s.delivered,
    },
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
            <Box display="flex" alignItems="center" mb={2}>
                <TimelineIcon sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                    Filter by Status
                </Typography>
            </Box>

            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                {STATUS_CONFIG.map(({ key, label, color, getCount }) => (
                    <FilterCard
                        key={key}
                        title={label}
                        count={getCount(stats)}
                        color={color}
                        selected={activeStatus === key}
                        onClick={() =>
                            setActiveStatus(key as typeof activeStatus)
                        }
                    />
                ))}
            </Box>
        </Box>
    );
}
