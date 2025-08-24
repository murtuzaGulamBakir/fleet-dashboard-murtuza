"use client";

import { Tooltip } from "@mui/material";
import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

export function LastUpdateCell({ value }: { value: string | null }) {
    const [, forceUpdate] = useState(0);

    // Re-render every 1 minute
    useEffect(() => {
        const interval = setInterval(() => {
            forceUpdate((c) => c + 1);
        }, 60_000); // 60 seconds

        return () => clearInterval(interval);
    }, []);

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
