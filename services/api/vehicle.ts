import { API_BASE_URL } from "@/config";
import { handleApiResponse } from "../common";

export async function fetchVehicles() {
    try {
        const res = await fetch(`${API_BASE_URL}/vehicles`, {
            cache: "no-store",
        });
        return await handleApiResponse(res);
    } catch (error) {
        console.error("Failed to fetch vehicles:", error);
        throw error;
    }
}

export async function fetchVehicleById(id: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
            cache: "no-store",
        });
        return await handleApiResponse(res);
    } catch (error) {
        console.error(`Failed to fetch vehicle with id ${id}:`, error);
        throw error;
    }
}
