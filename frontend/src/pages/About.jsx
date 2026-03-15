import { Info, Code2, Database, LayoutTemplate, ShieldCheck } from "lucide-react";

export default function About() {
  const techStack = [
    {
      category: "Frontend",
      icon: <LayoutTemplate className="w-5 h-5 text-blue-400" />,
      items: ["React 19", "Vite 8", "TailwindCSS v4", "React Router v7", "Lucide Icons", "Axios"]
    },
    {
      category: "Backend",
      icon: <Code2 className="w-5 h-5 text-emerald-400" />,
      items: ["Node.js", "Express 5", "JSON Web Tokens (JWT)", "Cookie Parser"]
    },
    {
      category: "Database & Security",
      icon: <Database className="w-5 h-5 text-purple-400" />,
      items: ["PostgreSQL", "Argon2 Hashing", "HTTP-Only Cookies", "CORS"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-12">
      <div className="text-center space-y-4 animate-slide-up">
        <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
          <Info className="w-8 h-8 text-primary-400 transform -rotate-3" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">Tentang Proyek</h1>
        <p className="text-lg text-surface-400 max-w-2xl mx-auto">
          MhsDev adalah aplikasi purwarupa Sistem Kelola Data Mahasiswa yang dibangun dengan arsitektur Full-Stack Modern.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Fitur Utama */}
        <div className="space-y-6 animate-slide-up delay-100">
          <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
            <ShieldCheck className="w-6 h-6 text-primary-400" />
            <h2 className="text-xl font-semibold text-white">Fitur Utama</h2>
          </div>
          
          <ul className="space-y-4">
            {[
              "Autentikasi aman dengan JWT dan Argon2 hashing",
              "Sistem manajemen sesi berbasis HTTP-only Cookie",
              "Dashboard interaktif dengan ringkasan data real-time",
              "Operasi CRUD (Create, Read, Update, Delete) data mahasiswa",
              "Toggle status aktivasi mahasiswa secara cepat",
              "Antarmuka responsif dengan desain Glassmorphism premium",
            ].map((fitur, idx) => (
              <li key={idx} className="flex items-start gap-3 text-surface-300">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0" />
                <span className="leading-relaxed">{fitur}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="space-y-6 animate-slide-up delay-200">
          <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
            <Code2 className="w-6 h-6 text-primary-400" />
            <h2 className="text-xl font-semibold text-white">Teknologi yang Digunakan</h2>
          </div>
          
          <div className="space-y-4">
            {techStack.map((stack, idx) => (
              <div key={idx} className="bg-surface-900/50 border border-white/[0.05] rounded-xl p-4 transition-colors hover:bg-surface-800/50">
                <div className="flex items-center gap-2 mb-3">
                  {stack.icon}
                  <h3 className="font-medium text-white">{stack.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((item, itemIdx) => (
                    <span 
                      key={itemIdx}
                      className="px-2.5 py-1 text-xs font-medium text-surface-300 bg-surface-950/80 border border-white/[0.08] rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
