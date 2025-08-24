// types/table.ts
import { ReactNode } from "react";

export interface TableColumn<T> {
    /** Label shown in header */
    label: string;
    /** Key in row object to render */
    accessor: keyof T;
    /** Optional custom renderer for cell */
    render?: (value: any, row: T) => ReactNode;
    /** Optional min width */
    minWidth?: number;
}
