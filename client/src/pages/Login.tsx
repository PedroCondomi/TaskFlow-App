import { useState } from "react";
import { loginRequest } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const setAuth = useAuthStore(s => s.setAuth);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      navigate("/tasks");
    } catch (e: any) {
      setError("Login inválido");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={submit}>Login</button>

      {error && <p>{error}</p>}
    </div>
  );
}
