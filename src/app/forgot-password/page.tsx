"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { set } from "mongoose";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onSubmit = async () => {
    setLoading(true);

    try {
      await axios.post("/api/users/forgot-password", {
        email,
      });
      toast.success("Reset password link sent to your email.");
    } catch (error: any) {
      console.log("Error in sending reset link email", error);
      toast.error(error.message || "Failed to send reset link. Try again.");
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        <h1 className="mb-8 text-3xl font-bold text-center text-white">
          Forgot Password
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
              value={email}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white  placeholder-gray-400 transition-colors"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={onSubmit}
              disabled={buttonDisabled}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </div>
      </div>

      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </div>
  );
}
