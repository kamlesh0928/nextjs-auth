"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successfully");
      router.push("/");
    } catch (error: any) {
      console.log("Error occurred during login:", error);
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        <h1 className="mb-8 text-3xl font-bold text-center text-white">
          Login
        </h1>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-colors"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={user.password}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-colors"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              onClick={onLogin}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
              disabled={buttonDisabled}
            >
              {loading ? "logging" : "Login"}
            </button>
          </div>

          <div className="text-center text-sm  text-gray-400">
            Do not have account?{" "}
            <Link
              href="/signup"
              className="text-blue-400 hove:underline font-medium"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </div>
  );
}
