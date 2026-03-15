import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-white/[0.08] bg-surface-950/80 backdrop-blur-xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo className="w-8 h-8" />
          
          <div className="text-sm text-surface-400">
            &copy; {currentYear} Alwan. Pelatihan React Lanjutan.
          </div>
        </div>
      </div>
    </footer>
  );
}
