import { useEffect, useId, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

function RotorDisc({
  cx,
  cy,
  rx = 18,
  spinDuration = 0.24,
  reverse = false,
  accentColor = '#DE546A',
  spin = true,
}: {
  cx: number;
  cy: number;
  rx?: number;
  spinDuration?: number;
  reverse?: boolean;
  accentColor?: string;
  spin?: boolean;
}) {
  const gradId = useId();

  return (
    <g transform={`translate(${cx}, ${cy})`}>
      {/* Foreshortened 3D rotor plane (viewed at ~20deg elevation angle) */}
      <g transform="scale(1, 0.34)">
        {/* Prop-wash translucent blur disc */}
        <circle cx="0" cy="0" r={rx} fill={`url(#${gradId})`} />
        <circle
          cx="0"
          cy="0"
          r={rx}
          stroke="#FFFFFF"
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />

        {/* High-speed spinning airfoil blade + tip streak */}
        {spin ? (
          <motion.g
            animate={{ rotate: reverse ? -360 : 360 }}
            transition={{ duration: spinDuration, repeat: Infinity, ease: 'linear' }}
          >
            <ellipse cx="0" cy="0" rx={rx * 0.96} ry="2.2" fill="#13243C" fillOpacity="0.65" />
            <ellipse cx="0" cy="0" rx={rx * 0.88} ry="1.2" fill="#FFFFFF" fillOpacity="0.45" />
            <circle cx={rx * 0.92} cy="0" r="1.6" fill={accentColor} fillOpacity="0.8" />
            <circle cx={-rx * 0.92} cy="0" r="1.6" fill={accentColor} fillOpacity="0.8" />
          </motion.g>
        ) : (
          <g transform="rotate(24)">
            <ellipse cx="0" cy="0" rx={rx * 0.96} ry="2.2" fill="#13243C" fillOpacity="0.65" />
          </g>
        )}
      </g>

      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.12" />
          <stop offset="68%" stopColor="#DCE8F5" stopOpacity="0.28" />
          <stop offset="92%" stopColor="#1E3A5F" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0" />
        </radialGradient>
      </defs>
    </g>
  );
}

function Quadcopter3DSvg({
  spin = true,
  distant = false,
}: {
  spin?: boolean;
  distant?: boolean;
}) {
  const uid = useId();
  const hullGrad = `hull-${uid}`;
  const shadowColor = distant ? '#36557B' : '#13243C';
  const midColor = distant ? '#486C96' : '#1E3A5F';
  const accent = distant ? '#D17889' : '#DE546A';

  return (
    <svg viewBox="0 0 140 84" className="h-full w-full overflow-visible" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={hullGrad} x1="42" y1="26" x2="98" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#466B96" />
          <stop offset="45%" stopColor={midColor} />
          <stop offset="100%" stopColor={shadowColor} />
        </linearGradient>
      </defs>

      {/* Soft atmospheric downwash shadow beneath fuselage */}
      <ellipse
        cx="70"
        cy="66"
        rx="32"
        ry="7"
        fill={shadowColor}
        fillOpacity={distant ? 0.08 : 0.14}
      />

      {/* Landing skids in 3/4 perspective */}
      <path
        d="M52 50 L47 63 M88 50 L93 63 M40 63 Q70 66 100 63"
        stroke={shadowColor}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeOpacity={distant ? 0.65 : 0.9}
      />

      {/* Rear carbon arms (foreshortened upper plane) */}
      <path d="M58 38 L30 28" stroke={midColor} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M82 38 L110 28" stroke={midColor} strokeWidth="3.2" strokeLinecap="round" />

      {/* Rear motor bells */}
      <rect x="27.5" y="23" width="5" height="6" rx="1.5" fill={shadowColor} />
      <rect x="107.5" y="23" width="5" height="6" rx="1.5" fill={shadowColor} />

      {/* Rear rotor discs (behind canopy) */}
      <RotorDisc cx={30} cy={22} rx={16} spinDuration={0.22} reverse spin={spin} accentColor={accent} />
      <RotorDisc cx={110} cy={22} rx={16} spinDuration={0.25} spin={spin} accentColor={accent} />

      {/* Sculpted aerodynamic fuselage shell */}
      <path
        d="M45 41 C49 29, 91 29, 95 41 C98 47, 89 52, 70 52 C51 52, 42 47, 45 41 Z"
        fill={`url(#${hullGrad})`}
      />
      {/* Sunlit upper canopy highlight */}
      <path
        d="M53 36 C59 31, 81 31, 87 36 C82 38.5, 58 38.5, 53 36 Z"
        fill="#FFFFFF"
        fillOpacity={distant ? 0.28 : 0.45}
      />
      {/* Reef Pink engineering stripe */}
      <path
        d="M49 42 C57 44.5, 83 44.5, 91 42"
        stroke={accent}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Underslung 3-axis camera gimbal pod */}
      <circle cx="77" cy="54" r="5.5" fill={shadowColor} />
      <circle cx="79" cy="54" r="2.6" fill="#0B1626" />
      <circle cx="79.8" cy="53.2" r="0.9" fill="#9FD3FF" fillOpacity="0.85" />

      {/* Front carbon arms (wider lower foreground plane) */}
      <path d="M56 44 L22 50" stroke={shadowColor} strokeWidth="3.6" strokeLinecap="round" />
      <path d="M84 44 L118 50" stroke={shadowColor} strokeWidth="3.6" strokeLinecap="round" />

      {/* Front motor bells */}
      <rect x="19" y="44.5" width="6" height="7" rx="1.5" fill={shadowColor} />
      <rect x="115" y="44.5" width="6" height="7" rx="1.5" fill={shadowColor} />

      {/* Subtle aviation orientation LEDs on arm tips */}
      <circle cx="22" cy="51.5" r="1.6" fill={accent} />
      <circle cx="118" cy="51.5" r="1.6" fill="#FFFFFF" />

      {/* Front rotor discs */}
      <RotorDisc cx={22} cy={43.5} rx={19} spinDuration={0.21} spin={spin} accentColor={accent} />
      <RotorDisc cx={118} cy={43.5} rx={19} spinDuration={0.23} reverse spin={spin} accentColor={accent} />
    </svg>
  );
}

function FixedWing3DSvg({ spin = true }: { spin?: boolean }) {
  const uid = useId();
  const wingGrad = `wing-${uid}`;
  const bellyGrad = `belly-${uid}`;

  return (
    <svg viewBox="0 0 180 78" className="h-full w-full overflow-visible" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={wingGrad} x1="40" y1="14" x2="110" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#E4EDF7" />
          <stop offset="100%" stopColor="#B8CCE2" />
        </linearGradient>
        <linearGradient id={bellyGrad} x1="30" y1="36" x2="148" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#264770" />
          <stop offset="100%" stopColor="#13243C" />
        </linearGradient>
        <linearGradient id={`trail-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.65" />
        </linearGradient>
      </defs>

      {/* Delicate wingtip condensation ribbons trailing behind aircraft */}
      <path
        d="M-65 30 Q-18 27 25 22"
        stroke={`url(#trail-${uid})`}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M-55 56 Q-10 53 40 49"
        stroke={`url(#trail-${uid})`}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Far swept wing (upper-left foreshortened) */}
      <path
        d="M66 36 L25 22 L38 20 L86 33 Z"
        fill="#CBDCEF"
        stroke="#1E3A5F"
        strokeOpacity="0.25"
        strokeWidth="0.8"
      />
      {/* Far wingtip winglet */}
      <path d="M25 22 L19 16 L28 19 Z" fill="#DE546A" />

      {/* V-tail vertical stabilizer */}
      <path d="M28 40 L12 27 L24 27 L42 39 Z" fill="#1E3A5F" />
      <path d="M12 27 L24 27 L21 31 Z" fill="#DE546A" />

      {/* Aerodynamic blended fuselage */}
      <path
        d="M16 40 C38 35, 114 33, 146 39 C124 46, 48 46, 16 40 Z"
        fill={`url(#${bellyGrad})`}
      />
      {/* Sunlit fuselage spine & nose */}
      <path
        d="M36 37 C68 33.5, 118 34.5, 143 38.5 C120 39.5, 68 39, 36 37 Z"
        fill="#FFFFFF"
        fillOpacity="0.72"
      />
      {/* Pitot sensor nose tip */}
      <path d="M143 38.5 L154 39 L144 40.2 Z" fill="#DE546A" />

      {/* Near swept main wing (3/4 bank perspective) */}
      <path
        d="M98 40 L40 49 L55 52 L112 42 Z"
        fill={`url(#${wingGrad})`}
        stroke="#1E3A5F"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      {/* Near wingtip Reef Pink accent */}
      <path d="M40 49 L35 54 L55 52 Z" fill="#DE546A" />

      {/* Vertical foreshortened pusher/nose prop blur disc */}
      <g transform="translate(15, 40) scale(0.32, 1)">
        <circle cx="0" cy="0" r="13" fill="#FFFFFF" fillOpacity="0.28" stroke="#1E3A5F" strokeOpacity="0.22" />
        {spin && (
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 0.2, repeat: Infinity, ease: 'linear' }}
          >
            <ellipse cx="0" cy="0" rx="1.6" ry="12.5" fill="#13243C" fillOpacity="0.65" />
          </motion.g>
        )}
      </g>
    </svg>
  );
}

export function HeroFlightAnimation({
  parallaxRef,
}: {
  parallaxRef?: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const heroDroneRef = useRef<HTMLDivElement>(null);
  const gliderRef = useRef<HTMLDivElement>(null);
  const midDroneRef = useRef<HTMLDivElement>(null);
  const distantDroneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId = 0;
    const startTime = performance.now();
    let smoothPx = 0;
    let smoothPy = 0;

    const tick = (now: number) => {
      const t = (now - startTime) / 1000;
      const stage = stageRef.current;

      if (stage) {
        const w = stage.clientWidth || 1200;
        const h = stage.clientHeight || 540;

        // Smoothly damp mouse parallax offset
        const targetPx = parallaxRef?.current.x ?? 0;
        const targetPy = parallaxRef?.current.y ?? 0;
        smoothPx += (targetPx - smoothPx) * 0.06;
        smoothPy += (targetPy - smoothPy) * 0.06;

        // 1. Lead 3D Hero Quadcopter: graceful figure-8 patrol in the right open sky
        if (heroDroneRef.current) {
          const omega = 0.26;
          const phase = t * omega + 0.6;
          const baseX = w < 640 ? w * 0.68 : w * 0.77;
          const baseY = h * 0.34;
          const ampX = w < 640 ? w * 0.14 : w * 0.11;
          const ampY = h * 0.095;

          const x = baseX + Math.sin(phase) * ampX + smoothPx * 18;
          const y = baseY + Math.sin(phase * 2) * ampY + Math.cos(t * 1.1) * 3 + smoothPy * 12;
          const vx = Math.cos(phase) * ampX * omega;
          const bank = Math.max(-13, Math.min(13, vx * 0.16));
          const depthScale = (w < 640 ? 0.78 : 1.0) + Math.cos(phase) * 0.09;

          heroDroneRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${bank.toFixed(2)}deg) scale(${depthScale.toFixed(3)})`;
        }

        // 2. Swept-Wing Autonomous Glider UAV: continuous parabolic climb left-to-right
        if (gliderRef.current) {
          const cycle = 22;
          const progress = ((t + 5.5) % cycle) / cycle; // 0..1
          const x = -140 + progress * (w + 280) + smoothPx * 10;
          // Gentle ascending glide arc with subtle aerodynamic lift curve
          const y = h * 0.38 - Math.sin(progress * Math.PI * 0.88) * (h * 0.22) - progress * (h * 0.12) + smoothPy * 8;

          // Compute exact tangent angle for realistic pitch/climb attitude
          const dx = w + 280;
          const dy = -Math.cos(progress * Math.PI * 0.88) * Math.PI * 0.88 * (h * 0.22) - h * 0.12;
          const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
          const edgeFade = Math.min(progress / 0.12, (1 - progress) / 0.12, 1);

          gliderRef.current.style.opacity = (Math.max(0, edgeFade) * 0.92).toFixed(3);
          gliderRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${angleDeg.toFixed(2)}deg) scale(${(w < 640 ? 0.72 : 0.94).toFixed(2)})`;
        }

        // 3. Mid-Altitude Cruiser Drone: sweeping smoothly across the upper sky
        if (midDroneRef.current) {
          const cycle = 26;
          const progress = ((t + 14) % cycle) / cycle;
          const x = -110 + progress * (w + 220) + smoothPx * 7;
          const y = h * 0.16 + Math.sin(progress * Math.PI * 2) * (h * 0.05) + smoothPy * 5;
          const dy = Math.cos(progress * Math.PI * 2) * Math.PI * 2 * (h * 0.05);
          const pitch = 7 + (dy / (w + 220)) * 35;
          const edgeFade = Math.min(progress / 0.1, (1 - progress) / 0.1, 1);

          midDroneRef.current.style.opacity = (Math.max(0, edgeFade) * 0.72).toFixed(3);
          midDroneRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${pitch.toFixed(2)}deg) scale(0.68)`;
        }

        // 4. Distant Horizon Scout Drone: gliding right-to-left behind lower cloud layer
        if (distantDroneRef.current) {
          const cycle = 30;
          const progress = ((t + 9) % cycle) / cycle;
          const x = w + 100 - progress * (w + 200) + smoothPx * 4;
          const y = h * 0.66 + Math.sin(progress * Math.PI * 2.5) * (h * 0.045) + smoothPy * 4;
          const edgeFade = Math.min(progress / 0.12, (1 - progress) / 0.12, 1);

          distantDroneRef.current.style.opacity = (Math.max(0, edgeFade) * 0.56).toFixed(3);
          distantDroneRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%) scaleX(-1) rotate(8deg) scale(0.46)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReducedMotion, parallaxRef]);

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute right-[12%] top-[24%] h-20 w-32 opacity-90">
          <Quadcopter3DSvg spin={false} />
        </div>
        <div className="absolute right-[26%] top-[12%] h-14 w-36 -rotate-8 opacity-85">
          <FixedWing3DSvg spin={false} />
        </div>
        <div className="hidden sm:block absolute right-[7%] bottom-[22%] h-12 w-20 opacity-55">
          <Quadcopter3DSvg spin={false} distant />
        </div>
      </div>
    );
  }

  return (
    <div ref={stageRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Far-horizon scout quadcopter */}
      <div
        ref={distantDroneRef}
        className="absolute top-0 left-0 h-20 w-32 will-change-transform"
        style={{ opacity: 0 }}
      >
        <Quadcopter3DSvg distant />
      </div>

      {/* Mid-altitude cruising quadcopter */}
      <div
        ref={midDroneRef}
        className="absolute top-0 left-0 h-20 w-32 will-change-transform"
        style={{ opacity: 0 }}
      >
        <Quadcopter3DSvg />
      </div>

      {/* Swept-wing autonomous survey UAV with contrails */}
      <div
        ref={gliderRef}
        className="absolute top-0 left-0 h-16 w-40 will-change-transform"
        style={{ opacity: 0 }}
      >
        <FixedWing3DSvg />
      </div>

      {/* Hero foreground 3D quadcopter patrolling open sky */}
      <div
        ref={heroDroneRef}
        className="hidden sm:block absolute top-0 left-0 h-24 w-40 drop-shadow-[0_14px_18px_rgba(19,36,60,0.18)] will-change-transform"
      >
        <Quadcopter3DSvg />
      </div>
    </div>
  );
}
