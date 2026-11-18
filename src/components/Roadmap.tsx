import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { Flag, Lock, MapPin, Navigation } from 'lucide-react';
import { campConfig, WEEK_IDS, WeekConfig } from '../config/campConfig';
import { WeekCard } from './WeekCard';
import { SchematicMapBackdrop } from './SchematicMapBackdrop';

interface WaypointNodeProps {
  week: WeekConfig;
  index: number;
}

function WaypointNode({ week, index }: WaypointNodeProps) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isLeftOnDesktop = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ['start 95%', 'center 55%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    mass: 0.5,
  });

  const scale = useTransform(smoothProgress, [0, 1], [0.88, 1]);
  const y = useTransform(smoothProgress, [0, 1], [44, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.35, 1], [0.45, 0.85, 1]);

  return (
    <div
      id={`waypoint-week-${week.id}`}
      ref={nodeRef}
      className="relative scroll-mt-24 grid grid-cols-1 items-center gap-6 md:grid-cols-11 md:gap-0"
    >
      {/* Left Desktop Card Slot */}
      <div
        className={`md:col-span-5 ${
          isLeftOnDesktop ? 'md:pr-8 order-2 md:order-1' : 'hidden md:block md:order-1'
        }`}
      >
        {isLeftOnDesktop && (
          <motion.div
            style={prefersReducedMotion ? undefined : { scale, y, opacity }}
            className="will-change-transform"
          >
            <WeekCard week={week} waypointLabel={`WP-0${week.id}`} />
          </motion.div>
        )}
      </div>

      {/* Central Flight-Map Waypoint Pin & Vector Connectors */}
      <div className="relative z-10 flex items-center gap-4 md:col-span-1 md:justify-center order-1 md:order-2">
        <div
          aria-hidden="true"
          className={`hidden md:block absolute top-1/2 h-px w-8 border-t-2 border-dashed border-[#DE546A]/55 ${
            isLeftOnDesktop ? 'right-1/2 mr-5' : 'left-1/2 ml-5'
          }`}
        />

        <motion.div
          style={prefersReducedMotion ? undefined : { scale }}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#DE546A] bg-[#FFFCF7] shadow-sm shadow-[#13243C]/10"
        >
          <span className="font-mono text-xs font-bold text-[#1E3A5F] tabular-nums">
            0{week.id}
          </span>
          {!week.released && (
            <span
              className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#E5DEC9] bg-[#F8F5EE] text-[#B8354B]"
              title="Not Released"
            >
              <Lock className="h-2.5 w-2.5" aria-hidden="true" />
            </span>
          )}
        </motion.div>

        <div className="flex items-center gap-2 md:hidden">
          <MapPin className="h-4 w-4 text-[#DE546A]" aria-hidden="true" />
          <span className="font-mono text-xs font-semibold text-[#1E3A5F]">
            WAYPOINT 0{week.id} · {week.shortTitle}
          </span>
        </div>
      </div>

      {/* Right Desktop Card Slot */}
      <div
        className={`md:col-span-5 ${
          !isLeftOnDesktop
            ? 'md:pl-8 order-2 md:order-3'
            : 'md:hidden order-2'
        }`}
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { scale, y, opacity }}
          className="will-change-transform"
        >
          <WeekCard week={week} waypointLabel={`WP-0${week.id}`} />
        </motion.div>
      </div>
    </div>
  );
}

interface RouteSample {
  s: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

function evalCubic(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number
): { val: number; deriv: number } {
  const mt = 1 - t;
  const val =
    mt * mt * mt * p0 +
    3 * mt * mt * t * p1 +
    3 * mt * t * t * p2 +
    t * t * t * p3;
  const deriv =
    3 * mt * mt * (p1 - p0) +
    6 * mt * t * (p2 - p1) +
    3 * t * t * (p3 - p2);
  return { val, deriv };
}

function buildRouteLookup(stepsPerSegment = 100): RouteSample[] {
  const raw: { x: number; y: number; dx: number; dy: number; dist: number }[] = [];
  let totalDist = 0;
  let prevX = 80;
  let prevY = 40;

  const segments = [
    { x0: 80, y0: 40, x1: 80, y1: 180, x2: 28, y2: 240, x3: 80, y3: 450 },
    { x0: 80, y0: 450, x1: 132, y1: 660, x2: 80, y2: 720, x3: 80, y3: 860 },
  ];

  segments.forEach((seg, segIdx) => {
    const startStep = segIdx === 0 ? 0 : 1;
    for (let i = startStep; i <= stepsPerSegment; i++) {
      const t = i / stepsPerSegment;
      const rx = evalCubic(seg.x0, seg.x1, seg.x2, seg.x3, t);
      const ry = evalCubic(seg.y0, seg.y1, seg.y2, seg.y3, t);
      const segLen = Math.hypot(rx.val - prevX, ry.val - prevY);
      totalDist += segLen;
      prevX = rx.val;
      prevY = ry.val;
      raw.push({
        x: rx.val,
        y: ry.val,
        dx: rx.deriv,
        dy: ry.deriv,
        dist: totalDist,
      });
    }
  });

  return raw.map((pt) => ({
    s: totalDist === 0 ? 0 : pt.dist / totalDist,
    x: pt.x,
    y: pt.y,
    dx: pt.dx,
    dy: pt.dy,
  }));
}

function sampleLookup(lut: RouteSample[], progress: number): RouteSample {
  const clamped = Math.max(0, Math.min(1, progress));
  let low = 0;
  let high = lut.length - 1;

  while (low < high - 1) {
    const mid = (low + high) >> 1;
    if (lut[mid].s < clamped) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const a = lut[low];
  const b = lut[high];
  const span = b.s - a.s;
  const alpha = span > 0 ? (clamped - a.s) / span : 0;

  return {
    s: clamped,
    x: a.x + (b.x - a.x) * alpha,
    y: a.y + (b.y - a.y) * alpha,
    dx: a.dx + (b.dx - a.dx) * alpha,
    dy: a.dy + (b.dy - a.dy) * alpha,
  };
}

function AeroplaneMarkerSvg() {
  return (
    <svg
      viewBox="0 0 28 28"
      className="h-6 w-6 text-[#DE546A] drop-shadow-[0_2px_4px_rgba(30,58,95,0.28)]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M25.5 14L17 11.4L11.5 3.5H8.5L11.6 11.4L5.5 12.4L3.2 9.2H1.5L2.9 14L1.5 18.8H3.2L5.5 15.6L11.6 16.6L8.5 24.5H11.5L17 16.6L25.5 14Z"
        fill="currentColor"
        stroke="#FFFCF7"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Roadmap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapHeight, setMapHeight] = useState(900);
  const prefersReducedMotion = useReducedMotion();
  const routeLut = useMemo(() => buildRouteLookup(120), []);

  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;

    const updateHeight = () => {
      if (el.clientHeight > 0) {
        setMapHeight(el.clientHeight);
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress: routeProgress } = useScroll({
    target: mapContainerRef,
    offset: ['start 75%', 'end 65%'],
  });

  const smoothRouteProgress = useSpring(routeProgress, {
    stiffness: 140,
    damping: 24,
  });

  const pathLength = useTransform(smoothRouteProgress, [0, 1], [0.02, 1]);

  const planeX = useTransform(pathLength, (p) => sampleLookup(routeLut, p).x - 80);
  const planeY = useTransform(pathLength, (p) => (sampleLookup(routeLut, p).y / 900) * mapHeight);
  const planeAngle = useTransform(pathLength, (p) => {
    const sample = sampleLookup(routeLut, p);
    const scaledDy = sample.dy * (mapHeight / 900);
    return (Math.atan2(scaledDy, sample.dx) * 180) / Math.PI;
  });

  const mobileLineScaleY = useTransform(pathLength, [0, 1], [0.02, 1]);
  const mobilePlaneY = useTransform(
    pathLength,
    (p) => 40 + p * Math.max(120, mapHeight - 80)
  );

  const scrollToWaypoint = (weekId: number) => {
    document
      .getElementById(`waypoint-week-${weekId}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section
      id="roadmap"
      className="relative overflow-hidden scroll-mt-24 border-b border-[#E5DEC9] bg-[#F8F5EE]"
    >
      <SchematicMapBackdrop />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Section Header + Flight Route Overview Bar */}
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wide text-[#B8354B]">
              <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Flight Plan · 1 Dec – 21 Dec · 03 Waypoints</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.025em] leading-[1.08] text-[#13243C] sm:text-4xl text-balance">
              Three-Week Curriculum <span className="text-[#B8354B]">Roadmap</span>
            </h2>
            <div
              aria-hidden="true"
              className="h-[3px] w-12 rounded-full bg-gradient-to-r from-[#DE546A] to-[#1E3A5F]"
            />
            <p className="pt-1 text-sm leading-relaxed text-[#4B5E77] sm:text-base">
              Scroll along the camp route to approach each weekly waypoint—progressing from
              parametric CAD design and ROS 2 autonomy to full UAV component integration.
            </p>
          </div>

          {/* Interactive Waypoint Jump Strip */}
          <div
            aria-label="Jump to curriculum waypoint"
            className="flex flex-wrap items-center gap-2 rounded-xl border border-[#E5DEC9] bg-[#FFFCF7]/95 p-1.5 shadow-xs"
          >
            {WEEK_IDS.map((id, idx) => {
              const week = campConfig.weeks[id];
              return (
                <div key={id} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => scrollToWaypoint(id)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#33465F] transition-colors hover:bg-[#FDF1F3] hover:text-[#B8354B] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F]"
                  >
                    <span className="font-mono text-[#B8354B] font-semibold">0{id}</span>
                    <span>{week.shortTitle}</span>
                  </button>
                  {idx < WEEK_IDS.length - 1 && (
                    <span aria-hidden="true" className="px-1 text-[#C8BFA8]">
                      →
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Map / Winding Flowchart Container */}
        <div ref={mapContainerRef} className="relative py-4">
          {/* Desktop Winding Route SVG Spine + Leading Aeroplane Icon */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-40 -translate-x-1/2 md:block"
          >
            <svg
              viewBox="0 0 160 900"
              preserveAspectRatio="none"
              className="h-full w-full"
              fill="none"
            >
              {/* Background faint route track */}
              <path
                d="M 80 40 C 80 180, 28 240, 80 450 C 132 660, 80 720, 80 860"
                stroke="#D4CCB8"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              {/* Scroll-animated Indigo Ocean flight route */}
              <motion.path
                d="M 80 40 C 80 180, 28 240, 80 450 C 132 660, 80 720, 80 860"
                stroke="#1E3A5F"
                strokeWidth="3"
                strokeLinecap="round"
                style={prefersReducedMotion ? undefined : { pathLength }}
              />
            </svg>

            {/* Leading Reef Pink Aeroplane Icon tracking the tip of the route line */}
            {!prefersReducedMotion && (
              <motion.div
                style={{
                  x: planeX,
                  y: planeY,
                  rotate: planeAngle,
                }}
                className="absolute top-0 left-1/2 -ml-3.5 -mt-3.5 z-20 will-change-transform"
              >
                <AeroplaneMarkerSvg />
              </motion.div>
            )}
          </div>

          {/* Mobile Vertical Route Line + Leading Aeroplane Icon */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-6 md:hidden"
          >
            <div className="absolute top-10 bottom-10 w-0.5 -translate-x-1/2 border-l-2 border-dashed border-[#D4CCB8]" />
            <motion.div
              style={
                prefersReducedMotion
                  ? undefined
                  : { scaleY: mobileLineScaleY, transformOrigin: 'top' }
              }
              className="absolute top-10 bottom-10 w-[3px] -translate-x-1/2 rounded-full bg-[#1E3A5F] will-change-transform"
            />
            {!prefersReducedMotion && (
              <motion.div
                style={{ y: mobilePlaneY, rotate: 90 }}
                className="absolute top-0 -ml-3.5 -mt-3.5 z-20 will-change-transform"
              >
                <AeroplaneMarkerSvg />
              </motion.div>
            )}
          </div>

          {/* Waypoints List */}
          <div className="space-y-12 md:space-y-20">
            {WEEK_IDS.map((weekId, index) => (
              <WaypointNode
                key={weekId}
                week={campConfig.weeks[weekId]}
                index={index}
              />
            ))}
          </div>

          {/* Destination Marker */}
          <div className="relative z-10 mt-14 flex justify-start pl-1 md:justify-center md:pl-0">
            <div className="inline-flex items-center gap-2.5 rounded-lg border border-[#E5DEC9] bg-[#FFFCF7] px-4 py-2 text-xs font-medium text-[#33465F] shadow-xs">
              <Flag className="h-3.5 w-3.5 text-[#DE546A]" aria-hidden="true" />
              <span className="font-mono text-[#1E3A5F] font-semibold">DESTINATION</span>
              <span aria-hidden="true" className="text-[#D4CCB8]">·</span>
              <span>1 Dec – 21 Dec</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
