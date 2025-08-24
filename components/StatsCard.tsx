"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";
import type { ReactNode } from "react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon?: ReactNode;
    color?: string;
}

export function StatsCard({ title, value, icon, color }: StatsCardProps) {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: 1,
                minWidth: 120,
                minHeight: 80,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
                boxShadow: 1,
            }}
        >
            <CardContent sx={{ p: 0 }}>
                <Typography variant="h5" fontWeight={600}>
                    {value}
                </Typography>
            </CardContent>
            {icon && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.5,
                        color: color ?? "rgba(0, 0, 0, 0.6)",
                    }}
                >
                    {icon}
                    <Typography
                        fontSize={14}
                        variant="body2"
                        color="text.secondary"
                    >
                        {title}
                    </Typography>
                </Box>
            )}
        </Card>
    );
}
