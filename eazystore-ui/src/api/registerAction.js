import apiClient from "./apiClient";

export async function registerAction({ request }) {
  const data = await request.formData();

  const registerData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    password: data.get("password"),
  };

  try {
    await apiClient.post("/auth/register", registerData);
    return { success: true };
  } catch (err) {
    if (err.response?.status === 400) {
      return { success: false, errors: err.response?.data };
    }
    throw new Response(
      err.response?.data?.errorMessage ||
        err.message ||
        "Failed to submit your register your account. Please try again.",
      { status: err.response?.status || 500 },
    );
  }
}
