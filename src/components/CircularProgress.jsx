export function CircularProgress({ rings, size = 220, stroke = 10, gap = 8, children }) {
  const center = size / 2;
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          {rings.map((r, i) => (
            <filter key={i} id={`glow-${i}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>
        {rings.map((r, i) => {
          const radius = center - stroke / 2 - i * (stroke + gap);
          if (radius <= 0) return null;
          const c = 2 * Math.PI * radius;
          const dash = (Math.min(100, Math.max(0, r.value)) / 100) * c;
          return (
            <g key={i}>
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="oklch(0.28 0.025 270)"
                strokeWidth={stroke}
              />
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={r.color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${c}`}
                filter={`url(#glow-${i})`}
                style={{ transition: "stroke-dasharray 600ms ease" }}
              />
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}
