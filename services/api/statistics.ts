import { API_BASE_URL } from "@/config";
import { handleApiResponse } from "../common";

export async function fetchStatistics() {
    try {
        const res = await fetch(`${API_BASE_URL}/statistics`, {
            cache: "no-store",
        });
        return await handleApiResponse(res);
    } catch (error) {
        console.error("Failed to fetch statistics:", error);
        throw error;
    }
}
