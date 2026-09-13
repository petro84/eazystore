import apiClient from "./apiClient";

export async function loginAction({ request }) {
  const data = await request.formData();

  const loginData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  try {
    const response = await apiClient.post("/auth/login", loginData);
    const { message, user, jwtToken } = response.data;
    return { success: true, message, user, jwtToken };
  } catch (err) {
    if (err.response?.status === 401) {
      return {
        success: false,
        errors: { message: "Invalid username or password" },
      };
    }
    throw new Response(
      err.response?.data?.message ||
        err.message ||
        "Failed to login. Please try again",
      { status: err.response?.status || 500 },
    );
  }
}
