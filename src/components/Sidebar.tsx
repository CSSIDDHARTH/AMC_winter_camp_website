import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Home,
  Layers,
  Lock,
  Network,
  Trophy,
} from 'lucide-react';
import { campConfig, WEEK_IDS, WeekId } from '../config/campConfig';

const WEEK_SECTIONS = [
  { key: 'instructions', label: 'Instructions' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'submission', label: 'Submission' },
] as const;

const WEEK_ICONS: Record<WeekId, typeof Layers> = {
  1: Layers,
  2: Network,
  3: Cpu,
};

export function Sidebar() {
  const location = useLocation();
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState<Record<WeekId, boolean>>({
    1: true,
    2: false,
    3: false,
  });

  useEffect(() => {
    setMobileExpanded(false);
    const match = location.pathname.match(/^\/week\/([123])/);
    if (match) {
      const id = Number(match[1]) as WeekId;
      setExpandedWeeks((prev) => ({ ...prev, [id]: true }));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileExpanded) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileExpanded(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileExpanded]);

  const toggleWeekGroup = (weekId: WeekId, isRail: boolean, onExpandSidebar: () => void) => {
    if (isRail) {
      onExpandSidebar();
      setExpandedWeeks((prev) => ({ ...prev, [weekId]: true }));
      return;
    }
    setExpandedWeeks((prev) => ({ ...prev, [weekId]: !prev[weekId] }));
  };

  const renderContent = (isRail: boolean, onToggle: () => void) => (
    <div className="flex h-full flex-col bg-[#13243C] text-[#F8F5EE] border-r border-[#243B5C]">
      {/* Sidebar Header */}
      <div
        className={`flex h-16 items-center border-b border-[#243B5C] px-3 ${
          isRail ? 'justify-center' : 'justify-between px-4'
        }`}
      >
        {!isRail && (
          <Link
            to="/"
            className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-[#FFFCF7] whitespace-nowrap overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE546A] rounded"
          >
            <img
              src="/assets/aistudio/aeromodellingClub_7a388ce9.png"
              alt="Aeromodelling Club IIT (BHU) logo"
              className="h-8 w-8 rounded-md border border-[#2B466B] bg-black object-contain p-0.5 shrink-0"
            />
            <span className="font-display truncate">AMC Winter Camp</span>
          </Link>
        )}

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={!isRail}
          aria-label={isRail ? 'Expand sidebar menu' : 'Collapse sidebar menu'}
          title={isRail ? 'Expand sidebar' : 'Collapse sidebar'}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#2B466B] bg-[#1B314F] text-[#F8F5EE] transition-colors hover:border-[#DE546A] hover:bg-[#233E63] hover:text-[#F48B9B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE546A]"
        >
          {isRail ? (
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Navigation Tree */}
      <nav
        aria-label="Camp sidebar navigation"
        className="flex-1 overflow-y-auto px-2 py-4 space-y-1.5"
      >
        <NavLink
          to="/"
          end
          title={isRail ? 'Home' : undefined}
          className={({ isActive }) =>
            `flex min-h-[42px] items-center rounded-lg px-3 text-sm font-medium transition-colors ${
              isRail ? 'justify-center px-0' : 'gap-3'
            } ${
              isActive
                ? 'bg-[#DE546A]/18 text-[#FFFCF7] border border-[#DE546A]/45'
                : 'text-[#D9D4C7] hover:bg-[#1B314F] hover:text-[#FFFCF7] border border-transparent'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE546A]`
          }
        >
          {({ isActive }) => (
            <>
              <Home
                className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#F48B9B]' : 'text-[#9FB2C9]'}`}
                aria-hidden="true"
              />
              {!isRail && <span className="truncate">Home</span>}
            </>
          )}
        </NavLink>

        <div className="pt-2 pb-1">
          {!isRail ? (
            <p className="px-3 text-[11px] font-semibold tracking-wider text-[#8FA4BE] uppercase">
              Weekly Modules
            </p>
          ) : (
            <div className="mx-2 border-t border-[#243B5C]" />
          )}
        </div>

        {WEEK_IDS.map((weekId) => {
          const week = campConfig.weeks[weekId];
          const Icon = WEEK_ICONS[weekId];
          const isExpanded = expandedWeeks[weekId];
          const isActiveWeek = location.pathname.startsWith(`/week/${weekId}`);

          return (
            <div key={weekId} className="space-y-1">
              <button
                type="button"
                onClick={() =>
                  toggleWeekGroup(weekId, isRail, () => {
                    setDesktopCollapsed(false);
                    setMobileExpanded(true);
                  })
                }
                aria-expanded={!isRail && isExpanded}
                title={isRail ? `Week ${weekId} — ${week.shortTitle}` : undefined}
                className={`flex min-h-[42px] w-full items-center rounded-lg px-3 text-left text-sm font-medium transition-colors ${
                  isRail ? 'justify-center px-0' : 'justify-between gap-2'
                } ${
                  isActiveWeek
                    ? 'bg-[#DE546A]/18 text-[#FFFCF7] border border-[#DE546A]/45'
                    : 'text-[#D9D4C7] hover:bg-[#1B314F] hover:text-[#FFFCF7] border border-transparent'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE546A]`}
              >
                <span className={`flex items-center ${isRail ? '' : 'gap-2.5 min-w-0'}`}>
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isActiveWeek ? 'text-[#F48B9B]' : 'text-[#9FB2C9]'
                    }`}
                    aria-hidden="true"
                  />
                  {!isRail && (
                    <span className="truncate">
                      Week {weekId} — {week.shortTitle}
                    </span>
                  )}
                </span>

                {!isRail && (
                  <span className="flex items-center gap-1.5 shrink-0">
                    {!week.released && (
                      <Lock className="h-3.5 w-3.5 text-[#8FA4BE]" aria-label="Not released" />
                    )}
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-[#8FA4BE] transition-transform duration-150 ${
                        isExpanded ? 'rotate-180 text-[#F48B9B]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                )}
              </button>

              {!isRail && isExpanded && (
                <div className="ml-5 space-y-0.5 border-l border-[#2B466B] pl-3 py-0.5">
                  {WEEK_SECTIONS.map((section) => (
                    <NavLink
                      key={section.key}
                      to={`/week/${weekId}/${section.key}`}
                      className={({ isActive }) =>
                        `flex min-h-[36px] items-center justify-between rounded-md px-2.5 text-[13px] transition-colors ${
                          isActive
                            ? 'bg-[#DE546A]/20 font-medium text-[#F48B9B]'
                            : 'text-[#C6C0B4] hover:bg-[#1B314F] hover:text-[#FFFCF7]'
                        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE546A]`
                      }
                    >
                      <span>{section.label}</span>
                      {!week.released && (
                        <span className="font-mono text-[10px] text-[#8FA4BE]">Locked</span>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="pt-2 pb-1">
          {!isRail ? (
            <p className="px-3 text-[11px] font-semibold tracking-wider text-[#8FA4BE] uppercase">
              Standings
            </p>
          ) : (
            <div className="mx-2 border-t border-[#243B5C]" />
          )}
        </div>

        <NavLink
          to="/leaderboard"
          title={isRail ? 'Leaderboard' : undefined}
          className={({ isActive }) =>
            `flex min-h-[42px] items-center rounded-lg px-3 text-sm font-medium transition-colors ${
              isRail ? 'justify-center px-0' : 'gap-3'
            } ${
              isActive
                ? 'bg-[#DE546A]/18 text-[#FFFCF7] border border-[#DE546A]/45'
                : 'text-[#D9D4C7] hover:bg-[#1B314F] hover:text-[#FFFCF7] border border-transparent'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE546A]`
          }
        >
          {({ isActive }) => (
            <>
              <Trophy
                className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#F48B9B]' : 'text-[#9FB2C9]'}`}
                aria-hidden="true"
              />
              {!isRail && <span className="truncate">Leaderboard</span>}
            </>
          )}
        </NavLink>
      </nav>

      {/* Sidebar Institutional Footer */}
      {!isRail && (
        <div className="border-t border-[#243B5C] p-4">
          <p className="text-xs font-semibold text-[#FFFCF7]">Aeromodelling Club</p>
          <p className="mt-0.5 text-[11px] text-[#9FB2C9]">IIT (BHU), Varanasi</p>
          <p className="mt-1 font-mono text-[11px] font-medium text-[#F48B9B]">1 Dec – 21 Dec</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <aside
        aria-label="Permanent sidebar navigation"
        className={`hidden lg:block shrink-0 sticky top-0 h-screen transition-[width] duration-200 ease-out ${
          desktopCollapsed ? 'w-[72px]' : 'w-72'
        }`}
      >
        {renderContent(desktopCollapsed, () => setDesktopCollapsed((prev) => !prev))}
      </aside>

      <aside
        aria-label="Permanent mobile sidebar rail"
        className="lg:hidden shrink-0 sticky top-0 h-screen w-14 z-30"
      >
        {renderContent(true, () => setMobileExpanded(true))}
      </aside>

      {mobileExpanded && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-[#0A1424]/55 backdrop-blur-xs"
            onClick={() => setMobileExpanded(false)}
            aria-hidden="true"
          />
          <aside
            aria-label="Expanded mobile sidebar navigation"
            className="relative z-10 h-full w-72 max-w-[85vw] shadow-xl"
          >
            {renderContent(false, () => setMobileExpanded(false))}
          </aside>
        </div>
      )}
    </>
  );
}
