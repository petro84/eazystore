import apiClient from "./apiClient";

export async function messagesLoader() {
  try {
    const response = await apiClient.get("/admin/messages");
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMsg ||
        error.message ||
        "Failed to fetch messages. Please try again.",
      { status: error.status || 500 },
    );
  }
}