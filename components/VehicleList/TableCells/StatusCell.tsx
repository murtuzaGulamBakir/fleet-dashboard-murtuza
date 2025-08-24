"use client";

import { Chip } from "@mui/material";
import type { VehicleStatus } from "@/types/vehicle";

const statusColorMap: Record<
    VehicleStatus | string,
    "default" | "success" | "warning" | "error" | "primary"
> = {
    DELIVERED: "success",
    IDLE: "warning",
    EN_ROUTE: "primary",
    STOPPED: "error",
};

export function StatusCell({ value }: { value: VehicleStatus }) {
    return (
        <Chip
            label={value.toUpperCase()}
            color={statusColorMap[value.toUpperCase()] ?? "default"}
            size="small"
            sx={{ fontWeight: 600 }}
        />
    );
}
