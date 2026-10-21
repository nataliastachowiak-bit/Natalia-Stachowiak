export function BotanicalDecoration({
  position = 'top-left',
  className = '',
}: {
  position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
  className?: string;
}) {
  if (position === 'top-left') {
    return (
      <div
        className={`pointer-events-none absolute -top-8 -left-8 sm:-top-10 sm:-left-10 z-0 opacity-30 sm:opacity-40 mix-blend-screen select-none overflow-hidden max-w-[60vw] sm:max-w-none ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 420 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-44 h-44 sm:w-72 sm:h-72 lg:w-[420px] lg:h-[420px] filter drop-shadow-[0_0_30px_rgba(11,90,77,0.5)]"
        >
          <g opacity="0.85">
            <path
              d="M-20 0C60 60 120 180 100 320C40 260 0 160 -20 0Z"
              fill="url(#leaf-gradient-1)"
            />
            <path
              d="M-20 0C100 20 220 80 280 200C180 180 60 100 -20 0Z"
              fill="url(#leaf-gradient-2)"
              opacity="0.9"
            />
            <path
              d="M20 -30C160 40 260 160 320 300C220 260 140 140 20 -30Z"
              fill="url(#leaf-gradient-3)"
              opacity="0.75"
            />
            <path
              d="M-10 120C80 180 150 280 170 380C100 320 30 240 -10 120Z"
              fill="url(#leaf-gradient-1)"
              opacity="0.6"
            />
          </g>
          <defs>
            <linearGradient id="leaf-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B5A4D" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#063F35" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#080B09" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="leaf-gradient-2" x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#148B78" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#0B5A4D" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#080B09" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="leaf-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A66B" stopOpacity="0.3" />
              <stop offset="40%" stopColor="#0B5A4D" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#063F35" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (position === 'bottom-right') {
    return (
      <div
        className={`pointer-events-none absolute -bottom-8 -right-8 sm:-bottom-10 sm:-right-10 z-0 opacity-30 sm:opacity-40 mix-blend-screen select-none overflow-hidden max-w-[60vw] sm:max-w-none ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 440 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-44 h-44 sm:w-72 sm:h-72 lg:w-[440px] lg:h-[440px] filter drop-shadow-[0_0_35px_rgba(11,90,77,0.4)]"
        >
          <g opacity="0.8">
            <path
              d="M460 460C380 400 320 280 340 140C400 200 440 300 460 460Z"
              fill="url(#leaf-br-1)"
            />
            <path
              d="M460 460C340 440 220 380 160 260C260 280 380 360 460 460Z"
              fill="url(#leaf-br-2)"
              opacity="0.85"
            />
            <path
              d="M420 490C280 420 180 300 120 160C220 200 300 320 420 490Z"
              fill="url(#leaf-br-3)"
              opacity="0.65"
            />
          </g>
          <defs>
            <linearGradient id="leaf-br-1" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0B5A4D" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#063F35" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#080B09" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="leaf-br-2" x1="100%" y1="100%" x2="20%" y2="0%">
              <stop offset="0%" stopColor="#148B78" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#0B5A4D" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#080B09" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="leaf-br-3" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#C9A66B" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#0B5A4D" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#063F35" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return null;
}
