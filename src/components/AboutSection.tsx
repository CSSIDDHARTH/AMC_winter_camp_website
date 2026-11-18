const PILLARS = [
  {
    index: '01.',
    title: 'Learning by Doing',
    description:
      'Every module pairs curated technical documentation with tangible engineering tasks so concepts are reinforced through direct practice.',
  },
  {
    index: '02.',
    title: 'Engineering Problem-Solving',
    description:
      'Challenges are structured around real constraints—geometric tolerances, software architectures, and UAV payload trade-offs.',
  },
  {
    index: '03.',
    title: 'Independent Exploration',
    description:
      'Self-paced guidance encourages you to investigate documentation, test hypotheses, and build confidence beyond step-by-step recipes.',
  },
  {
    index: '04.',
    title: 'Practical Application',
    description:
      'Skills gained across mechanical design, robotics middleware, and hardware selection connect directly to real aeromodelling workflows.',
  },
];

export function AboutSection() {
  return (
    <section className="border-b border-[#E5DEC9] bg-[#FFFCF7]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[#13243C] sm:text-3xl text-balance">
              About the Winter Camp
            </h2>
            <p className="text-base leading-relaxed text-[#33465F]">
              Running from <span className="font-semibold text-[#13243C]">1 Dec – 21 Dec</span>, the
              AMC Winter Camp is structured to help participants build practical engineering fluency
              through self-paced learning, guided technical tutorials, and structured weekly assignments.
            </p>
            <p className="text-sm leading-relaxed text-[#5A6C84]">
              Instead of passive lectures, each week focuses on mastering a foundational discipline
              in modern autonomous flight systems—progressing systematically from digital design
              and simulation to physical system integration.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 border-t border-[#E5DEC9] pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            {PILLARS.map((pillar) => (
              <div key={pillar.index} className="space-y-2">
                <div className="font-mono text-xs font-semibold text-[#B8354B] tabular-nums">
                  {pillar.index}
                </div>
                <h3 className="font-display text-lg font-semibold text-[#13243C]">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4B5E77]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
