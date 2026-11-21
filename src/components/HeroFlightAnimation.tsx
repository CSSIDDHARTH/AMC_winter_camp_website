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


/**
 * A quiet engineering flight display. The instrumentation is decorative and
 * intentionally labelled as a simulation rather than live flight telemetry.
 */
function FlightInstrumentation() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
      <div className="absolute right-[3%] top-[5%] h-[82%] w-[49%] opacity-80">
        <svg viewBox="0 0 480 480" className="h-full w-full" fill="none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="flight-hud-glow">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
              <stop offset="55%" stopColor="#B9D9F0" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#B9D9F0" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="flight-hud-sweep" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#DE546A" stopOpacity="0" />
              <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0.16" />
            </linearGradient>
          </defs>
          <circle cx="240" cy="240" r="222" fill="url(#flight-hud-glow)" />
          <circle cx="240" cy="240" r="179" stroke="#1E3A5F" strokeOpacity="0.16" strokeWidth="1.1" strokeDasharray="3 11" />
          <circle cx="240" cy="240" r="135" stroke="#1E3A5F" strokeOpacity="0.14" strokeWidth="1" />
          <circle cx="240" cy="240" r="94" stroke="#1E3A5F" strokeOpacity="0.10" strokeWidth="1" strokeDasharray="5 7" />
          <path d="M240 24 V95 M240 386 V456 M24 240 H95 M386 240 H456" stroke="#1E3A5F" strokeOpacity="0.2" strokeWidth="1.1" />
          <path d="M96 108 L115 127 M365 353 L384 372 M96 372 L115 353 M365 127 L384 108" stroke="#DE546A" strokeOpacity="0.45" strokeWidth="1.5" />
          <motion.g
            style={{ transformOrigin: '240px 240px' }}
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
          >
            <path d="M240 240 L240 66 A174 174 0 0 1 361 115 Z" fill="url(#flight-hud-sweep)" />
            <path d="M240 66 A174 174 0 0 1 361 115" stroke="#DE546A" strokeOpacity="0.44" strokeWidth="1.6" />
          </motion.g>
          <circle cx="240" cy="240" r="4" fill="#DE546A" fillOpacity="0.38" />
          <path d="M235 240 H245 M240 235 V245" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="1.3" />
        </svg>
      </div>

      <div className="absolute right-[7%] top-[10%] flex items-center gap-2 rounded-lg border border-[#1E3A5F]/15 bg-[#FFFCF7]/75 px-3 py-2 shadow-[0_8px_24px_-16px_rgba(19,36,60,0.25)] backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#DE546A]" />
        <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#1E3A5F]">UAV FLIGHT SYSTEMS</span>
      </div>
      <div className="absolute right-[4%] bottom-[17%] flex items-center gap-2 rounded-lg border border-[#1E3A5F]/12 bg-[#FFFCF7]/70 px-3 py-2 backdrop-blur-sm">
        <span className="h-px w-6 bg-[#DE546A]/75" />
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#1E3A5F]">Flight-path visualization</span>
      </div>
    </div>
  );
}

export function HeroFlightAnimation({
  parallaxRef,
}: {
  parallaxRef?: React.RefObject<{ x: number; y: number }>;
}) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const gliderRef = useRef<HTMLDivElement>(null);
  const scoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const stage = stageRef.current;
    if (!stage) return;

    let width = stage.clientWidth || 1200;
    let height = stage.clientHeight || 620;
    let visible = true;
    let rafId = 0;
    let smoothX = 0;
    let smoothY = 0;
    const startedAt = performance.now();

    const schedule = () => {
      if (!rafId && visible && !document.hidden) rafId = requestAnimationFrame(tick);
    };

    function tick(now: number) {
      rafId = 0;
      const t = (now - startedAt) / 1000;
      const targetX = parallaxRef?.current?.x ?? 0;
      const targetY = parallaxRef?.current?.y ?? 0;
      smoothX += (targetX - smoothX) * 0.045;
      smoothY += (targetY - smoothY) * 0.045;

      // Main craft: restrained, layered orbital movement with a soft bank.
      if (leadRef.current) {
        const phase = t * 0.22 + 0.35;
        const x = width * 0.79 + Math.sin(phase) * Math.min(width * 0.052, 68) + smoothX * 15;
        const y = height * 0.375 + Math.sin(phase * 2) * height * 0.042 + Math.cos(t * 0.8) * 3 + smoothY * 11;
        const bank = Math.cos(phase) * 7;
        const yaw = Math.sin(phase) * 9;
        const pitch = Math.sin(phase * 2) * 3;
        const scale = 1.04 + Math.sin(phase + 0.8) * 0.065;

        leadRef.current.style.transform =
          'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) translate(-50%,-50%) ' +
          'perspective(900px) rotateY(' + yaw.toFixed(1) + 'deg) rotateX(' + pitch.toFixed(1) +
          'deg) rotate(' + bank.toFixed(1) + 'deg) scale(' + scale.toFixed(3) + ')';
      }

      // Fixed wing: one slow, smooth flyby well behind the hero craft.
      if (gliderRef.current) {
        const cycle = 29;
        const progress = ((t + 5) % cycle) / cycle;
        const x = -180 + progress * (width + 360) + smoothX * 8;
        const y = height * 0.21 - Math.sin(progress * Math.PI) * height * 0.09 + smoothY * 6;
        const fade = Math.max(0, Math.min(1, progress * 8, (1 - progress) * 8));

        gliderRef.current.style.opacity = (fade * 0.75).toFixed(3);
        gliderRef.current.style.transform =
          'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) translate(-50%,-50%) ' +
          'rotate(' + (-7 + Math.sin(progress * Math.PI * 2) * 2).toFixed(1) + 'deg) scale(0.86)';
      }

      // A tiny distant observer keeps the image atmospheric without adding clutter.
      if (scoutRef.current) {
        const cycle = 40;
        const progress = ((t + 15) % cycle) / cycle;
        const x = width + 100 - progress * (width + 200) + smoothX * 5;
        const y = height * 0.72 + Math.sin(progress * Math.PI * 2) * height * 0.028 + smoothY * 4;
        const fade = Math.max(0, Math.min(1, progress * 8, (1 - progress) * 8));

        scoutRef.current.style.opacity = (fade * 0.40).toFixed(3);
        scoutRef.current.style.transform =
          'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) translate(-50%,-50%) scaleX(-1) rotate(5deg) scale(0.55)';
      }

      schedule();
    }

    const resizeObserver = new ResizeObserver(() => {
      width = stage.clientWidth || width;
      height = stage.clientHeight || height;
    });
    resizeObserver.observe(stage);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      schedule();
    }, { threshold: 0.03 });
    visibilityObserver.observe(stage);
    document.addEventListener('visibilitychange', schedule);
    schedule();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', schedule);
    };
  }, [reduceMotion, parallaxRef]);

  if (reduceMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <FlightInstrumentation />
        <div className="absolute right-[6%] top-[26%] hidden h-32 w-56 opacity-90 md:block">
          <Quadcopter3DSvg spin={false} />
        </div>
        <div className="absolute right-[23%] top-[10%] hidden h-16 w-40 -rotate-8 opacity-65 md:block">
          <FixedWing3DSvg spin={false} />
        </div>
      </div>
    );
  }

  return (
    <div ref={stageRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <FlightInstrumentation />

      {/* Mobile: still show an aircraft without animating over the headline. */}
      <div className="absolute right-[-5%] top-[9%] h-24 w-40 opacity-20 md:hidden">
        <Quadcopter3DSvg spin={false} distant />
      </div>

      <div ref={scoutRef} className="absolute left-0 top-0 hidden h-16 w-28 will-change-transform md:block" style={{ opacity: 0 }}>
        <Quadcopter3DSvg spin={false} distant />
      </div>

      <div ref={gliderRef} className="absolute left-0 top-0 hidden h-16 w-40 will-change-transform md:block" style={{ opacity: 0 }}>
        <FixedWing3DSvg spin />
      </div>

      <div ref={leadRef} className="absolute left-0 top-0 hidden h-36 w-60 will-change-transform md:block">
        <div className="relative h-full w-full">
          <div
            className="absolute inset-[-14%] -z-10 rounded-full blur-xl"
            style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.65), rgba(192,217,238,0.14) 52%, transparent 72%)' }}
          />
          <div className="relative h-full w-full drop-shadow-[0_20px_22px_rgba(19,36,60,0.22)]">
            <Quadcopter3DSvg />
          </div>
        </div>
      </div>
    </div>
  );
}
