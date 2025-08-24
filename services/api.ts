// services/api.ts
const BASE_URL = "https://case-study-26cf.onrender.com/api";

async function handleResponse(res: Response) {
    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

export async function fetchVehicles() {
    try {
        const res = await fetch(`${BASE_URL}/vehicles`, { cache: "no-store" });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch vehicles:", error);
        throw error;
    }
}

export async function fetchVehicleById(id: string) {
    try {
        const res = await fetch(`${BASE_URL}/vehicles/${id}`, {
            cache: "no-store",
        });
        return await handleResponse(res);
    } catch (error) {
        console.error(`Failed to fetch vehicle with id ${id}:`, error);
        throw error;
    }
}

export async function fetchStatistics() {
    try {
        const res = await fetch(`${BASE_URL}/statistics`, {
            cache: "no-store",
        });
        return await handleResponse(res);
    } catch (error) {
        console.error("Failed to fetch statistics:", error);
        throw error;
    }
}
