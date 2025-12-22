import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✅ async submit function
  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:4001/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Message sent successfully 📩");
        reset(); // clear form
      } else {
        toast.error("Failed to send message 😕");
      }
    } catch (error) {
      toast.error("Server error 🚨");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-md bg-base-200 border border-base-300 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-base-content">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-error mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-error mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              placeholder="Message"
              rows={4}
              className="textarea textarea-bordered w-full resize-none"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <p className="text-sm text-error mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-secondary w-full text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
