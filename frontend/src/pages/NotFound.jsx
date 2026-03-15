import { Link } from "react-router-dom";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-950 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl animate-pulse-ring pointer-events-none" />

      <div className="relative z-10 w-full max-w-md text-center animate-slide-up">
        <div className="w-24 h-24 bg-surface-800 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/[0.05] shadow-2xl">
          <FileQuestion className="w-12 h-12 text-surface-400" />
        </div>
        
        <h1 className="text-8xl font-black text-white mb-4 tracking-tighter mix-blend-overlay">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mb-3">Halaman Tidak Ditemukan</h2>
        <p className="text-surface-400 mb-10 max-w-sm mx-auto leading-relaxed">
          Sepertinya Anda tersesat. Halaman yang Anda cari tidak ada atau telah dipindahkan ke URL lain.
        </p>
        
        <Link 
          to="/"
          className="inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold transition-all shadow-lg shadow-primary-500/25 hover:-translate-y-0.5"
        >
          <Home className="w-5 h-5" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
