import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, UserPlus, Check, X } from "lucide-react";
import api from "../service/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const passwordStrength = useMemo(() => {
    const p = form.password;
    if (!p) return { score: 0, label: "", color: "" };
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    if (score <= 1) return { score: 1, label: "Lemah", color: "bg-red-500" };
    if (score <= 2) return { score: 2, label: "Cukup", color: "bg-orange-500" };
    if (score <= 3) return { score: 3, label: "Baik", color: "bg-yellow-500" };
    if (score <= 4) return { score: 4, label: "Kuat", color: "bg-green-500" };
    return { score: 5, label: "Sangat Kuat", color: "bg-emerald-500" };
  }, [form.password]);

  const passwordChecks = useMemo(() => {
    const p = form.password;
    return [
      { label: "Minimal 6 karakter", passed: p.length >= 6 },
      { label: "Huruf besar", passed: /[A-Z]/.test(p) },
      { label: "Angka", passed: /[0-9]/.test(p) },
      { label: "Karakter spesial", passed: /[^A-Za-z0-9]/.test(p) },
    ];
  }, [form.password]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/api/auth/register", form);
      setSuccess(res.data.message || "Registrasi berhasil!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-surface-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-800/20 via-surface-950 to-primary-900/30 animate-gradient" />
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-float delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-slide-up">
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/20">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 mb-4 shadow-lg shadow-primary-500/25">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Buat Akun</h1>
            <p className="text-surface-400 text-sm">Daftar untuk memulai perjalananmu</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 animate-fade-in">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 animate-fade-in">
              <p className="text-emerald-400 text-sm text-center">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="animate-fade-in delay-100">
              <label className={`text-xs font-medium mb-1.5 block transition-colors duration-300 ${focusedField === "name" ? "text-primary-400" : "text-surface-400"}`}>
                Nama Lengkap
              </label>
              <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${focusedField === "name" ? "border-primary-500/50 bg-primary-500/5 shadow-lg shadow-primary-500/10" : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]"}`}>
                <User className={`w-5 h-5 ml-4 transition-colors duration-300 ${focusedField === "name" ? "text-primary-400" : "text-surface-500"}`} />
                <input
                  type="text"
                  name="name"
                  id="register-name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Masukkan nama lengkap"
                  required
                  className="w-full px-4 py-3.5 bg-transparent text-white placeholder-surface-500 outline-none text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="animate-fade-in delay-200">
              <label className={`text-xs font-medium mb-1.5 block transition-colors duration-300 ${focusedField === "email" ? "text-primary-400" : "text-surface-400"}`}>
                Email
              </label>
              <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${focusedField === "email" ? "border-primary-500/50 bg-primary-500/5 shadow-lg shadow-primary-500/10" : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]"}`}>
                <Mail className={`w-5 h-5 ml-4 transition-colors duration-300 ${focusedField === "email" ? "text-primary-400" : "text-surface-500"}`} />
                <input
                  type="email"
                  name="email"
                  id="register-email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  placeholder="nama@email.com"
                  required
                  className="w-full px-4 py-3.5 bg-transparent text-white placeholder-surface-500 outline-none text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="animate-fade-in delay-300">
              <label className={`text-xs font-medium mb-1.5 block transition-colors duration-300 ${focusedField === "password" ? "text-primary-400" : "text-surface-400"}`}>
                Password
              </label>
              <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${focusedField === "password" ? "border-primary-500/50 bg-primary-500/5 shadow-lg shadow-primary-500/10" : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]"}`}>
                <Lock className={`w-5 h-5 ml-4 transition-colors duration-300 ${focusedField === "password" ? "text-primary-400" : "text-surface-500"}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="register-password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Buat password yang kuat"
                  required
                  className="w-full px-4 py-3.5 bg-transparent text-white placeholder-surface-500 outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-4 text-surface-500 hover:text-surface-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password strength indicator */}
              {form.password && (
                <div className="mt-3 space-y-2 animate-fade-in">
                  {/* Strength bar */}
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                          level <= passwordStrength.score
                            ? passwordStrength.color
                            : "bg-white/[0.06]"
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${passwordStrength.color.replace("bg-", "text-")}`}>
                    {passwordStrength.label}
                  </p>

                  {/* Password checks */}
                  <div className="grid grid-cols-2 gap-1.5 mt-1">
                    {passwordChecks.map((check) => (
                      <div key={check.label} className="flex items-center gap-1.5">
                        {check.passed ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-surface-600" />
                        )}
                        <span className={`text-xs ${check.passed ? "text-emerald-400" : "text-surface-600"}`}>
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit button */}
            <div className="animate-fade-in delay-400">
              <button
                type="submit"
                id="register-submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Daftar</span>
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

          {/* Login link */}
          <div className="text-center animate-fade-in delay-400">
            <p className="text-surface-400 text-sm">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-primary-400 hover:text-primary-300 font-semibold transition-colors duration-300 hover:underline underline-offset-4"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
