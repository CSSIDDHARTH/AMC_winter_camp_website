import { motion, useReducedMotion } from 'motion/react';

function VolumetricCloud({
  id,
  className = '',
  highlight = '#FFFFFF',
  midtone = '#F0F6FC',
  shadow = '#C7D9EC',
}: {
  id: string;
  className?: string;
  highlight?: string;
  midtone?: string;
  shadow?: string;
}) {
  return (
    <svg
      viewBox="0 0 600 220"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id={`cloud-blur-${id}`} x="-20%" y="-25%" width="140%" height="150%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id={`cloud-wisp-${id}`} x="-25%" y="-30%" width="150%" height="160%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        <linearGradient id={`cloud-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={highlight} stopOpacity="0.95" />
          <stop offset="58%" stopColor={midtone} stopOpacity="0.78" />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.38" />
        </linearGradient>
      </defs>

      {/* Atmospheric outer mist halo */}
      <g filter={`url(#cloud-wisp-${id})`} opacity="0.65">
        <ellipse cx="290" cy="136" rx="225" ry="44" fill={highlight} />
        <ellipse cx="235" cy="96" rx="110" ry="52" fill={highlight} />
        <ellipse cx="365" cy="108" rx="125" ry="48" fill={midtone} />
      </g>

      {/* Main sunlit cumulus body */}
      <g filter={`url(#cloud-blur-${id})`}>
        <ellipse cx="145" cy="138" rx="95" ry="34" fill={`url(#cloud-grad-${id})`} />
        <ellipse cx="235" cy="102" rx="105" ry="52" fill={`url(#cloud-grad-${id})`} />
        <ellipse cx="345" cy="112" rx="112" ry="46" fill={`url(#cloud-grad-${id})`} />
        <ellipse cx="455" cy="138" rx="88" ry="30" fill={`url(#cloud-grad-${id})`} />
        <ellipse cx="295" cy="145" rx="205" ry="32" fill={shadow} fillOpacity="0.35" />
      </g>

      {/* Crisp warm-lit upper crest */}
      <g filter={`url(#cloud-blur-${id})`} opacity="0.8">
        <ellipse cx="230" cy="82" rx="72" ry="26" fill={highlight} />
        <ellipse cx="338" cy="94" rx="78" ry="22" fill={highlight} />
      </g>
    </svg>
  );
}

export function HeroCloudLayer() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <VolumetricCloud
          id="static-top"
          className="absolute right-[4%] top-[6%] w-[420px] opacity-80"
        />
        <VolumetricCloud
          id="static-low"
          className="absolute right-[20%] -bottom-10 w-[560px] opacity-75"
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Subtle Sunlit Atmospheric Glow in Upper-Right Sky */}
      <div
        className="absolute -top-24 right-[6%] h-[420px] w-[420px] rounded-full opacity-55"
        style={{
          background:
            'radial-gradient(circle, rgba(255,252,247,0.92) 0%, rgba(255,244,230,0.42) 42%, rgba(220,233,245,0) 74%)',
        }}
      />

      {/* High-altitude cirrus cloud veil drifting slowly left-to-right */}
      <motion.div
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: ['-20%', '112%'], opacity: [0, 0.72, 0.72, 0] }}
        transition={{ duration: 64, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[4%] left-0 will-change-transform"
      >
        <VolumetricCloud
          id="high-cirrus"
          className="w-[380px] sm:w-[480px]"
          highlight="#FFFFFF"
          midtone="#F4F8FC"
          shadow="#D5E3F2"
        />
      </motion.div>

      {/* Mid-sky sunlit cumulus drifting smoothly */}
      <motion.div
        initial={{ x: '25%', opacity: 0 }}
        animate={{ x: ['-30%', '115%'], opacity: [0, 0.65, 0.68, 0] }}
        transition={{ duration: 52, delay: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[28%] left-0 will-change-transform"
      >
        <VolumetricCloud
          id="mid-cumulus"
          className="w-[460px] sm:w-[580px]"
          highlight="#FFFCF7"
          midtone="#EEF4FB"
          shadow="#C6D8EB"
        />
      </motion.div>

      {/* Foreground lower horizon cloud bank gently breathing in the breeze */}
      <motion.div
        animate={{
          x: [-24, 28, -24],
          y: [0, -6, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-14 right-[-4%] sm:right-[4%] will-change-transform"
      >
        <VolumetricCloud
          id="horizon-bank"
          className="w-[520px] sm:w-[680px] opacity-90"
          highlight="#FFFCF7"
          midtone="#F5F8FC"
          shadow="#D8E4F0"
        />
      </motion.div>
    </div>
  );
}
