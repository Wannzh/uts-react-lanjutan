import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
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

  // Filter data based on search
  const filteredData = mahasiswa.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.nim.includes(searchQuery)
  );

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

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
        <input
          type="text"
          placeholder="Cari berdasarkan nama atau NIM..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-surface-900/50 border border-white/[0.08] focus:border-primary-500/50 rounded-xl text-sm text-white focus:bg-primary-500/5 outline-none transition-all placeholder-surface-500 backdrop-blur-sm"
        />
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
