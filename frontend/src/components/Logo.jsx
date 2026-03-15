export default function Logo({ className = "w-10 h-10", iconOnly = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Dynamic SVG Icon */}
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Shape */}
            <rect
              width="24"
              height="24"
              rx="7"
              className="fill-primary-600"
            />
            {/* Stylized 'M' with Coding Brackets flavor */}
            <path
              d="M7 17V7L12 12L17 7V17"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Decorative Dot/Sparkle */}
            <circle cx="12" cy="18" r="1.5" className="fill-indigo-300 animate-pulse" />
          </svg>
        </div>
      </div>

      {!iconOnly && (
        <span className="text-2xl font-black tracking-tight text-white">
          <span className="text-primary-500">Mhs</span>
          <span className="text-white">Dev</span>
        </span>
      )}
    </div>
  );
}
