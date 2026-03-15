export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-white/[0.08] bg-surface-950/80 backdrop-blur-xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-lg font-bold text-white">MhsDev</span>
          </div>
          
          <div className="text-sm text-surface-400">
            &copy; {currentYear} Alwan. Pelatihan React Lanjutan.
          </div>
        </div>
      </div>
    </footer>
  );
}
