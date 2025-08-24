"use client";

import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { format } from "date-fns";
import { fetchStatistics } from "@/services/api";
import { StatsCard } from "./StatsCard";
import { useFleetStore } from "@/store/fleetStore";
import { LastUpdateCell } from "./VehicleList/TableCells/LastUpdateCell";

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

    const statsConfig = [
        {
            key: "total",
            title: "TOTAL FLEET",
            value: stats.total,
            icon: <PeopleAltIcon fontSize="small" />,
        },
        {
            key: "avg_speed",
            title: "AVG. SPEED",
            value: `${stats.average_speed} km/h`,
            icon: <TrendingUpIcon fontSize="small" />,
        },
        {
            key: "moving",
            title: "MOVING",
            value: stats.en_route,
            icon: <DirectionsCarIcon fontSize="small" />,
        },
        {
            key: "last_update",
            title: "LAST UPDATE",
            value: lastUpdated ? format(new Date(lastUpdated), "HH:mm") : "-",
            icon: <AccessTimeIcon fontSize="small" />,
        },
    ];

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
                {statsConfig.map(({ key, title, value, icon }) => (
                    <StatsCard
                        key={key}
                        title={title}
                        value={value}
                        icon={icon}
                    />
                ))}
            </Box>
            <Box
                mt={1}
                component={Paper}
                display={"flex"}
                justifyContent="center"
                padding={1}
                alignItems="center"
                gap={1}
                fontSize={14}
                sx={{ textWrap: "nowrap" }}
                marginTop={2}
                fontWeight={500}
            >
                <AccessTimeIcon fontSize="small" /> Updated
                <LastUpdateCell
                    key={"last_update_time"}
                    value={lastUpdated}
                />{" "}
                <span style={{ fontSize: 20 }}>•</span> Updates every ~ 3
                minutes
            </Box>
        </Box>
    );
}
