import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../service/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ gmail: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/auth/login", form);
      if (res.data.user) {
        toast.success("Berhasil masuk!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Terjadi kesalahan saat login.");
      setError(err.response?.data?.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-surface-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-900/30 via-surface-950 to-primary-800/20 animate-gradient" />
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-float delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-slide-up">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/20">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 mb-4 shadow-lg shadow-primary-500/25">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Selamat Datang</h1>
            <p className="text-surface-400 text-sm">Masuk ke akun kamu untuk melanjutkan</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 animate-fade-in">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Gmail */}
            <div className={`group relative animate-fade-in delay-100`}>
              <label className={`text-xs font-medium mb-1.5 block transition-colors duration-300 ${focusedField === "gmail" ? "text-primary-400" : "text-surface-400"}`}>
                Alamat Email
              </label>
              <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${focusedField === "gmail" ? "border-primary-500/50 bg-primary-500/5 shadow-lg shadow-primary-500/10" : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]"}`}>
                <Mail className={`w-5 h-5 ml-4 transition-colors duration-300 ${focusedField === "gmail" ? "text-primary-400" : "text-surface-500"}`} />
                <input
                  type="email"
                  name="gmail"
                  id="login-gmail"
                  value={form.gmail}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("gmail")}
                  onBlur={() => setFocusedField("")}
                  placeholder="nama@email.com"
                  required
                  className="w-full px-4 py-3 bg-transparent text-white placeholder-surface-500 outline-none text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className={`group relative animate-fade-in delay-200`}>
              <label className={`text-xs font-medium mb-1.5 block transition-colors duration-300 ${focusedField === "password" ? "text-primary-400" : "text-surface-400"}`}>
                Kata Sandi
              </label>
              <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${focusedField === "password" ? "border-primary-500/50 bg-primary-500/5 shadow-lg shadow-primary-500/10" : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]"}`}>
                <Lock className={`w-5 h-5 ml-4 transition-colors duration-300 ${focusedField === "password" ? "text-primary-400" : "text-surface-500"}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="login-password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Masukkan kata sandi"
                  required
                  className="w-full px-4 py-3 bg-transparent text-white placeholder-surface-500 outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-4 text-surface-500 hover:text-surface-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <div className="animate-fade-in delay-300">
              <button
                type="submit"
                id="login-submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6 animate-fade-in delay-400">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-surface-500 text-xs">atau</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Register link */}
          <div className="text-center animate-fade-in delay-400">
            <p className="text-surface-400 text-sm">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-primary-400 hover:text-primary-300 font-semibold transition-colors duration-300 hover:underline underline-offset-4"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
