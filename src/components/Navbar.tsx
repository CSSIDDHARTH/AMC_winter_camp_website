import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleExploreRoadmapClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      event.preventDefault();
      document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#roadmap');
    }
  };

  return (
    <header className="sticky top-3 z-40 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="pointer-events-auto mx-auto flex h-13 max-w-4xl items-center justify-between gap-6 rounded-full border border-[#E5DEC9] bg-[#FFFCF7]/92 px-4 sm:px-6 shadow-sm shadow-[#13243C]/5 backdrop-blur-md">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2 text-sm sm:text-base font-semibold tracking-tight text-[#13243C] whitespace-nowrap shrink-0 rounded-full px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F]"
        >
          <span className="font-display">AMC Winter Camp</span>
        </Link>

        {/* Zone 2: Concise single-line nav links */}
        <nav aria-label="Top navigation" className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                isActive
                  ? 'border-[#DE546A] text-[#13243C]'
                  : 'border-transparent text-[#4B5E77] hover:text-[#13243C]'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] rounded-sm`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/week/1"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                isActive
                  ? 'border-[#DE546A] text-[#13243C]'
                  : 'border-transparent text-[#4B5E77] hover:text-[#13243C]'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] rounded-sm`
            }
          >
            Week 1
          </NavLink>
          <NavLink
            to="/week/2"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                isActive
                  ? 'border-[#DE546A] text-[#13243C]'
                  : 'border-transparent text-[#4B5E77] hover:text-[#13243C]'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] rounded-sm`
            }
          >
            Week 2
          </NavLink>
          <NavLink
            to="/week/3"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                isActive
                  ? 'border-[#DE546A] text-[#13243C]'
                  : 'border-transparent text-[#4B5E77] hover:text-[#13243C]'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] rounded-sm`
            }
          >
            Week 3
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                isActive
                  ? 'border-[#DE546A] text-[#13243C]'
                  : 'border-transparent text-[#4B5E77] hover:text-[#13243C]'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] rounded-sm`
            }
          >
            Leaderboard
          </NavLink>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <a
            href="/#roadmap"
            onClick={handleExploreRoadmapClick}
            className="inline-flex items-center justify-center rounded-full bg-[#1E3A5F] px-4 py-1.5 text-xs font-semibold text-[#FFFCF7] transition-colors hover:bg-[#B8354B] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] focus-visible:ring-offset-2"
          >
            Roadmap
          </a>
        </div>
      </div>
    </header>
  );
}
