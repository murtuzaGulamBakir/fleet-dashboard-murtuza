import type { Vehicle } from "@/types/vehicle";
import type { FleetStatistics } from "@/types/statistics";
import { SOCKET_URL } from "@/config";


export type SocketEvent =
    | {
          type: "initial_data";
          data: Vehicle[];
          message: string;
          timestamp: string;
      }
    | {
          type: "vehicle_update";
          payload: Vehicle;
          timestamp: string;
          data: Vehicle[];
      }
    | {
          type: "stats_update";
          data: FleetStatistics;
          timestamp: string;
      }
    | {
          type: "heartbeat";
          payload: { status: string };
          timestamp: string;
      };

type MessageHandler = (event: SocketEvent) => void;

let socket: WebSocket | null = null;
let handlers: MessageHandler[] = [];
let reconnectTimeout: NodeJS.Timeout | null = null;

export function connectSocket() {
    if (socket) return;

    socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {
        console.log("✅ WebSocket connected");
        if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };

    socket.onmessage = (event) => {
        try {
            const data: SocketEvent = JSON.parse(event.data);
            handlers.forEach((cb) => cb(data));
        } catch (err) {
            console.error("❌ Failed to parse WS message:", err);
        }
    };

    socket.onclose = () => {
        console.warn("⚠️ WebSocket closed. Reconnecting in 3s...");
        socket = null;
        reconnectTimeout = setTimeout(connectSocket, 3000);
    };

    socket.onerror = (err) => {
        console.error("❌ WebSocket error:", err);
        socket?.close();
    };
}

export function subscribeSocket(cb: MessageHandler) {
    handlers.push(cb);
    return () => {
        handlers = handlers.filter((h) => h !== cb);
    };
}
