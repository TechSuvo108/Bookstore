import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthUser(null);              // ✅ clear auth state
    localStorage.removeItem("users"); // ✅ correct key
    toast.success("Logout successful");
    navigate("/");                  // ✅ go home
  };

  return (
    <button
      className="px-3 py-2 bg-red-500 text-white rounded-md"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
