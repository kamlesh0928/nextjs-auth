"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const handleVerifyEmail = async () => {
    try {
      await axios.post("/api/users/verify-email", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const urlParams = window.location.search.split("=")[1];
    setToken(urlParams || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      handleVerifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-gray-200 text-black">
        {token ? `Token: ${token}` : "No token found"}
      </h2>
      {verified && (
        <h2 className="p-2 bg-green-200 text-black">
          Email verified successfully!
          <Link href="/login" className="text-blue-500 underline">
            Go to Login
          </Link>
        </h2>
      )}{" "}
      {error && (
        <h2 className="p-2 bg-red-200 text-black">
          Error verifying email. Please try again.
        </h2>
      )}{" "}
      {!verified && !error && (
        <h2 className="p-2 bg-yellow-200 text-black">
          Verifying your email...
        </h2>
      )}
    </div>
  );
}
