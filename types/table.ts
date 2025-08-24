import { ReactNode } from "react";

export interface TableColumn<T> {
    label: string;
    accessor: keyof T;
    render?: (value: any, row: T) => ReactNode;
    minWidth?: number;
}
