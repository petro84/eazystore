import apiClient from "./apiClient";

export async function contactAction({ request }) {
  const data = await request.formData();
  const contactData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    message: data.get("message"),
  };

  try {
    await apiClient.post("/contacts", contactData);
    return { success: true };
  } catch (err) {
    if (err.response?.status === 400) {
      return { success: false, errors: err.response?.data };
    }
    throw new Response(
      err.response?.data.errorMessage ||
        err.messge ||
        "Failed to submit contact form.",
      {
        status: 500,
      },
    );
  }
}
