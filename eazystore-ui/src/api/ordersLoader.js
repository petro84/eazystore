import apiClient from "./apiClient";

export async function ordersLoader() {
  try {
    const response = await apiClient.get("/orders");
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMsg ||
        error.message ||
        "Failed to fetch customer orders. Please try again.",
      { status: error.status || 500 },
    );
  }
}