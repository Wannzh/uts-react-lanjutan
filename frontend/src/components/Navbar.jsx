import { Link, useLocation, useNavigate } from "react-router-dom";
import { Users, LayoutDashboard, Info, Mail, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import api from "../service/api";

export default function Navbar({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "Mahasiswa", path: "/mahasiswa", icon: <Users className="w-4 h-4" /> },
    { name: "About", path: "/about", icon: <Info className="w-4 h-4" /> },
    { name: "Contact", path: "/contact", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-surface-950/80 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold tracking-wide">MhsDev</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary-400"
                        : "text-surface-400 hover:text-white"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* User & Logout */}
            <div className="flex items-center gap-4 border-l border-white/[0.08] pl-6">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-white">
                  {user?.username}
                </span>
                <span className="text-xs text-surface-500">{user?.gmail}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-surface-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-surface-400 hover:text-white p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-surface-900 absolute w-full left-0">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {/* User Info Mobile */}
            <div className="px-3 py-3 border-b border-white/[0.08] mb-2">
              <p className="text-sm font-semibold text-white">{user?.username}</p>
              <p className="text-xs text-surface-500">{user?.gmail}</p>
            </div>

            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-500/10 text-primary-400"
                      : "text-surface-400 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors mt-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
