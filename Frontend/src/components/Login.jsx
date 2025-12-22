import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
   const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await axios.post(
        "http://localhost:4001/user/login",
        userInfo
      );

      // Show toast
      toast.success("Login successful!");

      // Save user info
      setAuthUser(res.data.user);
      localStorage.setItem("users", JSON.stringify(res.data.user));

      // Close modal if open
      document.getElementById("my_modal_3")?.close();

      // Redirect to home page after a short delay (to let toast show)
      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box relative">

        {/* ❌ Close */}
        <button
          type="button"
          onClick={() => document.getElementById("my_modal_3")?.close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4 text-center">Login</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label>Email</label>
            <input
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-error text-sm">Email is required</p>
            )}
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-error text-sm">Password is required</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button className="btn btn-secondary">Login</button>
            <p>
              Not registered?{" "}
              <Link
                to="/signup"
                onClick={() =>
                  document.getElementById("my_modal_3")?.close()
                }
                className="text-blue-500 underline"
              >
                Signup
              </Link>
            </p>
          </div>

        </form>
      </div>
    </dialog>
  );
};

export default Login;
