import { useEffect, useRef } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
  useLoaderData,
} from "react-router-dom";
import { toast } from "react-toastify";

import PageTitle from "./PageTitle";

export default function Contact() {
  const contactInfo = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const formRef = useRef(null);
  const submit = useSubmit();

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";
  const isSubmitting = navigation.state === "submitting";

  const handleSubmit = (event) => {
    event.preventDefault();

    const userConfirmed = window.confirm(
      "Are you sure you want to submit the form?",
    );

    if (userConfirmed) {
      const formData = new FormData(formRef.current);
      submit(formData, { method: "POST" });
    } else {
      toast.info("Form submission cancelled.");
    }
  };

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success("Your message has been sent successfully.");
    }
  }, [actionData]);

  return (
    <div className="max-w-6xl min-h-213 mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
      <PageTitle title="Contact Us" />

      <p className="max-w-3xl mx-auto mt-8 text-gray-600 dark:text-lighter mb-8 text-center">
        We'd love to hear from you! If you have any questions, feedback, or
        suggestions, please don't hesitate to reach out.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-238 mx-auto mt-8">
        <div className="text-primary dark:text-light p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
          {contactInfo && (
            <>
              <p className="mb-4">
                <strong>Phone:</strong> {contactInfo.phone}
              </p>
              <p className="mb-4">
                <strong>Email:</strong> {contactInfo.email}
              </p>
              <p className="mb-4">
                <strong>Address:</strong> {contactInfo.address}
              </p>
            </>
          )}
        </div>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          method="POST"
          className="space-y-6 max-w-3xl mx-auto"
        >
          <div>
            <label htmlFor="name" className={labelStyle}>
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              id="name"
              className={textFieldStyle}
              required
              minLength={5}
              maxLength={30}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                className={textFieldStyle}
                required
              />
            </div>

            <div>
              <label htmlFor="mobileNumber" className={labelStyle}>
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                required
                pattern="^\d{10}$"
                title="Mobile number must be exactly 10 digits"
                placeholder="Your Mobile Number"
                className={textFieldStyle}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className={labelStyle}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Your Message"
              className={textFieldStyle}
              required
              minLength={5}
              maxLength={500}
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
