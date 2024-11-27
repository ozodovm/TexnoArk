import React from "react";
import { FiUser, FiPhone, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../hook/useAxios";
import { API_URL } from "../hook/useEnv";

type FieldType = {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  password?: string;
};
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const onFinish = async (values: FieldType) => {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/auth/admin/sign-up`,
        values
      );
      console.log(response);
      alert("Signup successful! Redirecting to login.");
      values.first_name = "";
      values.last_name = "";
      values.phone_number = "";
      values.email = "";
      values.password = "";
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const values = Object.fromEntries(formData.entries()) as FieldType;
          onFinish(values);
        }}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <div className="mb-5">
          <label
            htmlFor="first_name"
            className="block text-gray-700 font-medium mb-2"
          >
            First Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Enter your first name"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="last_name"
            className="block text-gray-700 font-medium mb-2"
          >
            Last Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-500" />
            <input
              autoComplete="off"
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Enter your last name"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
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
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-500" />
            <input
              autoComplete="off"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
        <div className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="hover:underline hover:text-blue-500">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
