import { useState, useEffect } from "react";
import { X, Save, User, Hash, GraduationCap, Award } from "lucide-react";

export default function MahasiswaForm({ mhs, onClose, onSubmit, submitting }) {
  const isEdit = !!mhs;
  
  const [form, setForm] = useState({
    name: "",
    nim: "",
    jurusan: "Teknik Informatika",
    ipk: "",
    isactive: true,
  });

  useEffect(() => {
    if (mhs) {
      setForm({
        name: mhs.name || "",
        nim: mhs.nim || "",
        jurusan: mhs.jurusan || "Teknik Informatika",
        ipk: mhs.ipk || "",
        isactive: mhs.isactive !== undefined ? mhs.isactive : true,
      });
    }
  }, [mhs]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === "checkbox" ? e.target.checked : value;
    setForm((prev) => ({ ...prev, [name]: finalValue === "true" ? true : finalValue === "false" ? false : finalValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      ipk: parseFloat(form.ipk),
      isActive: form.isactive // Mapping to backend property name expected
    });
  };

  const jurusanOptions = [
    "Teknik Informatika",
    "Sistem Informasi",
    "Teknik Komputer",
    "Manajemen Informatika",
    "Ilmu Komputer"
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-surface-900 border border-white/[0.08] rounded-2xl shadow-2xl shadow-primary-500/10 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.08] bg-white/[0.02]">
          <h2 className="text-xl font-semibold text-white">
            {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-surface-400 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div className="bg-primary-500/5 border border-primary-500/10 rounded-xl p-4 mb-2">
            <p className="text-sm text-primary-200 leading-relaxed font-medium">
              Silakan lengkapi formulir di bawah ini. Pastikan Nama dan NIM sudah benar sebelum menyimpan data.
            </p>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-bold text-surface-300 mb-2 block uppercase tracking-wide">Nama Lengkap</label>
            <div className="relative flex items-center rounded-xl border border-white/[0.08] bg-white/[0.02] focus-within:border-primary-500/50 focus-within:bg-primary-500/5 transition-all">
              <User className="w-4 h-4 ml-4 text-surface-500" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Contoh: Budi Santoso"
                required
                className="w-full px-3 py-3 bg-transparent text-white placeholder-surface-600 outline-none text-sm"
              />
            </div>
          </div>

          {/* NIM */}
          <div>
            <label className="text-xs font-medium text-surface-400 mb-1.5 block">NIM</label>
            <div className="relative flex items-center rounded-xl border border-white/[0.08] bg-white/[0.02] focus-within:border-primary-500/50 focus-within:bg-primary-500/5 transition-all">
              <Hash className="w-4 h-4 ml-4 text-surface-500" />
              <input
                type="text"
                name="nim"
                value={form.nim}
                onChange={handleChange}
                placeholder="Contoh: 123456789"
                required
                className="w-full px-3 py-3 bg-transparent text-white placeholder-surface-600 outline-none text-sm"
              />
            </div>
          </div>

          {/* Jurusan */}
          <div>
            <label className="text-xs font-medium text-surface-400 mb-1.5 block">Jurusan</label>
            <div className="relative flex items-center rounded-xl border border-white/[0.08] bg-white/[0.02] focus-within:border-primary-500/50 focus-within:bg-primary-500/5 transition-all pr-4">
              <GraduationCap className="w-4 h-4 ml-4 text-surface-500" />
              <select
                name="jurusan"
                value={form.jurusan}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 bg-transparent text-white outline-none text-sm appearance-none"
              >
                {jurusanOptions.map(opt => (
                  <option key={opt} value={opt} className="bg-surface-800">{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* IPK */}
          <div>
            <label className="text-xs font-medium text-surface-400 mb-1.5 block">IPK</label>
            <div className="relative flex items-center rounded-xl border border-white/[0.08] bg-white/[0.02] focus-within:border-primary-500/50 focus-within:bg-primary-500/5 transition-all">
              <Award className="w-4 h-4 ml-4 text-surface-500" />
              <input
                type="number"
                step="0.01"
                min="0"
                max="4"
                name="ipk"
                value={form.ipk}
                onChange={handleChange}
                placeholder="Contoh: 3.75"
                required
                className="w-full px-3 py-3 bg-transparent text-white placeholder-surface-600 outline-none text-sm"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-xs font-medium text-surface-400 mb-1.5 block">Status Mahasiswa</label>
            <div className="relative flex items-center rounded-xl border border-white/[0.08] bg-white/[0.02] focus-within:border-primary-500/50 focus-within:bg-primary-500/5 transition-all pr-4">
              <div className={`w-2 h-2 rounded-full ml-5 ${form.isactive ? "bg-emerald-500" : "bg-red-500"}`} />
              <select
                name="isactive"
                value={form.isactive}
                onChange={handleChange}
                className="w-full px-3 py-3 bg-transparent text-white outline-none text-sm appearance-none"
              >
                <option value={true} className="bg-surface-800">Aktif</option>
                <option value={false} className="bg-surface-800">Non-Aktif</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-surface-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary-500 hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all shadow-lg shadow-primary-500/20"
            >
              <Save className="w-4 h-4" />
              {submitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
