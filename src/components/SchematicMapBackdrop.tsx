export function SchematicMapBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#F8F5EE]"
    >
      <svg
        viewBox="0 0 1440 1200"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          {/* Fine Cartographic Survey Grid */}
          <pattern id="map-survey-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              stroke="#1E3A5F"
              strokeOpacity="0.065"
              strokeWidth="0.8"
            />
          </pattern>

          {/* Subtle Greenery Stipple Pattern */}
          <pattern id="greenery-stipple" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="6" r="0.9" fill="#5D7D54" fillOpacity="0.25" />
            <circle cx="14" cy="15" r="0.8" fill="#5D7D54" fillOpacity="0.2" />
          </pattern>
        </defs>

        {/* Base Survey Grid */}
        <rect width="1440" height="1200" fill="url(#map-survey-grid)" />

        {/* Organic Meadow & Woodland Greenery Zones */}
        <path
          d="M -40 110 C 120 70, 260 150, 340 240 C 420 330, 310 430, 170 460 C 50 485, -30 410, -40 310 Z"
          fill="#E2ECDA"
          fillOpacity="0.85"
        />
        <path
          d="M -20 145 C 100 120, 210 180, 260 255 C 310 330, 220 390, 110 400 C 10 410, -25 340, -20 145 Z"
          fill="url(#greenery-stipple)"
        />

        <path
          d="M 1060 -20 C 1220 20, 1380 80, 1480 210 L 1480 510 C 1340 530, 1180 470, 1080 380 C 980 290, 960 100, 1060 -20 Z"
          fill="#DFEAD6"
          fillOpacity="0.85"
        />
        <path
          d="M 1110 40 C 1240 70, 1360 140, 1430 240 C 1470 310, 1410 430, 1270 430 C 1150 430, 1060 320, 1070 190 Z"
          fill="url(#greenery-stipple)"
        />

        <path
          d="M 80 760 C 210 710, 380 740, 440 850 C 500 960, 410 1130, 250 1170 C 110 1200, -20 1120, -30 980 C -40 850, 10 785, 80 760 Z"
          fill="#E3EDD9"
          fillOpacity="0.85"
        />
        <path
          d="M 120 805 C 230 770, 350 800, 395 885 C 435 965, 360 1090, 235 1110 C 125 1125, 35 1060, 35 955 Z"
          fill="url(#greenery-stipple)"
        />

        <path
          d="M 990 690 C 1130 640, 1310 680, 1460 770 L 1460 1160 C 1300 1190, 1100 1130, 1020 1010 C 940 890, 910 720, 990 690 Z"
          fill="#DCE8D2"
          fillOpacity="0.82"
        />

        {/* Topographic Elevation Contour Lines */}
        <g stroke="#7A9670" strokeOpacity="0.26" strokeWidth="1.15">
          <path d="M 880 120 C 980 90, 1140 110, 1250 200 C 1360 290, 1370 420, 1260 490 C 1150 560, 970 500, 890 390 C 810 280, 780 150, 880 120 Z" />
          <path d="M 935 165 C 1020 140, 1130 160, 1210 230 C 1290 300, 1295 395, 1215 445 C 1135 495, 1005 445, 945 360 C 885 275, 850 190, 935 165 Z" />
          <path d="M 110 790 C 200 760, 310 790, 365 860 C 420 930, 385 1040, 290 1075 C 195 1110, 95 1050, 75 960 C 55 870, 20 820, 110 790 Z" />
          <path d="M 1035 745 C 1140 715, 1270 755, 1340 845 C 1410 935, 1370 1060, 1255 1095 C 1140 1130, 1025 1055, 995 950 C 965 845, 930 775, 1035 745 Z" />
        </g>

        {/* Meandering River / Waterway Channel */}
        <path
          d="M -60 610 C 140 560, 290 645, 480 595 C 670 545, 830 430, 1030 495 C 1230 560, 1350 510, 1500 560"
          stroke="#CBDCEB"
          strokeWidth="26"
          strokeLinecap="round"
        />
        <path
          d="M -60 610 C 140 560, 290 645, 480 595 C 670 545, 830 430, 1030 495 C 1230 560, 1350 510, 1500 560"
          stroke="#98B7D4"
          strokeOpacity="0.65"
          strokeWidth="1.4"
          strokeDasharray="8 6"
        />

        {/* Schematic Campus/Field Roads & Airstrip Axis */}
        <g stroke="#1E3A5F" strokeOpacity="0.14" strokeWidth="1.5">
          <path d="M 0 265 L 490 265 Q 540 265 565 310 L 675 510" />
          <path d="M 1440 885 L 920 885 Q 870 885 845 840 L 745 660" />
          <path d="M 290 0 L 290 540" strokeDasharray="5 5" />
          <path d="M 1160 540 L 1160 1200" strokeDasharray="5 5" />
        </g>

        {/* Stylized Airfield Runway Schematic (Top-Left Quadrant) */}
        <g transform="translate(86, 515) rotate(-18)" opacity="0.55">
          <rect x="0" y="0" width="156" height="24" rx="3" fill="#FFFCF7" stroke="#1E3A5F" strokeOpacity="0.3" strokeWidth="1.2" />
          <line x1="14" y1="12" x2="142" y2="12" stroke="#1E3A5F" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="10 7" />
          <line x1="8" y1="5" x2="8" y2="19" stroke="#DE546A" strokeOpacity="0.6" strokeWidth="1.5" />
          <line x1="148" y1="5" x2="148" y2="19" stroke="#DE546A" strokeOpacity="0.6" strokeWidth="1.5" />
        </g>

        {/* Top-Down Botanical Tree Canopy Clusters (Greenery Detail) */}
        {[
          { x: 118, y: 176, r: 16 },
          { x: 146, y: 162, r: 12 },
          { x: 136, y: 196, r: 11 },
          { x: 215, y: 342, r: 15 },
          { x: 242, y: 328, r: 11 },
          { x: 1245, y: 155, r: 18 },
          { x: 1278, y: 175, r: 13 },
          { x: 1222, y: 182, r: 12 },
          { x: 1310, y: 365, r: 16 },
          { x: 1280, y: 382, r: 11 },
          { x: 168, y: 895, r: 17 },
          { x: 198, y: 912, r: 12 },
          { x: 144, y: 920, r: 11 },
          { x: 292, y: 995, r: 15 },
          { x: 1152, y: 815, r: 16 },
          { x: 1182, y: 832, r: 12 },
          { x: 1285, y: 965, r: 18 },
          { x: 1255, y: 985, r: 13 },
          { x: 1316, y: 982, r: 11 },
        ].map((tree, idx) => (
          <g key={idx}>
            <circle
              cx={tree.x}
              cy={tree.y}
              r={tree.r}
              fill="#B9CFAF"
              fillOpacity="0.65"
              stroke="#6D8E62"
              strokeOpacity="0.45"
              strokeWidth="1.1"
            />
            <circle
              cx={tree.x - tree.r * 0.18}
              cy={tree.y - tree.r * 0.18}
              r={tree.r * 0.42}
              fill="#D2E2CA"
              fillOpacity="0.7"
            />
          </g>
        ))}

        {/* Cartographic Compass Rose (Bottom-Right Corner) */}
        <g transform="translate(1320, 1065)" opacity="0.65">
          <circle cx="0" cy="0" r="36" stroke="#1E3A5F" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="24" stroke="#1E3A5F" strokeOpacity="0.22" strokeWidth="1" />
          <path d="M 0 -32 L 6 -6 L 0 -10 L -6 -6 Z" fill="#DE546A" />
          <path d="M 0 32 L 6 6 L 0 10 L -6 6 Z" fill="#1E3A5F" fillOpacity="0.45" />
          <path d="M 32 0 L 6 6 L 10 0 L 6 -6 Z" fill="#1E3A5F" fillOpacity="0.45" />
          <path d="M -32 0 L -6 6 L -10 0 L -6 -6 Z" fill="#1E3A5F" fillOpacity="0.45" />
          <circle cx="0" cy="0" r="3" fill="#FFFCF7" stroke="#1E3A5F" strokeWidth="1.2" />
          <text
            x="0"
            y="-42"
            textAnchor="middle"
            fill="#1E3A5F"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
          >
            N
          </text>
        </g>
      </svg>

      {/* Soft top/bottom atmospheric vignette to keep cards & typography crisp */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F8F5EE] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F8F5EE] to-transparent" />
    </div>
  );
}
