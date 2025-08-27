"use client";

import { Chip } from "@mui/material";

export function SpeedCell({ value }: { value: number }) {
    return (
        <Chip
            label={`${value} mph`}
            size="small"
            sx={{
                fontWeight: 600,
                bgcolor: "#f5f6f8",
                color: "black",
            }}
        />
    );
}
