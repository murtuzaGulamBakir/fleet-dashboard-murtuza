"use client";

import { Card, Box, Typography } from "@mui/material";

interface FilterCardProps {
    title: string;
    count: number;
    color: string;
    selected?: boolean;
    onClick?: () => void;
}

export function FilterCard({
    title,
    count,
    color,
    selected,
    onClick,
}: FilterCardProps) {
    return (
        <Card
            onClick={onClick}
            sx={{
                "display": "flex",
                "alignItems": "center",
                "px": 2,
                "py": 1.5,
                "borderRadius": 2,
                "cursor": "pointer",
                "border": "1px solid",
                "borderColor": selected ? color : "divider",
                "bgcolor": selected ? `${color}10` : "background.paper",
                "&:hover": {
                    bgcolor: `${color}10`,
                },
            }}
        >
            <Box
                sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: color,
                    mr: 1.5,
                    flexShrink: 0,
                }}
            />

            <Typography
                variant="body2"
                color={`${selected ? color : "rgba(0, 0, 0, 0.54)"}`}
                fontWeight={500}
                sx={{ textWrap: "nowrap" }}
            >
                {title.toLocaleUpperCase()} ( {count} )
            </Typography>
        </Card>
    );
}
