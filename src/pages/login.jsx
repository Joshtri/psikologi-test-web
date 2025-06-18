import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service"; // pastikan path-nya benar

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { user, token } = await login(
        credentials.email,
        credentials.password
      );
      console.log("Login berhasil sebagai:", user);

      // Simpan token di localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // redirect sesuai role jika diperlukan
      navigate("/sys/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Login gagal.";
      setError(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Sistem Psikologi Test
        </h1>
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={credentials.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
