"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/me");
        router.push(`/profile/${response.data.data._id}`);
      } catch (error: any) {
        console.log("Error fetching user details:", error);
      }
    };
    getUserDetails();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-4xl front-bold">This is common user profile</h1>
    </div>
  );
}
