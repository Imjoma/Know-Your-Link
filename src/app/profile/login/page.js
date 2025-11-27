"use client";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    setLoading(true);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false, // Avoid redirect/page refresh
    });
    if (!res.ok) {
      // show error message
      console.log("Error sign in");
      setLoading(false);
    } else {
      router.push("/profile");
      setLoading(false);
    }
  };

  return (
    <div className="px-6">
      <button onClick={signOut}>Log out</button>
      <h1>Sign in to KYL</h1>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 border rounded-lg">
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
          "Don't have an account?
          <span className="ml-2 underline cursor-pointer">
            <Link href={"/profile/register"}>Sign up</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
