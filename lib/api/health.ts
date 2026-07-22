export interface HealthResponse {
    status: string;
    timestamp: string;
    detail?: string;
}

export async function checkBackend(): Promise<HealthResponse | null> {
    try {
        const response = await fetch("/api/health", {
            cache: "no-store",
        });

        if (!response.ok) {
            console.warn(`Health check returned ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.warn("Backend health check failed:", error);
        return null;
    }
}