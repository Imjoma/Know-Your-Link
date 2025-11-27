"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    try {
      setLoading(true);
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        throw new Error("Failed to login");
      }
      const data = await res.json();
      console.log(data);
      router.push("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6">
      <h1>Sign in to KYL</h1>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 border rounded-lg">
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          {loading ? "..." : "Submit"}
        </button>
        <div>
          Already have an account?
          <span className="ml-2 underline cursor-pointer">
            <Link href={"/profile/login"}>Sign In</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
