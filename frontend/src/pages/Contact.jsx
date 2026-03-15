import { User, Calendar, BookOpen, GraduationCap, Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  const profileDetails = [
    { label: "Nama Lengkap", value: "Alwan", icon: <User className="w-5 h-5" /> },
    { label: "Tempat, Tanggal Lahir", value: "06 September 2005", icon: <Calendar className="w-5 h-5" /> },
    { label: "Pelatihan", value: "React Lanjutan", icon: <BookOpen className="w-5 h-5" /> },
    { label: "Instruktur", value: "Eka Rahma", icon: <GraduationCap className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-12">
      <div className="text-center space-y-4 animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Kontak & Profil Pribadi</h1>
        <p className="text-lg text-surface-400 max-w-2xl mx-auto">
          Informasi mengenai pengembang aplikasi MhsDev.
        </p>
      </div>

      <div className="mt-12 bg-surface-900/40 border border-white/[0.08] backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl animate-slide-up delay-100 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <User className="w-64 h-64" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Avatar Area */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 p-1 shadow-xl shadow-primary-500/20 relative">
              <div className="w-full h-full bg-surface-900 rounded-full flex items-center justify-center overflow-hidden border-4 border-surface-900">
                <User className="w-20 h-20 text-surface-500" />
              </div>
              
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-surface-900 flex items-center justify-center" title="Buka untuk kolaborasi">
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Alwan</h2>
              <p className="text-primary-400 font-medium tracking-wide text-sm uppercase">Fullstack Developer</p>
            </div>
            
            <div className="flex items-center gap-4 pt-2">
              <button className="p-2.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-xl text-surface-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-xl text-surface-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-xl text-surface-400 hover:text-rose-400 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Details List */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4 mb-6">
              <h3 className="text-xl font-semibold text-white">Detail Informasi</h3>
            </div>
            
            <div className="space-y-5">
              {profileDetails.map((detail, idx) => (
                <div key={idx} className="flex flex-col gap-1.5 group">
                  <div className="flex items-center gap-2 text-surface-500 group-hover:text-primary-400 transition-colors">
                    {detail.icon}
                    <span className="text-sm font-medium">{detail.label}</span>
                  </div>
                  <p className="text-white text-lg font-medium pl-7">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
