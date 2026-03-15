import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Github, Mail, Linkedin, MapPin, Phone, GraduationCap } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: "Beranda", path: "/" },
    { name: "Mahasiswa", path: "/mahasiswa" },
    { name: "Tentang", path: "/about" },
    { name: "Kontak", path: "/contact" },
  ];

  return (
    <footer className="w-full border-t border-white/[0.08] bg-surface-950/40 backdrop-blur-2xl mt-auto pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <span className="text-xl font-bold text-white tracking-tight">MhsDev</span>
            </div>
            <p className="text-surface-400 text-sm leading-relaxed max-w-xs">
              Sistem manajemen data mahasiswa yang cerdas dan responsif. Mempermudah pengelolaan informasi akademik dengan antarmuka modern yang ramah pengguna.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-lg text-surface-400 hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-lg text-surface-400 hover:text-blue-400 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:alwan@example.com" className="p-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-lg text-surface-400 hover:text-rose-400 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">Navigasi Cepat</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-surface-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500/20 group-hover:bg-primary-500 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Pelatihan */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">Informasi Pelatihan</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-primary-400 shrink-0" />
                <div className="space-y-1">
                  <p className="text-white text-sm font-medium">React Lanjutan</p>
                  <p className="text-surface-500 text-xs">Pelatihan & Sertifikasi</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 text-lg font-bold">UTS</span>
                </div>
                <div className="space-y-1">
                  <p className="text-white text-sm font-medium">Ujian Tengah Semester</p>
                  <p className="text-surface-500 text-xs">Tahun Akademik 2026</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Developer Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">Pengembang</h4>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold">
                  A
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Alwan</p>
                  <p className="text-surface-500 text-[11px] uppercase tracking-tighter">Fullstack Dev</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-white/[0.05]">
                <p className="text-surface-400 text-[11px] leading-relaxed italic">
                  "Membangun solusi digital yang elegan dan efisien."
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-surface-500 text-xs font-medium">
            &copy; {currentYear} MhsDev. Seluruh hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-8">
            <p className="text-surface-500 text-xs cursor-help hover:text-surface-300 transition-colors">Syarat & Ketentuan</p>
            <p className="text-surface-500 text-xs cursor-help hover:text-surface-300 transition-colors">Kebijakan Privasi</p>
            <p className="text-surface-500 text-xs font-mono">v1.2.4-stable</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
