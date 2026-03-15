import { AlertTriangle, Trash2 } from "lucide-react";

export default function DeleteModal({ mhs, onClose, onConfirm, submitting }) {
  if (!mhs) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-surface-900 border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden animate-slide-up text-center p-6">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Hapus Data?</h2>
        <p className="text-surface-300 text-lg mb-8 leading-relaxed">
          Apakah Anda yakin ingin menghapus data mahasiswa bernama <br />
          <span className="text-white font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10 italic">"{mhs.name}"</span>? <br />
          <span className="text-red-400 font-semibold mt-2 block">Tindakan ini tidak dapat dibatalkan!</span>
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            disabled={submitting}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-surface-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] rounded-xl transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => onConfirm(mhs.id)}
            disabled={submitting}
            className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all shadow-lg shadow-red-500/20"
          >
            {submitting ? (
              "Menghapus..."
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Hapus
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
