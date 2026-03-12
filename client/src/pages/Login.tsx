import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { useRegister } from "../hooks/useRegister";

export default function Login() {
  const setAuth = useAuthStore(s => s.setAuth);
  const navigate = useNavigate();

  const registerMutation = useRegister();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const data = await loginRequest(email, password);

      setAuth(data.token, {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      });

      navigate("/dashboard");
    } catch (e: any) {
      setError("Incorrect email or password");
    }
  };

  const register = async () => {
    try {
      await registerMutation.mutateAsync({
        name,
        email: regEmail,
        password: regPassword,
        adminSecret,
      });

      alert("User created!");
    } catch {
      alert("Could not register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Task Flow</h1>

        {/* LOGIN */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Login</h2>

          <div className="flex flex-col gap-3">
            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button
              onClick={submit}
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Login
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>

        {/* REGISTER */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Register</h2>

          <div className="flex flex-col gap-3">
            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              type="email"
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
            />

            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              type="password"
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)}
            />

            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Admin secret (optional)"
              value={adminSecret}
              onChange={e => setAdminSecret(e.target.value)}
            />

            <button
              onClick={register}
              className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
