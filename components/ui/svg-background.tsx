interface SVGBackgroundProps {
  variant?: 'grid' | 'dots' | 'lines';
  opacity?: number;
  color?: string;
}

export function SVGBackground({ variant = 'grid', opacity = 0.1, color = 'currentColor' }: SVGBackgroundProps) {
  const getPattern = () => {
    switch (variant) {
      case 'dots':
        return (
          <pattern id="dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.5" fill={color} />
          </pattern>
        );
      case 'lines':
        return (
          <pattern id="lines-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="20" x2="20" y2="0" stroke={color} strokeWidth="0.5" />
          </pattern>
        );
      case 'grid':
      default:
        return (
          <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={color} strokeWidth="0.5" />
          </pattern>
        );
    }
  };

  const patternId = `${variant}-pattern`;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>{getPattern()}</defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
