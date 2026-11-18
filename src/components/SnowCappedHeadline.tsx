const SNOW_CAP_PATHS = [
  // Variant 0: "AMC" — twin soft drifts with gentle valley over M
  {
    mound:
      'M 2 14 C 5 4, 22 2, 34 9 C 46 3, 66 2, 78 10 C 89 4, 108 3, 118 13 L 118 18 C 107 20, 99 16, 91 20 C 85 24, 81 17, 72 19 C 61 21, 52 15, 42 19 C 33 23, 25 16, 15 19 C 8 21, 3 18, 2 14 Z',
    shadow:
      'M 3 15 C 12 18, 24 14, 34 19 C 45 23, 56 16, 68 19 C 80 22, 92 15, 104 19 C 110 21, 115 18, 118 15 L 118 18 C 107 20, 99 16, 91 20 C 85 24, 81 17, 72 19 C 61 21, 52 15, 42 19 C 33 23, 25 16, 15 19 C 8 21, 3 18, 2 14 Z',
    icicles: 'M 28 18 Q 29 27 31 18 M 86 19 Q 87.5 29 89 19',
    sparkles: [
      { cx: 24, cy: 7 },
      { cx: 98, cy: 8 },
    ],
  },
  // Variant 1: "WINTER" — broad undulating alpine snowdrift
  {
    mound:
      'M 1 14 C 6 4, 20 3, 31 8 C 44 1, 63 2, 75 9 C 87 3, 102 4, 117 13 L 119 18 C 108 21, 98 15, 88 20 C 78 24, 70 16, 59 19 C 49 22, 39 15, 29 20 C 19 23, 9 17, 1 14 Z',
    shadow:
      'M 2 15 C 13 18, 23 15, 33 19 C 44 22, 54 15, 65 19 C 76 23, 88 15, 99 19 C 108 21, 114 18, 119 15 L 119 18 C 108 21, 98 15, 88 20 C 78 24, 70 16, 59 19 C 49 22, 39 15, 29 20 C 19 23, 9 17, 1 14 Z',
    icicles: 'M 46 18 Q 47.5 28 49 18 M 102 18 Q 103.5 26 105 18',
    sparkles: [
      { cx: 52, cy: 6 },
      { cx: 88, cy: 9 },
    ],
  },
  // Variant 2: "CAMP" — crested left & right mounds
  {
    mound:
      'M 2 13 C 9 3, 28 1, 42 9 C 54 3, 72 4, 84 10 C 96 2, 110 4, 118 14 L 118 18 C 109 21, 97 16, 87 20 C 76 23, 66 16, 55 19 C 43 22, 31 15, 20 20 C 11 22, 5 18, 2 13 Z',
    shadow:
      'M 3 14 C 12 18, 24 15, 35 19 C 46 21, 58 15, 69 19 C 81 22, 94 16, 106 19 C 112 20, 116 18, 118 15 L 118 18 C 109 21, 97 16, 87 20 C 76 23, 66 16, 55 19 C 43 22, 31 15, 20 20 C 11 22, 5 18, 2 13 Z',
    icicles: 'M 19 18 Q 20.5 26 22 18 M 74 18 Q 75.5 28 77 18',
    sparkles: [
      { cx: 34, cy: 7 },
      { cx: 103, cy: 8 },
    ],
  },
  // Variant 3: "2026–27" — crisp frost ridge across numerals
  {
    mound:
      'M 2 14 C 8 4, 24 3, 37 9 C 50 3, 68 3, 81 9 C 94 4, 109 4, 118 13 L 118 18 C 108 20, 96 16, 85 20 C 74 23, 63 16, 52 19 C 40 22, 29 16, 17 19 C 9 21, 4 18, 2 14 Z',
    shadow:
      'M 3 15 C 14 18, 26 15, 38 19 C 49 21, 61 16, 73 19 C 85 22, 97 16, 108 19 C 113 20, 116 18, 118 15 L 118 18 C 108 20, 96 16, 85 20 C 74 23, 63 16, 52 19 C 40 22, 29 16, 17 19 C 9 21, 4 18, 2 14 Z',
    icicles: 'M 59 18 Q 60.5 27 62 18',
    sparkles: [
      { cx: 42, cy: 7 },
      { cx: 94, cy: 8 },
    ],
  },
];

function SnowCappedWord({
  word,
  variant,
}: {
  word: string;
  variant: number;
}) {
  const shape = SNOW_CAP_PATHS[variant % SNOW_CAP_PATHS.length];

  return (
    <span className="relative inline-block leading-none">
      {/* Subtle frosty halo on letters */}
      <span className="relative z-0 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
        {word}
      </span>

      {/* Layered snowdrift cap resting along the top edge of the letters */}
      <svg
        viewBox="0 0 120 30"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute top-[0.01em] -left-[0.02em] z-10 h-[0.30em] w-[calc(100%+0.04em)] drop-shadow-[0_2px_2px_rgba(19,36,60,0.24)]"
      >
        {/* Main fresh snow mound */}
        <path d={shape.mound} fill="#FFFFFF" />
        {/* Cool glacial shadow along the snow lip */}
        <path d={shape.shadow} fill="#CFE2F5" fillOpacity="0.92" />
        {/* Delicate frost icicle drips */}
        <path
          d={shape.icicles}
          fill="#E8F3FC"
          stroke="#CFE2F5"
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        {/* Crisp snow crest highlights */}
        {shape.sparkles.map((pt, idx) => (
          <circle
            key={idx}
            cx={pt.cx}
            cy={pt.cy}
            r="1.35"
            fill="#FFFFFF"
          />
        ))}
      </svg>
    </span>
  );
}

export function SnowCappedHeadline() {
  const words = ['AMC', 'WINTER', 'CAMP', '2026–27'];

  return (
    <h1
      aria-label="AMC WINTER CAMP 2026–27"
      className="font-display text-4xl font-bold tracking-tight text-[#13243C] sm:text-5xl lg:text-[3.55rem] leading-[1.24] text-balance"
    >
      {words.map((word, idx) => (
        <span key={word}>
          <SnowCappedWord word={word} variant={idx} />
          {idx < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </h1>
  );
}
