const GUIDELINES = [
  'Participants should follow the weekly instructions carefully.',
  'Tasks will be released progressively.',
  'Submissions will be collected using Google Forms.',
  'Deadlines and evaluation criteria will be announced with the respective tasks.',
  'Participants are encouraged to understand and independently implement their solutions.',
];

export function GuidelinesSection() {
  return (
    <section className="bg-[#F8F5EE]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wide text-[#B8354B]">
              <span>Participation</span>
              <span aria-hidden="true" className="text-[#C8BFA8]">·</span>
              <span className="text-[#5A6C84]">05 Essentials</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.025em] leading-[1.08] text-[#13243C] sm:text-4xl text-balance">
              General <span className="text-[#B8354B]">Guidelines</span>
            </h2>
            <div
              aria-hidden="true"
              className="h-[3px] w-12 rounded-full bg-gradient-to-r from-[#DE546A] to-[#1E3A5F]"
            />
            <p className="pt-1 text-sm leading-relaxed text-[#4B5E77] sm:text-base">
              Please review the core participation guidelines before beginning each weekly module.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-[#EFE9DC] rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] shadow-xs">
              {GUIDELINES.map((guideline, index) => (
                <li
                  key={guideline}
                  className="flex items-start gap-4 px-6 py-4 sm:py-5"
                >
                  <span className="mt-0.5 font-mono text-xs font-semibold text-[#B8354B] tabular-nums shrink-0">
                    0{index + 1}.
                  </span>
                  <span className="text-sm leading-relaxed text-[#33465F] sm:text-base">
                    {guideline}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
