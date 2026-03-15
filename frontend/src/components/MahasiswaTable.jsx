import { Edit2, Trash2, CheckCircle2, XCircle, LayoutGrid, Eye } from "lucide-react";

export default function MahasiswaTable({ mahasiswa, onDetail, onEdit, onDelete, onToggleStatus, loading }) {
  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
          <p className="text-surface-400 text-sm">Memuat data mahasiswa...</p>
        </div>
      </div>
    );
  }

  if (mahasiswa.length === 0) {
    return (
      <div className="w-full text-center py-16 px-4 border border-dashed border-white/[0.1] rounded-2xl bg-surface-900/50">
        <div className="w-16 h-16 bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <LayoutGrid className="w-8 h-8 text-surface-400" />
        </div>
        <h3 className="text-lg font-medium text-white mb-1">Belum ada data</h3>
        <p className="text-surface-400 text-sm max-w-sm mx-auto">Mulai tambahkan data mahasiswa dengan menekan tombol "Tambah Mahasiswa" di atas.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-surface-900/80 backdrop-blur-xl">
      <table className="w-full text-left text-sm text-surface-300">
        <thead className="text-xs uppercase bg-white/[0.03] text-surface-400 border-b border-white/[0.08]">
          <tr>
            <th className="px-6 py-4 font-semibold tracking-wider">Nama & NIM</th>
            <th className="px-6 py-4 font-semibold tracking-wider">Jurusan</th>
            <th className="px-6 py-4 font-semibold tracking-wider">IPK</th>
            <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
            <th className="px-6 py-4 font-semibold tracking-wider text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {mahasiswa.map((mhs, idx) => (
            <tr 
              key={mhs.id} 
              className="hover:bg-white/[0.02] transition-colors group animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-white group-hover:text-primary-400 transition-colors">{mhs.name}</span>
                  <span className="text-xs text-surface-500 mt-0.5 font-mono">{mhs.nim}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-surface-800 text-surface-300 border border-white/[0.05]">
                  {mhs.jurusan}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 font-medium">
                  <span className={`${parseFloat(mhs.ipk) >= 3.5 ? 'text-emerald-400' : parseFloat(mhs.ipk) >= 3.0 ? 'text-blue-400' : 'text-amber-400'}`}>
                    {Number(mhs.ipk).toFixed(2)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onToggleStatus(mhs.id, mhs.isactive)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                    mhs.isactive
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30"
                      : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30"
                  }`}
                  title={`Klik untuk ubah menjadi ${mhs.isactive ? 'Inactive' : 'Active'}`}
                >
                  {mhs.isactive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {mhs.isactive ? "Active" : "Inactive"}
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => onDetail(mhs)}
                    className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 rounded-lg transition-colors border border-blue-500/20 hover:border-blue-500/30"
                    title="Detail Mahasiswa"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(mhs)}
                    className="p-2 bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-white rounded-lg transition-colors border border-white/[0.05] hover:border-white/[0.1]"
                    title="Edit Data"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(mhs)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors border border-red-500/20 hover:border-red-500/30"
                    title="Hapus Data"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
