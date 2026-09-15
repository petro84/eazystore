import apiClient from "./apiClient.js";

export async function adminOrdersLoader() {
    try {
        const response = await apiClient.get('/admin/orders');
        return response.data;
    } catch (error) {
        throw new Response(
            error.response?.data?.errorMsg ||
            error.message ||
            "Failed to fetch orders. Please try again.",
            { status: error.status || 500 }
        );
    }
}