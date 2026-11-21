import { useEffect, useRef, useState } from 'react';
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
  Wrench,
  X,
} from 'lucide-react';
import { campConfig, campSchedule, WEEK_IDS, WeekId } from '../config/campConfig';

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

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onToggleMobile: () => void;
}

export function Sidebar({ mobileOpen, onCloseMobile, onToggleMobile }: SidebarProps) {
  const location = useLocation();
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const lastMenuTriggerRef = useRef<HTMLElement | null>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<Record<WeekId, boolean>>({
    1: true,
    2: false,
    3: false,
  });

  useEffect(() => {
    onCloseMobile();
    const match = location.pathname.match(/^\/week\/([123])/);
    if (match) {
      const id = Number(match[1]) as WeekId;
      setExpandedWeeks((prev) => ({ ...prev, [id]: true }));
    }
  }, [location.pathname, location.hash, onCloseMobile]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    lastMenuTriggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onCloseMobile();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      lastMenuTriggerRef.current?.focus();
    };
  }, [mobileOpen, onCloseMobile]);

  const toggleWeekGroup = (weekId: WeekId, isRail: boolean, onExpandSidebar: () => void) => {
    if (isRail) {
      onExpandSidebar();
      setExpandedWeeks((prev) => ({ ...prev, [weekId]: true }));
      return;
    }
    setExpandedWeeks((prev) => ({ ...prev, [weekId]: !prev[weekId] }));
  };

  const renderContent = (isRail: boolean, onToggle: () => void, isMobile = false) => (
    <div className="flex h-full flex-col bg-[#13243C] text-[#F8F5EE] border-r border-[#243B5C]">
      {/* Sidebar Header */}
      <div
        className={`flex h-16 items-center border-b border-[#243B5C] ${
          isRail ? 'justify-center px-0.5 lg:px-3' : 'justify-between px-4'
        }`}
      >
        {!isRail && (
          <Link
            to="/"
            onClick={isMobile ? onCloseMobile : undefined}
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
          aria-label={isMobile ? 'Close navigation menu' : isRail ? 'Expand sidebar menu' : 'Collapse sidebar menu'}
          title={isMobile ? 'Close navigation menu' : isRail ? 'Expand sidebar' : 'Collapse sidebar'}
          className={`inline-flex items-center justify-center rounded-md lg:rounded-lg border border-[#2B466B] bg-[#1B314F] text-[#F8F5EE] transition-colors hover:border-[#DE546A] hover:bg-[#233E63] hover:text-[#F48B9B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE546A] ${
            isRail ? 'h-6 w-6 lg:h-9 lg:w-9' : 'h-9 w-9'
          }`}
        >
          {isMobile ? (
            <X className="h-4 w-4" aria-hidden="true" />
          ) : isRail ? (
            <ChevronRight className="h-3.5 w-3.5 lg:h-4 lg:w-4" aria-hidden="true" />
          ) : (
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Navigation Tree */}
      <nav
        aria-label="Camp sidebar navigation"
        className={`flex-1 overflow-y-auto py-4 space-y-1.5 ${
          isRail ? 'px-0.5 lg:px-2' : 'px-2'
        }`}
      >
        <NavLink
          to="/"
          onClick={isMobile ? onCloseMobile : undefined}
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
                className={`${isRail ? 'h-3.5 w-3.5 lg:h-4 lg:w-4' : 'h-4 w-4'} shrink-0 ${
                  isActive ? 'text-[#F48B9B]' : 'text-[#9FB2C9]'
                }`}
                aria-hidden="true"
              />
              {!isRail && <span className="truncate">Home</span>}
            </>
          )}
        </NavLink>

        <NavLink
          to="/setup"
          onClick={isMobile ? onCloseMobile : undefined}
          title={isRail ? 'Pre-Camp Setup' : undefined}
          className={({ isActive }) =>
            `flex min-h-[42px] items-center rounded-lg px-3 text-sm font-medium transition-colors ${
              isRail ? 'justify-center px-0' : 'justify-between gap-2'
            } ${
              isActive
                ? 'bg-[#DE546A]/18 text-[#FFFCF7] border border-[#DE546A]/45'
                : 'text-[#D9D4C7] hover:bg-[#1B314F] hover:text-[#FFFCF7] border border-transparent'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE546A]`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`flex items-center ${isRail ? '' : 'gap-3 min-w-0'}`}>
                <Wrench
                  className={`${isRail ? 'h-3.5 w-3.5 lg:h-4 lg:w-4' : 'h-4 w-4'} shrink-0 ${
                    isActive ? 'text-[#F48B9B]' : 'text-[#9FB2C9]'
                  }`}
                  aria-hidden="true"
                />
                {!isRail && <span className="truncate">Pre-Camp Setup</span>}
              </span>
              {!isRail && !campConfig.preCamp.released && (
                <Lock className="h-3.5 w-3.5 shrink-0 text-[#8FA4BE]" aria-label="Not released" />
              )}
            </>
          )}
        </NavLink>

        <div className="pt-2 pb-1">
          {!isRail ? (
            <p className="px-3 text-[11px] font-semibold tracking-wider text-[#8FA4BE] uppercase">
              Weekly Modules
            </p>
          ) : (
            <div className="mx-1 lg:mx-2 border-t border-[#243B5C]" />
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
                    className={`${isRail ? 'h-3.5 w-3.5 lg:h-4 lg:w-4' : 'h-4 w-4'} shrink-0 ${
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
                      onClick={isMobile ? onCloseMobile : undefined}
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
            <div className="mx-1 lg:mx-2 border-t border-[#243B5C]" />
          )}
        </div>

        <NavLink
          to="/leaderboard"
          onClick={isMobile ? onCloseMobile : undefined}
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
                className={`${isRail ? 'h-3.5 w-3.5 lg:h-4 lg:w-4' : 'h-4 w-4'} shrink-0 ${
                  isActive ? 'text-[#F48B9B]' : 'text-[#9FB2C9]'
                }`}
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
          <p className="mt-1 font-mono text-[11px] font-medium text-[#F48B9B]">
            {campSchedule.campDateRange}
          </p>
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

      {/* Mobile bottom navigation. Desktop keeps its collapsible left sidebar. */}
      <nav
        aria-label="Mobile bottom navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5DEC9] bg-[#FFFCF7]/98 text-[#13243C] shadow-[0_-8px_28px_-14px_rgba(19,36,60,0.22)] lg:hidden"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto grid max-w-xl grid-cols-4 items-stretch px-2 pt-2">
          <NavLink
            to="/"
            end
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] ${
                isActive ? 'bg-[#FDF1F3] text-[#B8354B]' : 'text-[#5A6C84] hover:bg-[#F8F5EE] hover:text-[#13243C]'
              }`
            }
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/setup"
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] ${
                isActive ? 'bg-[#FDF1F3] text-[#B8354B]' : 'text-[#5A6C84] hover:bg-[#F8F5EE] hover:text-[#13243C]'
              }`
            }
          >
            <Wrench className="h-5 w-5" aria-hidden="true" />
            <span>Pre-Camp</span>
          </NavLink>
          <button
            id="camp-mobile-modules-button"
            type="button"
            onClick={onToggleMobile}
            aria-expanded={mobileOpen}
            aria-controls="mobile-camp-navigation"
            aria-label="Open weekly module navigation"
            className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] ${
              mobileOpen || location.pathname.startsWith('/week/')
                ? 'bg-[#FDF1F3] text-[#B8354B]'
                : 'text-[#5A6C84] hover:bg-[#F8F5EE] hover:text-[#13243C]'
            }`}
          >
            <Layers className="h-5 w-5" aria-hidden="true" />
            <span>Weeks</span>
          </button>
          <NavLink
            to="/leaderboard"
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] ${
                isActive ? 'bg-[#FDF1F3] text-[#B8354B]' : 'text-[#5A6C84] hover:bg-[#F8F5EE] hover:text-[#13243C]'
              }`
            }
          >
            <Trophy className="h-5 w-5" aria-hidden="true" />
            <span>Leaderboard</span>
          </NavLink>
        </div>
      </nav>

      {/* The existing full navigation, now revealed as a bottom sheet on mobile. */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close weekly navigation"
            className="absolute inset-0 h-full w-full cursor-default bg-[#0A1424]/55 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <aside
            id="mobile-camp-navigation"
            ref={drawerRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Camp navigation menu"
            className="absolute inset-x-0 bottom-0 mx-auto h-[min(78dvh,720px)] max-w-xl overflow-hidden rounded-t-3xl shadow-2xl outline-none"
          >
            {renderContent(false, onCloseMobile, true)}
          </aside>
        </div>
      )}
    </>
  );
}
