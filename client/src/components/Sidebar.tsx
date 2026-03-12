import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Sidebar() {
  const navigate = useNavigate();
  const logout = useAuthStore(s => s.logout);
  const user = useAuthStore(s => s.user);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-60 bg-white border-r flex flex-col p-4 gap-6">
      {/* HEADER */}
      {/* HEADER */}
      <div className="space-y-2">
        {/* APP NAME */}
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
          TaskFlow
        </h2>

        {/* USER INFO */}
        <div className="flex items-center gap-2">
          {/* avatar placeholder */}
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-gray-800">
              {user?.name}
            </span>

            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-1">
        <button
          onClick={() => navigate("/dashboard")}
          className={`flex items-center px-3 py-2 text-sm rounded-md transition
            ${
              location.pathname === "/dashboard"
                ? "bg-gray-100 font-medium"
                : "hover:bg-gray-100"
            }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/teams")}
          className={`flex items-center px-3 py-2 text-sm rounded-md transition
            ${
              location.pathname === "/teams"
                ? "bg-gray-100 font-medium"
                : "hover:bg-gray-100"
            }`}
        >
          Teams
        </button>
      </nav>

      {/* LOGOUT */}
      <div className="pt-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
