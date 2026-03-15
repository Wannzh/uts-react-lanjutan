import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../service/api";

export default function Layout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("Auth check failed:", error);
        if (location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/forbidden") {
          navigate("/forbidden");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, location.pathname]);

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  // If we are on public routes but somehow logged in, optionally redirect them to home
  // (We handle this mainly in router/auth guard, but placing it here is also fine)
  
  // If not logged in and trying to access protected route or non-public route
  if (!user && location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/forbidden") {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Navbar user={user} setUser={setUser} />
      <main className="flex-1 overflow-x-hidden pt-6 pb-12">
        <Outlet context={{ user }} />
      </main>
      <Footer />
    </div>
  );
}
