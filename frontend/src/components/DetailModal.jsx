import { X, User, Hash, GraduationCap, Award, Activity, Trophy } from "lucide-react";

export default function DetailModal({ mhs, onClose }) {
  if (!mhs) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-surface-900 border border-white/[0.08] rounded-2xl shadow-2xl shadow-primary-500/10 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.08] bg-white/[0.02]">
          <h2 className="text-xl font-semibold text-white">Detail Mahasiswa</h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-surface-400 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary-500/25">
              {mhs.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">{mhs.name}</h3>
                {Number(mhs.ipk) >= 3.51 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Trophy className="w-3 h-3" />
                    Cum Laude
                  </span>
                )}
              </div>
              <p className="text-surface-400 text-sm font-mono mt-0.5">{mhs.nim}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-surface-800/50 border border-white/[0.05]">
              <div className="flex items-center gap-2 mb-1.5">
                <GraduationCap className="w-4 h-4 text-primary-400" />
                <span className="text-xs font-medium text-surface-400">Jurusan</span>
              </div>
              <p className="text-sm text-white font-medium">{mhs.jurusan}</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-800/50 border border-white/[0.05]">
              <div className="flex items-center gap-2 mb-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium text-surface-400">IPK</span>
              </div>
              <p className="text-sm text-white font-medium">{Number(mhs.ipk).toFixed(2)}</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-800/50 border border-white/[0.05]">
              <div className="flex items-center gap-2 mb-1.5">
                <Activity className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium text-surface-400">Status</span>
              </div>
              <div className="flex items-center mt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  mhs.isactive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}>
                  {mhs.isactive ? "Aktif" : "Non-Aktif"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-white/[0.01] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-surface-800 hover:bg-surface-700 text-white text-sm font-medium transition-colors border border-white/[0.05] hover:border-white/[0.1]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
