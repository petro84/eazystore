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
    throw new Response(err.message || "Failed to submit contact form.", {
      status: 500,
    });
  }
}
