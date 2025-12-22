import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Signup = () => {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      };

      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      toast.success("Signup successful!");
      setAuthUser(res.data.user);
      localStorage.setItem("users", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative border rounded-lg p-6 w-96 shadow-md bg-base-100">

        {/* Close */}
        <button
          onClick={() => navigate("/")}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4 text-center">Signup</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              className="input input-bordered w-full"
              {...register("fullname", { required: true })}
            />
            {errors.fullname && (
              <p className="text-error text-sm mt-1">
                Full Name is required
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-error text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-error text-sm">{errors.password.message}</p>
            )}
          </div>

          <button className="btn btn-secondary w-full">
            Signup
          </button>

          {/* Login Link */}
          <p className="text-center text-sm mt-3">
            Already registered?{" "}
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document.getElementById("my_modal_3")?.showModal();
                }, 100);
              }}
            >
              Login
            </button>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;
