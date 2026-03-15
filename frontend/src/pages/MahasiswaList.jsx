import { useState, useEffect } from "react";
import { Plus, Search, CheckCircle2, XCircle, Award, Trophy, Users } from "lucide-react";
import api from "../service/api";
import { toast } from "react-hot-toast";
import MahasiswaTable from "../components/MahasiswaTable";
import MahasiswaForm from "../components/MahasiswaForm";
import DeleteModal from "../components/DeleteModal";
import DetailModal from "../components/DetailModal";

export default function MahasiswaList() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'active', 'inactive'
  
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);
  
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  
  const [showDelete, setShowDelete] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  
  const [submitting, setSubmitting] = useState(false);

  // Fetch data
  const fetchMahasiswa = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/mahasiswa");
      setMahasiswa(res.data.mahasiswa);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  // Filter data based on search and status
  const filteredData = mahasiswa.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.nim.includes(searchQuery);
    const matchesStatus = statusFilter === "all" ? true : statusFilter === "active" ? m.isactive : !m.isactive;
    return matchesSearch && matchesStatus;
  });

  // Statistics Calculation
  const totalMahasiswa = mahasiswa.length;
  const totalActive = mahasiswa.filter(m => m.isactive).length;
  const totalInactive = totalMahasiswa - totalActive;
  const avgIpk = totalMahasiswa > 0 
    ? (mahasiswa.reduce((acc, m) => acc + Number(m.ipk), 0) / totalMahasiswa).toFixed(2)
    : "0.00";
  const totalCumLaude = mahasiswa.filter(m => Number(m.ipk) >= 3.51).length;

  const statCards = [
    {
      title: "Total Mahasiswa",
      value: totalMahasiswa,
      icon: <Users className="w-6 h-6" />,
      color: "from-primary-500 to-primary-600",
      bgContent: "bg-primary-500/10",
      textColor: "text-primary-400"
    },
    {
      title: "Mahasiswa Aktif",
      value: totalActive,
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "from-emerald-500 to-emerald-600",
      bgContent: "bg-emerald-500/10",
      textColor: "text-emerald-400"
    },
    {
      title: "Mahasiswa Non-Aktif",
      value: totalInactive,
      icon: <XCircle className="w-6 h-6" />,
      color: "from-red-500 to-red-600",
      bgContent: "bg-red-500/10",
      textColor: "text-red-400"
    },
    {
      title: "Rata-rata IPK",
      value: avgIpk,
      icon: <Award className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      bgContent: "bg-blue-500/10",
      textColor: "text-blue-400"
    },
    {
      title: "Cum Laude",
      value: totalCumLaude,
      icon: <Trophy className="w-6 h-6" />,
      color: "from-amber-500 to-amber-600",
      bgContent: "bg-amber-500/10",
      textColor: "text-amber-400"
    }
  ];

  // Handlers for Detail
  const handleOpenDetail = (data) => {
    setDetailData(data);
    setShowDetail(true);
  };

  // Handlers for Form (Add/Edit)
  const handleOpenAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleOpenEdit = (data) => {
    setEditData(data);
    setShowForm(true);
  };

  const handleSubmitForm = async (formData) => {
    setSubmitting(true);
    try {
      if (editData) {
        await api.put(`/api/mahasiswa/${editData.id}`, formData);
        toast.success("Mahasiswa berhasil diperbarui!");
      } else {
        await api.post("/api/mahasiswa", formData);
        toast.success("Mahasiswa berhasil ditambahkan!");
      }
      setShowForm(false);
      fetchMahasiswa();
    } catch (error) {
      console.error("Failed to submit form", error);
      toast.error(error.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handlers for Delete
  const handleOpenDelete = (data) => {
    setDeleteData(data);
    setShowDelete(true);
  };

  const handleConfirmDelete = async (id) => {
    setSubmitting(true);
    try {
      await api.delete(`/api/mahasiswa/${id}`);
      toast.success("Mahasiswa berhasil dihapus!");
      setShowDelete(false);
      fetchMahasiswa();
    } catch (error) {
      console.error("Failed to delete data", error);
      toast.error(error.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handler for Toggle Status
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      // Optimistic update
      setMahasiswa(prev => prev.map(m => m.id === id ? { ...m, isactive: !currentStatus } : m));
      
      await api.patch(`/api/mahasiswa/${id}/status`, { isActive: !currentStatus });
      toast.success(`Status berhasil diubah menjadi ${!currentStatus ? 'Active' : 'Inactive'}!`);
    } catch (error) {
      console.error("Failed to toggle status", error);
      toast.error("Gagal mengubah status!");
      // Revert if failed
      fetchMahasiswa();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Daftar Mahasiswa</h1>
          <p className="text-surface-400 text-sm">Kelola informasi asisten dan anggota mahasiswa.</p>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-400 text-white text-sm font-semibold transition-all shadow-lg shadow-primary-500/20"
        >
          <Plus className="w-5 h-5" />
          Tambah Mahasiswa
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-4">
        {statCards.map((stat, idx) => (
          <div 
            key={idx}
            className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] p-5 hover:border-white/[0.1] transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${(idx + 1) * 100}ms` }}
          >
            <div className="flex flex-col gap-3 relative z-10">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                {loading ? (
                  <span className="w-12 h-8 block bg-white/[0.05] rounded animate-pulse" />
                ) : (
                  <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                )}
              </div>
              <p className="text-surface-400 text-xs font-medium">{stat.title}</p>
            </div>
            
            {/* Background glow for card */}
            <div className={`absolute -bottom-8 -right-8 w-24 h-24 ${stat.bgContent} rounded-full blur-2xl`} />
          </div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau NIM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-surface-900/50 border border-white/[0.08] focus:border-primary-500/50 rounded-xl text-sm text-white focus:bg-primary-500/5 outline-none transition-all placeholder-surface-500 backdrop-blur-sm"
          />
        </div>

        <div className="flex items-center gap-2 bg-surface-900/50 border border-white/[0.08] p-1 rounded-xl backdrop-blur-sm">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === "all" 
                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20" 
                : "text-surface-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === "active" 
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                : "text-surface-400 hover:text-emerald-400 hover:bg-emerald-400/5"
            }`}
          >
            Aktif
          </button>
          <button
            onClick={() => setStatusFilter("inactive")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === "inactive" 
                ? "bg-red-500 text-white shadow-lg shadow-red-500/20" 
                : "text-surface-400 hover:text-red-400 hover:bg-red-400/5"
            }`}
          >
            Non-Aktif
          </button>
        </div>
      </div>

      {/* Main Table */}
      <MahasiswaTable 
        mahasiswa={filteredData}
        loading={loading}
        onDetail={handleOpenDetail}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        onToggleStatus={handleToggleStatus}
      />

      {/* Modals */}
      {showDetail && (
        <DetailModal 
          mhs={detailData}
          onClose={() => setShowDetail(false)}
        />
      )}

      {showForm && (
        <MahasiswaForm 
          mhs={editData} 
          onClose={() => setShowForm(false)} 
          onSubmit={handleSubmitForm}
          submitting={submitting}
        />
      )}

      {showDelete && (
        <DeleteModal 
          mhs={deleteData} 
          onClose={() => setShowDelete(false)} 
          onConfirm={handleConfirmDelete}
          submitting={submitting}
        />
      )}
    </div>
  );
}
