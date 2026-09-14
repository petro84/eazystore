import apiClient from "./apiClient";

export async function profileLoader() {
  try {
    const response = await apiClient.get("/profile");
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch profile data. Try again later.",
      { status: error.response?.status || 500 },
    );
  }
}
