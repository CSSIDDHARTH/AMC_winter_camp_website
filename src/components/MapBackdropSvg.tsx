export function MapBackdropSvg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Subtle Aeronautical & Topographic Map Vector Canvas */}
      <svg
        viewBox="0 0 1200 1000"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <pattern id="map-graticule" width="120" height="120" patternUnits="userSpaceOnUse">
            <path
              d="M 120 0 L 0 0 0 120"
              stroke="#1E3A5F"
              strokeOpacity="0.075"
              strokeWidth="1"
            />
            <path
              d="M 60 0 L 60 120 M 0 60 L 120 60"
              stroke="#1E3A5F"
              strokeOpacity="0.035"
              strokeWidth="0.75"
              strokeDasharray="3 4"
            />
          </pattern>
        </defs>

        {/* Cartographic Grid */}
        <rect width="1200" height="1000" fill="url(#map-graticule)" />

        {/* Topographic Contour Region 1 (Upper Left Terrain Ridge) */}
        <g stroke="#1E3A5F" strokeOpacity="0.11" strokeWidth="1.2">
          <path d="M -60 190 C 90 130, 260 150, 340 245 C 405 320, 310 425, 175 445 C 45 465, -75 395, -60 190 Z" />
          <path d="M -20 215 C 95 165, 225 180, 288 255 C 340 315, 265 395, 160 410 C 60 425, -35 365, -20 215 Z" />
          <path d="M 25 245 C 108 205, 195 215, 238 268 C 275 312, 220 365, 145 375 C 75 385, 5 340, 25 245 Z" />
          <path d="M 75 275 C 122 252, 168 258, 190 284 C 210 308, 180 335, 140 340 C 100 345, 62 320, 75 275 Z" />
        </g>

        {/* Topographic Contour Region 2 (Mid-Right Elevation Basin) */}
        <g stroke="#1E3A5F" strokeOpacity="0.11" strokeWidth="1.2">
          <path d="M 760 320 C 910 250, 1140 265, 1250 385 C 1320 465, 1210 615, 1020 625 C 835 635, 675 510, 760 320 Z" />
          <path d="M 815 355 C 930 300, 1105 315, 1190 405 C 1245 465, 1160 575, 1015 585 C 875 595, 750 495, 815 355 Z" />
          <path d="M 870 390 C 955 350, 1075 360, 1135 425 C 1175 468, 1115 540, 1010 545 C 910 550, 825 480, 870 390 Z" />
          <path d="M 935 425 C 985 402, 1045 408, 1075 442 C 1098 468, 1065 504, 1010 506 C 958 508, 912 470, 935 425 Z" />
        </g>

        {/* Topographic Contour Region 3 (Lower Left Valley & Peak) */}
        <g stroke="#1E3A5F" strokeOpacity="0.1" strokeWidth="1.2">
          <path d="M -40 720 C 110 655, 315 685, 395 795 C 460 885, 345 1005, 165 1015 C 5 1025, -90 895, -40 720 Z" />
          <path d="M 15 755 C 125 705, 275 725, 335 808 C 385 875, 295 965, 160 972 C 40 978, -25 880, 15 755 Z" />
          <path d="M 75 790 C 145 758, 235 770, 275 822 C 308 865, 250 925, 162 930 C 82 935, 42 872, 75 790 Z" />
        </g>

        {/* Aeronautical VOR / Compass Range Rings (Subtle Reef Pink & Indigo) */}
        <g transform="translate(1030, 155)" opacity="0.22">
          <circle cx="0" cy="0" r="88" stroke="#1E3A5F" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="0" cy="0" r="56" stroke="#DE546A" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="0" cy="0" r="24" stroke="#1E3A5F" strokeWidth="1" />
          <line x1="-102" y1="0" x2="102" y2="0" stroke="#1E3A5F" strokeWidth="0.9" />
          <line x1="0" y1="-102" x2="0" y2="102" stroke="#1E3A5F" strokeWidth="0.9" />
          <path d="M0 -34 L7 -7 L34 0 L7 7 L0 34 L-7 7 L-34 0 L-7 -7 Z" stroke="#DE546A" strokeWidth="1" fill="rgba(222, 84, 106, 0.08)" />
        </g>

        {/* Secondary Sector Compass Ring (Bottom Right) */}
        <g transform="translate(960, 840)" opacity="0.16">
          <circle cx="0" cy="0" r="74" stroke="#1E3A5F" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="0" cy="0" r="40" stroke="#DE546A" strokeWidth="1" />
          <line x1="-86" y1="0" x2="86" y2="0" stroke="#1E3A5F" strokeWidth="0.8" />
          <line x1="0" y1="-86" x2="0" y2="86" stroke="#1E3A5F" strokeWidth="0.8" />
        </g>

        {/* Crosshair Survey Benchmarks */}
        <g stroke="#DE546A" strokeOpacity="0.28" strokeWidth="1.2">
          <path d="M 352 140 h 16 M 360 132 v 16" />
          <path d="M 832 690 h 16 M 840 682 v 16" />
          <path d="M 272 540 h 16 M 280 532 v 16" />
        </g>
      </svg>

      {/* Soft Dhow Canvas Vignette for Effortless Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8F5EE]/70 via-transparent to-[#F8F5EE]/75" />
    </div>
  );
}
