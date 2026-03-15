import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Users, UserCheck, UserX, ArrowRight, Activity, BookOpen, GraduationCap } from "lucide-react";
import api from "../service/api";

export default function Home() {
  const { user } = useOutletContext();
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/mahasiswa");
        const mahasiswaReq = res.data.mahasiswa;
        
        const total = mahasiswaReq.length;
        const active = mahasiswaReq.filter(m => m.isactive).length;
        
        setStats({
          total,
          active,
          inactive: total - active,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Mahasiswa",
      value: stats.total,
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      bgContent: "bg-blue-500/10",
      textColor: "text-blue-400"
    },
    {
      title: "Status Aktif",
      value: stats.active,
      icon: <UserCheck className="w-8 h-8" />,
      color: "from-emerald-500 to-emerald-600",
      bgContent: "bg-emerald-500/10",
      textColor: "text-emerald-400"
    },
    {
      title: "Status Non-Aktif",
      value: stats.inactive,
      icon: <UserX className="w-8 h-8" />,
      color: "from-red-500 to-red-600",
      bgContent: "bg-red-500/10",
      textColor: "text-red-400"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden animate-slide-up">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-surface-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-primary-200 text-sm font-medium mb-6 animate-fade-in delay-100">
              <SparkleIcon />
              Welcome to MhsDev Dashboard
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up delay-200">
              Halo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">{user?.username}</span> 👋
            </h1>
            
            <p className="text-lg text-primary-100/80 mb-8 max-w-2xl animate-fade-in delay-300">
              Kelola data mahasiswa dengan mudah, cepat, dan efisien. Pantau status akademik mahasiswa dalam satu dashboard interaktif.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-up delay-400">
              <Link 
                to="/mahasiswa" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-400 text-white font-semibold transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5"
              >
                Kelola Data Mahasiswa
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-40 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-float delay-200" />
      </section>

      {/* Stats Section */}
      <section>
        <div className="flex items-center gap-3 mb-6 animate-fade-in delay-200">
          <Activity className="w-6 h-6 text-primary-400" />
          <h2 className="text-2xl font-semibold text-white">Ringkasan Data</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, idx) => (
            <div 
              key={idx}
              className={`relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 hover:border-white/[0.1] transition-all duration-300 animate-slide-up`}
              style={{ animationDelay: `${(idx + 1) * 150}ms` }}
            >
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-surface-400 text-sm font-medium mb-1">{stat.title}</p>
                  <h3 className="text-4xl font-bold text-white">
                    {loading ? (
                      <span className="w-16 h-10 block bg-white/[0.05] rounded animate-pulse" />
                    ) : (
                      stat.value
                    )}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
              </div>
              
              {/* Background glow for card */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${stat.bgContent} rounded-full blur-2xl`} />
            </div>
          ))}
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-gradient-to-br from-surface-900 to-surface-800 border border-white/[0.05] p-8 relative overflow-hidden group animate-slide-up delay-400">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <BookOpen className="w-32 h-32 text-primary-500 transform rotate-12" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">Tentang Proyek</h3>
              <p className="text-surface-400 mb-6 max-w-sm">Pelajari lebih lanjut mengenai teknologi yang digunakan dalam pengembangan aplikasi ini.</p>
              <Link to="/about" className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1">
                Baca selengkapnya <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="rounded-2xl bg-gradient-to-br from-surface-900 to-surface-800 border border-white/[0.05] p-8 relative overflow-hidden group animate-slide-up delay-500">
             <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <GraduationCap className="w-32 h-32 text-emerald-500 transform -rotate-12" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">Kontak Pengembang</h3>
              <p className="text-surface-400 mb-6 max-w-sm">Informasi profil pengembang dan rincian pelatihan React Lanjutan MhsDev.</p>
              <Link to="/contact" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1">
                Lihat kontak <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M7 5H3"/>
    </svg>
  );
}
