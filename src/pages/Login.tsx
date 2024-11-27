import React from "react";
import { FiPhone, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../hook/useAxios";
import { API_URL } from "../hook/useEnv";

type FieldType = {
  phone_number?: string;
  password?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const onFinish = async (values: FieldType) => {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/auth/sign-in`,
        values
      );

      if (response?.data?.data?.tokens?.access_token) {
        localStorage.setItem(
          "access_token",
          response?.data?.data?.tokens?.access_token
        );
        console.log("Login successful!");
        window.location.reload();
        values.password = "";
        values.phone_number = "";
        navigate("/");
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.error("User not found. Redirecting to sign-up.");
        alert("No account found. Please sign up first.");
        navigate("/sign-up");
      } else {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const values = Object.fromEntries(formData.entries()) as FieldType;
          onFinish(values);
        }}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        {/* Phone Number Input */}
        <div className="mb-5">
          <label
            htmlFor="phone_number"
            className="block text-gray-700 font-medium mb-2"
          >
            Phone Number
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-3 text-gray-500" />
            <input
              autoComplete="off"
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="+998 xx xxx xx xx"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              pattern="^\+998 \d{2} \d{3} \d{2} \d{2}$"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-500" />
            <input
              autoComplete="off"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>

        {/* Links */}
        <div className="mt-5 flex justify-between text-sm text-gray-600">
          <Link
            to="/forget-password"
            className="hover:underline hover:text-blue-500"
          >
            Forgot Password?
          </Link>
          <Link to="/sign-up" className="hover:underline hover:text-blue-500">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
