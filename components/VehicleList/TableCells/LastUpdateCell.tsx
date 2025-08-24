"use client";

import { Tooltip } from "@mui/material";
import { format, formatDistanceToNow } from "date-fns";

export function LastUpdateCell({ value }: { value: string | null }) {
    if (!value) {
        return <span>-</span>;
    }

    const date = new Date(value);
    const relative = formatDistanceToNow(date, { addSuffix: true }); // e.g. "3 minutes ago"
    const full = format(date, "PPpp"); // e.g. "Aug 24, 2025, 2:35 PM"

    return (
        <Tooltip title={full} arrow>
            <span>{relative}</span>
        </Tooltip>
    );
}
