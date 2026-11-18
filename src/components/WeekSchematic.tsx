import { useId } from 'react';
import { WeekId } from '../config/campConfig';

interface WeekSchematicProps {
  weekId: WeekId;
}

export function WeekSchematic({ weekId }: WeekSchematicProps) {
  const uid = useId();
  const gridId = `grid-w${weekId}-${uid}`;

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
          <pattern id={gridId} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" stroke="currentColor" strokeOpacity="0.09" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="320" height="120" fill={`url(#${gridId})`} />
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
    // ROS 2 Computation Graph, Topics & Isometric Gazebo Simulation Frame
    return (
      <svg
        viewBox="0 0 320 120"
        className="h-28 w-full text-[#1E3A5F]"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id={gridId} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" stroke="currentColor" strokeOpacity="0.09" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="320" height="120" fill={`url(#${gridId})`} />

        {/* Topic Pub/Sub Routing Arcs */}
        <path
          d="M 78 34 C 102 34, 104 54, 122 57"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1.3"
          strokeDasharray="3 2.5"
        />
        <path
          d="M 78 86 C 102 86, 104 66, 122 63"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1.3"
          strokeDasharray="3 2.5"
        />
        <path d="M 184 60 L 222 60" stroke="#DE546A" strokeWidth="1.6" />
        <path d="M 216 56 L 224 60 L 216 64" stroke="#DE546A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Topic Labels */}
        <text
          x="100"
          y="29"
          textAnchor="middle"
          fill="#5A6C84"
          fontSize="7"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
        >
          /imu
        </text>
        <text
          x="100"
          y="97"
          textAnchor="middle"
          fill="#5A6C84"
          fontSize="7"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
        >
          /odom
        </text>
        <text
          x="203"
          y="53"
          textAnchor="middle"
          fill="#B8354B"
          fontSize="7"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
        >
          /cmd
        </text>

        {/* Publisher Node 1: Sensor IMU */}
        <rect x="18" y="21" width="60" height="26" rx="5" fill="#FFFCF7" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" />
        <circle cx="28" cy="34" r="2.2" fill="#DE546A" />
        <text x="51" y="37" textAnchor="middle" fill="#13243C" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          IMU
        </text>

        {/* Publisher Node 2: Vision / Pose */}
        <rect x="18" y="73" width="60" height="26" rx="5" fill="#FFFCF7" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" />
        <circle cx="28" cy="86" r="2.2" fill="#1E3A5F" />
        <text x="51" y="89" textAnchor="middle" fill="#13243C" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          POSE
        </text>

        {/* Central ROS 2 Node with iconic 3x3 9-dot Matrix Emblem */}
        <rect
          x="122"
          y="33"
          width="62"
          height="54"
          rx="12"
          fill="rgba(222, 84, 106, 0.09)"
          stroke="#DE546A"
          strokeWidth="1.6"
        />
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={143 + col * 10}
              cy={45 + row * 9}
              r={row === 1 && col === 1 ? 2.6 : 2.1}
              fill={row === 1 && col === 1 ? '#DE546A' : '#1E3A5F'}
            />
          ))
        )}
        <text
          x="153"
          y="79"
          textAnchor="middle"
          fill="#B8354B"
          fontSize="7.5"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="700"
        >
          ROS 2
        </text>

        {/* Right: Simulated UAV inside Isometric Gazebo Frame */}
        <polygon
          points="265,20 302,36 302,84 265,100 228,84 228,36"
          fill="#FFFCF7"
          fillOpacity="0.85"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.1"
          strokeDasharray="3 2"
        />
        {/* Isometric Axis Triad */}
        <path d="M 265 60 L 265 36 M 265 60 L 287 71 M 265 60 L 243 71" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
        {/* Quadcopter Silhouette in Sim Frame */}
        <line x1="244" y1="47" x2="286" y2="73" stroke="#1E3A5F" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="286" y1="47" x2="244" y2="73" stroke="#1E3A5F" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="259" y="54" width="12" height="12" rx="3" fill="#1E3A5F" />
        <circle cx="265" cy="60" r="2.5" fill="#DE546A" />
        <ellipse cx="244" cy="47" rx="8" ry="3.2" stroke="#DE546A" strokeWidth="1.2" fill="rgba(222,84,106,0.12)" />
        <ellipse cx="286" cy="47" rx="8" ry="3.2" stroke="#DE546A" strokeWidth="1.2" fill="rgba(222,84,106,0.12)" />
        <ellipse cx="244" cy="73" rx="8" ry="3.2" stroke="#1E3A5F" strokeWidth="1.2" fill="rgba(30,58,95,0.08)" />
        <ellipse cx="286" cy="73" rx="8" ry="3.2" stroke="#1E3A5F" strokeWidth="1.2" fill="rgba(30,58,95,0.08)" />
      </svg>
    );
  }

  // Week 3: UAV Component Selection Schematic (LiPo Battery -> FC/ESC PCB -> BLDC Motor+Prop & GNSS)
  return (
    <svg
      viewBox="0 0 320 120"
      className="h-28 w-full text-[#1E3A5F]"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id={gridId} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" stroke="currentColor" strokeOpacity="0.09" strokeWidth="0.75" />
        </pattern>
      </defs>
      <rect width="320" height="120" fill={`url(#${gridId})`} />

      {/* Power Bus (LiPo -> FC/ESC -> BLDC) */}
      <path d="M 76 54 L 116 54" stroke="#DE546A" strokeWidth="2" />
      <path d="M 76 66 L 116 66" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.8" />
      <path d="M 184 48 L 210 48 L 222 36 L 240 36" stroke="#DE546A" strokeWidth="1.6" />
      {/* Signal Bus (FC -> GNSS / Telemetry) */}
      <path d="M 184 74 L 210 74 L 222 86 L 236 86" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" strokeDasharray="3 2.5" />

      {/* 1. Left: 4S LiPo Battery Pack + XT60 Plug */}
      <rect x="20" y="34" width="46" height="52" rx="4" fill="#FFFCF7" stroke="currentColor" strokeWidth="1.4" />
      {/* Individual LiPo cells */}
      <rect x="26" y="41" width="34" height="7" rx="1.5" fill="rgba(30, 58, 95, 0.1)" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.8" />
      <rect x="26" y="51" width="34" height="7" rx="1.5" fill="rgba(30, 58, 95, 0.1)" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.8" />
      <rect x="26" y="61" width="34" height="7" rx="1.5" fill="rgba(30, 58, 95, 0.1)" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.8" />
      <text x="43" y="79" textAnchor="middle" fill="#B8354B" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
        4S LiPo
      </text>
      {/* XT60 Connector Block */}
      <rect x="66" y="48" width="10" height="24" rx="2" fill="#DE546A" fillOpacity="0.18" stroke="#DE546A" strokeWidth="1.2" />

      {/* 2. Center: Flight Controller & 4-in-1 ESC PCB Stack */}
      <rect
        x="116"
        y="26"
        width="68"
        height="68"
        rx="6"
        fill="#FFFCF7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* 4x M3 Corner Mounting Holes */}
      <circle cx="123" cy="33" r="2.3" stroke="#DE546A" strokeWidth="1.1" />
      <circle cx="177" cy="33" r="2.3" stroke="#DE546A" strokeWidth="1.1" />
      <circle cx="123" cy="87" r="2.3" stroke="#DE546A" strokeWidth="1.1" />
      <circle cx="177" cy="87" r="2.3" stroke="#DE546A" strokeWidth="1.1" />

      {/* STM32 MCU Chip + IC Pins */}
      <rect
        x="138"
        y="46"
        width="24"
        height="24"
        rx="2.5"
        fill="rgba(222, 84, 106, 0.12)"
        stroke="#DE546A"
        strokeWidth="1.4"
      />
      {/* IC pins */}
      <path
        d="M144 42v4 M150 42v4 M156 42v4 M144 70v4 M150 70v4 M156 70v4 M134 52h4 M134 58h4 M134 64h4 M162 52h4 M162 58h4 M162 64h4"
        stroke="currentColor"
        strokeOpacity="0.65"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <text x="150" y="61" textAnchor="middle" fill="#13243C" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="700">
        FC
      </text>
      <text x="150" y="87" textAnchor="middle" fill="#5A6C84" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        ESC
      </text>

      {/* 3. Upper Right: Brushless Outrunner Motor + Propeller Airfoil */}
      {/* Propeller Blade */}
      <path
        d="M 230 23 C 244 18, 258 21, 265 23 C 272 21, 286 18, 300 23 C 286 26, 272 25, 265 24 C 258 25, 244 26, 230 23 Z"
        fill="rgba(30, 58, 95, 0.14)"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* Prop Spinner Nut */}
      <path d="M 262 22 L 265 16 L 268 22 Z" fill="#DE546A" />
      {/* Motor Shaft */}
      <line x1="265" y1="24" x2="265" y2="29" stroke="currentColor" strokeWidth="2" />
      {/* Brushless Motor Bell */}
      <rect x="247" y="29" width="36" height="17" rx="3" fill="#FFFCF7" stroke="currentColor" strokeWidth="1.4" />
      {/* Stator Copper Windings */}
      <line x1="254" y1="33" x2="254" y2="42" stroke="#DE546A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="261" y1="33" x2="261" y2="42" stroke="#DE546A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="269" y1="33" x2="269" y2="42" stroke="#DE546A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="276" y1="33" x2="276" y2="42" stroke="#DE546A" strokeWidth="1.8" strokeLinecap="round" />
      {/* Motor Mount Base */}
      <rect x="243" y="46" width="44" height="4" rx="1.5" fill="currentColor" fillOpacity="0.75" />
      <text x="265" y="59" textAnchor="middle" fill="#5A6C84" fontSize="6.8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        BLDC 2306
      </text>

      {/* 4. Lower Right: GPS / Telemetry Receiver Module */}
      <rect x="236" y="72" width="56" height="30" rx="5" fill="#FFFCF7" stroke="currentColor" strokeWidth="1.4" />
      {/* Ceramic Patch Antenna */}
      <rect x="242" y="77" width="20" height="15" rx="2" fill="rgba(222, 84, 106, 0.14)" stroke="#DE546A" strokeWidth="1.1" />
      <circle cx="252" cy="84.5" r="2" fill="#DE546A" />
      {/* RF Signal Waves */}
      <path d="M 271 80 A 7 7 0 0 1 271 90" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 276 77 A 11 11 0 0 1 276 93" stroke="#DE546A" strokeWidth="1.2" strokeLinecap="round" />
      <text x="264" y="99" textAnchor="middle" fill="#5A6C84" fontSize="6.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        GNSS / RF
      </text>
    </svg>
  );
}
