import { TableColumn } from "@/types/table";
import { Vehicle } from "@/types/vehicle";
import { EtaCell } from "./TableCells/EtaCell";
import { LastUpdateCell } from "./TableCells/LastUpdateCell";
import { LocationCell } from "./TableCells/LocationCell";
import { SpeedCell } from "./TableCells/SpeedCell";
import { StatusCell } from "./TableCells/StatusCell";
import { VehicleNumberCell } from "./TableCells/VehicleNumberCell";

export const vehicleTableColums: TableColumn<Vehicle>[] = [
    {
        label: "Vehicle",
        accessor: "vehicleNumber",
        render: (v, row) => <VehicleNumberCell vehicle={row} />,
    },
    { label: "Driver", accessor: "driverName" },
    {
        label: "Status",
        accessor: "status",
        render: (v) => <StatusCell value={v} />,
    },
    {
        label: "Speed",
        accessor: "speed",
        render: (v) => <SpeedCell value={v} />,
    },
    { label: "Destination", accessor: "destination" },
    {
        label: "ETA",
        accessor: "estimatedArrival",
        render: (v) => <EtaCell value={v} />,
    },
    {
        label: "Last Update",
        accessor: "lastUpdated",
        render: (v) => <LastUpdateCell key={"last_update_table"} value={v} />,
    },

    {
        label: "Location",
        accessor: "currentLocation",
        render: (v) => <LocationCell value={v} />,
    },
];
