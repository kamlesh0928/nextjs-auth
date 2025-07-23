"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function UserProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    isAdmin: null,
    isVerified: null,
    username: "",
    __v: undefined,
    _id: "",
  });

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/");
    } catch (error: any) {
      console.log("Error occurred during logout:", error);
      toast.error(error.message || "Failed to logout");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUser(response.data.data);
      } catch (error: any) {
        console.log("Error fetching user data:", error);
        toast.error(error.message || "Failed to load user data");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      <h1 className="text-4xl font-bold">
        Welcome <span className="text-blue-500 italic">{user.username}</span>
      </h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Logout
      </button>

      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </div>
  );
}
