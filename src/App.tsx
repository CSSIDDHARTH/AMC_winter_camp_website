import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { LeaderboardPage } from './components/LeaderboardPage';
import { HomePage } from './pages/HomePage';
import { SetupPage } from './pages/SetupPage';
import { WeekPage } from './pages/WeekPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return null;
}

function AppShell() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <div className="flex min-h-screen bg-[#F8F5EE] text-[#13243C]">
      <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={closeMobileMenu} onToggleMobile={() => setMobileMenuOpen((open) => !open)} />

      <div className="flex min-w-0 flex-1 flex-col pb-20 lg:pb-0">
        <Navbar />

        <main className={isHome ? '-mt-13 flex-1' : 'flex-1'}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/week/:weekId" element={<WeekPage section="instructions" />} />
            <Route path="/week/:weekId/instructions" element={<WeekPage section="instructions" />} />
            <Route path="/week/:weekId/tasks" element={<WeekPage section="tasks" />} />
            <Route path="/week/:weekId/submission" element={<WeekPage section="submission" />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollHandler />
        <AppShell />
      </BrowserRouter>
    </MotionConfig>
  );
}
