"use client";

import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { format } from "date-fns";

import { fetchStatistics } from "@/services/api";
import { StatsCard } from "./StatsCard";
import { useFleetStore } from "@/store/fleetStore";

export default function FleetStats() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { lastUpdated, vehicles, setStats, stats } = useFleetStore();
    useEffect(() => {
        const loadStats = async () => {
            try {
                setLoading(true);
                const { data } = await fetchStatistics();
                setStats(data);
            } catch (err) {
                console.error("Failed to fetch fleet statistics:", err);
                setError("Could not load fleet statistics");
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, [vehicles]);

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
                    value={format(new Date(lastUpdated as string), "HH:mm")}
                    icon={<AccessTimeIcon fontSize="small" />}
                />
            </Box>
        </Box>
    );
}
