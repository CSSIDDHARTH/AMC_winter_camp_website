import { WeekId } from '../config/campConfig';

interface WeekSchematicProps {
  weekId: WeekId;
}

export function WeekSchematic({ weekId }: WeekSchematicProps) {
  if (weekId === 1) {
    // Parametric Airfoil & CAD Rib Wireframe Schematic
    return (
      <svg
        viewBox="0 0 320 120"
        className="h-28 w-full text-[#1E3A5F]"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid-w1" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" stroke="currentColor" strokeOpacity="0.09" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="320" height="120" fill="url(#grid-w1)" />
        <line x1="24" y1="68" x2="296" y2="68" stroke="currentColor" strokeOpacity="0.28" strokeDasharray="4 4" strokeWidth="1" />
        <path
          d="M 38 68 C 44 36, 118 22, 282 68 C 192 78, 102 82, 38 68 Z"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="rgba(30, 58, 95, 0.08)"
        />
        <line x1="92" y1="36" x2="92" y2="75" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
        <line x1="146" y1="35" x2="146" y2="76" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
        <line x1="202" y1="45" x2="202" y2="73" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
        <circle cx="118" cy="54" r="7" stroke="#DE546A" strokeOpacity="0.8" strokeWidth="1.3" />
        <circle cx="174" cy="57" r="5" stroke="#DE546A" strokeOpacity="0.8" strokeWidth="1.3" />
        <line x1="38" y1="96" x2="282" y2="96" stroke="#7A8799" strokeWidth="1" />
        <line x1="38" y1="91" x2="38" y2="101" stroke="#7A8799" strokeWidth="1" />
        <line x1="282" y1="91" x2="282" y2="101" stroke="#7A8799" strokeWidth="1" />
        <circle cx="38" cy="68" r="2.5" fill="#DE546A" />
        <circle cx="282" cy="68" r="2.5" fill="#DE546A" />
      </svg>
    );
  }

  if (weekId === 2) {
    // ROS 2 Computation Node Graph Schematic
    return (
      <svg
        viewBox="0 0 320 120"
        className="h-28 w-full text-[#1E3A5F]"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid-w2" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" stroke="currentColor" strokeOpacity="0.09" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="320" height="120" fill="url(#grid-w2)" />
        <path d="M 88 38 C 122 38, 122 60, 142 60" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4" />
        <path d="M 88 82 C 122 82, 122 60, 142 60" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4" />
        <path d="M 192 60 L 236 60" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" />
        <path d="M 230 56 L 238 60 L 230 64" stroke="currentColor" strokeWidth="1.4" />
        <rect x="26" y="24" width="62" height="28" rx="4" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.2" fill="#FFFCF7" />
        <line x1="36" y1="38" x2="78" y2="38" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
        <rect x="26" y="68" width="62" height="28" rx="4" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.2" fill="#FFFCF7" />
        <line x1="36" y1="82" x2="78" y2="82" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
        <rect x="142" y="42" width="50" height="36" rx="18" stroke="#DE546A" strokeWidth="1.6" fill="rgba(222, 84, 106, 0.1)" />
        <circle cx="167" cy="60" r="5" stroke="#DE546A" strokeWidth="1.4" />
        <rect x="238" y="42" width="58" height="36" rx="4" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.4" fill="#FFFCF7" />
        <circle cx="255" cy="60" r="6" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle cx="278" cy="60" r="6" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
      </svg>
    );
  }

  // Week 3: UAV Propulsion & Component Integration Schematic
  return (
    <svg
      viewBox="0 0 320 120"
      className="h-28 w-full text-[#1E3A5F]"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid-w3" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" stroke="currentColor" strokeOpacity="0.09" strokeWidth="0.75" />
        </pattern>
      </defs>
      <rect width="320" height="120" fill="url(#grid-w3)" />
      <line x1="80" y1="60" x2="132" y2="60" stroke="#DE546A" strokeWidth="1.6" />
      <line x1="188" y1="44" x2="236" y2="34" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.3" />
      <line x1="188" y1="76" x2="236" y2="86" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.3" />
      <rect x="28" y="40" width="52" height="40" rx="4" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.4" fill="#FFFCF7" />
      <line x1="42" y1="48" x2="42" y2="72" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      <line x1="54" y1="48" x2="54" y2="72" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      <line x1="66" y1="48" x2="66" y2="72" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      <rect x="132" y="34" width="56" height="52" rx="4" stroke="#DE546A" strokeWidth="1.6" fill="rgba(222, 84, 106, 0.08)" />
      <rect x="148" y="48" width="24" height="24" rx="2" stroke="#DE546A" strokeOpacity="0.7" strokeWidth="1.2" />
      <circle cx="262" cy="34" r="16" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.3" fill="#FFFCF7" />
      <circle cx="262" cy="34" r="5" stroke="#DE546A" strokeWidth="1.3" />
      <line x1="238" y1="34" x2="286" y2="34" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="262" cy="86" r="16" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.3" fill="#FFFCF7" />
      <circle cx="262" cy="86" r="5" stroke="#DE546A" strokeWidth="1.3" />
      <line x1="238" y1="86" x2="286" y2="86" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
    </svg>
  );
}
