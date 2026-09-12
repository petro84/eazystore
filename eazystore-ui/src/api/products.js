import apiClient from "./apiClient";

export async function productsLoader() {
  try {
    const response = await apiClient.get("/products");
    return response.data;
  } catch (err) {
    throw new Response(
      err.message || "Failed to fetch products. Please try again.",
      { status: err.status || 500 },
    );
  }
}
