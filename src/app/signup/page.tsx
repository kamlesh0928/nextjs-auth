"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error: any) {
      console.log("Error occurred during signup:", error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Create Your Account
        </h1>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={user.username}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-colors"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              required
            />
          </div>

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
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-colors"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <button
              type="button"
              onClick={onSignup}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
              disabled={buttonDisabled}
            >
              {loading ? "Signing" : "Sign Up"}
            </button>
          </div>

          <div className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-400 hover:underline font-medium"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </div>
  );
}
