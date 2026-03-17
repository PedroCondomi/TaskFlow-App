import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { useRegister } from "../hooks/useRegister";
import { useLanguageStore } from "../store/languageStore";
import { useTranslation } from "../hooks/useTranslation";

export default function Login() {
  const setAuth = useAuthStore(s => s.setAuth);
  const setLanguage = useLanguageStore(s => s.setLanguage);
  const language = useLanguageStore(s => s.language);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        <h1 className="text-2xl font-bold text-center mb-6">TaskFlow</h1>

        {/* LOGIN */}
        <div className="mb-8">
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setLanguage("en")}
              className={`text-xs px-2 py-1 rounded ${
                language === "en" ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => setLanguage("es")}
              className={`text-xs px-2 py-1 rounded ${
                language === "es" ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              ES
            </button>
          </div>
          <h2 className="text-lg font-semibold mb-4">{t("login.login")}</h2>

          <div className="flex flex-col gap-3">
            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t("login.email")}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t("login.password")}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button
              onClick={submit}
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              {t("login.login")}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>

        {/* REGISTER */}
        <div>
          <h2 className="text-lg font-semibold mb-4">{t("login.register")}</h2>

          <div className="flex flex-col gap-3">
            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t("login.name")}
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t("login.email")}
              type="email"
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
            />

            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t("login.password")}
              type="password"
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)}
            />

            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t("login.adminsecret")}
              value={adminSecret}
              onChange={e => setAdminSecret(e.target.value)}
            />

            <button
              onClick={register}
              className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            >
              {t("login.register")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
