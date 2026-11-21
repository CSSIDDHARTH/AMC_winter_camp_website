import { Link, NavLink } from 'react-router-dom';

export function Navbar() {
  const navigationStyles = (isActive: boolean) =>
    `text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
      isActive
        ? 'border-[#DE546A] text-[#13243C]'
        : 'border-transparent text-[#4B5E77] hover:text-[#13243C]'
    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] rounded-sm`;

  return (
    <header className="sticky top-3 z-40 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="pointer-events-auto mx-auto flex h-13 max-w-5xl items-center justify-between gap-4 rounded-full border border-[#E5DEC9] bg-[#FFFCF7]/92 px-4 sm:px-6 shadow-sm shadow-[#13243C]/5 backdrop-blur-md">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 rounded-full px-1 py-1 font-display text-sm font-semibold tracking-tight text-[#13243C] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] sm:text-base"
        >
          AMC Winter Camp
        </Link>

        <nav aria-label="Top navigation" className="hidden lg:flex items-center gap-3 lg:gap-5">
          <NavLink to="/" end className={({ isActive }) => navigationStyles(isActive)}>
            Home
          </NavLink>
          <NavLink to="/setup" className={({ isActive }) => navigationStyles(isActive)}>
            Pre-Camp Setup
          </NavLink>
          <NavLink to="/week/1" className={({ isActive }) => navigationStyles(isActive)}>
            Week 1
          </NavLink>
          <NavLink to="/week/2" className={({ isActive }) => navigationStyles(isActive)}>
            Week 2
          </NavLink>
          <NavLink to="/week/3" className={({ isActive }) => navigationStyles(isActive)}>
            Week 3
          </NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => navigationStyles(isActive)}>
            Leaderboard
          </NavLink>
        </nav>

        <Link
          to="/setup"
          className="inline-flex items-center justify-center rounded-full border border-[#1E3A5F]/20 bg-[#F8F5EE] px-3.5 py-1.5 text-xs font-semibold text-[#1E3A5F] transition-colors hover:border-[#DE546A] hover:text-[#B8354B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] lg:hidden"
        >
          Pre-Camp Setup
        </Link>
      </div>
    </header>
  );
}
