import { ReactNode } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Tooltip,
} from "@mui/material";
import { TableColumn } from "@/types/table";

interface DataTableProps<T> {
    title?: string;
    columns: TableColumn<T>[];
    data: T[];
}

export function DataTable<T extends { id: string | number }>({
    title,
    columns,
    data,
}: DataTableProps<T>) {
    return (
        <TableContainer component={Paper}>
            {title && (
                <Typography variant="h6" sx={{ p: 2 }}>
                    {title} ({data.length})
                </Typography>
            )}
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell
                                key={String(col.accessor)}
                                sx={{ fontWeight: 600, minWidth: col.minWidth }}
                            >
                                {col.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            {columns.map((col) => {
                                const value = row[col.accessor] as ReactNode;
                                return (
                                    <TableCell
                                        key={String(col.accessor)}
                                        sx={{
                                            maxWidth: 130,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            borderBottom:
                                                "1px solid rgba(224, 224, 224, 1)",
                                        }}
                                    >
                                        {col.render ? (
                                            col.render(value, row)
                                        ) : (
                                            <Tooltip title={value ?? ""} arrow>
                                                <span
                                                    style={{ fontWeight: 500 }}
                                                >
                                                    {value}
                                                </span>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
