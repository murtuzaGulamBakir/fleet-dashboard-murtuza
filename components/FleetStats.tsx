"use client";

import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { format } from "date-fns";

import { fetchStatistics } from "@/services/api";
import type { FleetStatistics } from "@/types/statistics";
import { StatsCard } from "./StatsCard";

export default function FleetStats() {
    const [stats, setStats] = useState<FleetStatistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStatistics()
            .then(({ data }) => setStats(data))
            .catch(() => setError("Could not load fleet statistics"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" align="center" sx={{ mt: 3 }}>
                {error}
            </Typography>
        );
    }

    if (!stats) return null;

    return (
        <Box mt={2}>
            {/* Section Heading */}
            <Box display="flex" alignItems="center" mb={2}>
                <AccessTimeIcon sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                    Fleet Statistics
                </Typography>
            </Box>

            {/* Stat Cards Grid */}
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                <StatsCard
                    title="TOTAL FLEET"
                    value={stats.total}
                    icon={<PeopleAltIcon fontSize="small" />}
                />
                <StatsCard
                    title="AVG. SPEED"
                    value={stats.average_speed}
                    icon={<TrendingUpIcon fontSize="small" />}
                />
                <StatsCard
                    title="MOVING"
                    value={stats.en_route}
                    icon={<DirectionsCarIcon fontSize="small" />}
                />
                <StatsCard
                    title="LAST UPDATE"
                    value={format(new Date(stats.timestamp), "HH:mm")}
                    icon={<AccessTimeIcon fontSize="small" />}
                />
            </Box>
        </Box>
    );
}
