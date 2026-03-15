import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-950 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-3xl animate-pulse-ring pointer-events-none" />

      <div className="relative z-10 w-full max-w-md text-center animate-slide-up">
        <div className="w-24 h-24 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20 shadow-2xl shadow-red-500/20">
          <ShieldAlert className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-red-600 mb-4 tracking-tighter">
          403
        </h1>
        <h2 className="text-2xl font-bold text-white mb-3">Akses Ditolak</h2>
        <p className="text-surface-400 mb-10 max-w-sm mx-auto leading-relaxed">
          Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Silakan masuk dengan akun yang valid terlebih dahulu.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-surface-800 hover:bg-surface-700 text-surface-200 hover:text-white transition-colors border border-white/[0.05] hover:border-white/[0.1]"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
          <Link 
            to="/login"
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors shadow-lg shadow-primary-500/25"
          >
            <Home className="w-4 h-4" />
            Halaman Login
          </Link>
        </div>
      </div>
    </div>
  );
}
