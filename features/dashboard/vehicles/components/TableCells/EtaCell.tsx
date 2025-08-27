"use client";
import { Tooltip } from "@mui/material";
import { format } from "date-fns";

export function EtaCell({ value }: { value: string | null }) {
    if (!value) {
        return <span>-</span>;
    }
    const date = new Date(value);
    const full = format(date, "PPpp");
    return (
        <Tooltip title={full} arrow>
            <span>{full}</span>
        </Tooltip>
    );
}
