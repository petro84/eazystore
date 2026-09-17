import apiClient from "./apiClient";

export async function contactLoader() {
  try {
    const response = await apiClient.get("/contacts");
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch contact info. Please try again.",
      { status: error.response?.status || 500 },
    );
  }
}
