"use client";

import { Tooltip } from "@mui/material";

export function LocationCell({
    value,
}: {
    value: { lat: number; lng: number } | null;
}) {
    if (!value) {
        return <span>-</span>;
    }

    const display = `${value.lat.toFixed(3)}, ${value.lng.toFixed(3)}`;
    const full = `${value.lat}, ${value.lng}`;

    return (
        <Tooltip title={full} arrow>
            <span>{display}</span>
        </Tooltip>
    );
}
