"use client";

import { Card, Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface DetailCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    accentColor?: string;
}

export function DetailCard({
    title,
    value,
    icon,
    accentColor,
}: DetailCardProps) {
    return (
        <Card
            variant="outlined"
            sx={{
                "position": "relative",
                "overflow": "hidden",
                "borderRadius": 2,
                "py": 2,
                "px": 2,
                "display": "flex",
                "flexDirection": "column",
                "minWidth": 180,
                "borderColor": "divider",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 10,
                    height: "100%",
                    width: 6,
                    borderRadius: "12px",
                    bgcolor: accentColor ?? "primary.main",
                    opacity: 0.9,
                },
            }}
        >
            <Box display="flex" alignItems="center" gap={0.5}>
                <Box sx={{ color: "text.secondary" }}>{icon}</Box>
                <Typography
                    variant="caption"
                    fontSize={13}
                    fontWeight={600}
                    color="text.secondary"
                    letterSpacing={0.4}
                >
                    {title.toUpperCase()}
                </Typography>
            </Box>

            <Typography
                variant="body1"
                fontWeight={700}
                fontSize={16}
                color="text.primary"
                marginLeft={1}
            >
                {value}
            </Typography>
        </Card>
    );
}
