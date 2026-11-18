import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy } from 'lucide-react';
import { campConfig } from '../config/campConfig';
import { LeaderboardEntry } from '../content/types';

interface LeaderboardPageProps {
  entries?: LeaderboardEntry[];
}

export function LeaderboardPage({ entries = [] }: LeaderboardPageProps) {
  if (!campConfig.leaderboardReleased) {
    return (
      <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center bg-[#F8F5EE] px-4 py-16 sm:px-6 lg:px-8 blueprint-grid">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl rounded-2xl border border-[#E5DEC9] bg-[#FFFCF7] p-8 text-center shadow-xs sm:p-12"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-[#F3C5CE] bg-[#FDF1F3]">
            <Trophy className="h-8 w-8 text-[#B8354B]" aria-hidden="true" />
          </div>

          <h1 className="font-display text-3xl font-extrabold tracking-[-0.025em] text-[#13243C] sm:text-4xl text-balance">
            Leaderboard <span className="text-[#B8354B]">Coming Soon</span>
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-[#4B5E77] sm:text-base">
            The Winter Camp leaderboard will be displayed after the completion of Week 1.
            Stay tuned to see how participants perform across the challenges.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1E3A5F] px-5 py-2.5 text-sm font-semibold text-[#FFFCF7] transition-colors hover:bg-[#B8354B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-12rem)] bg-[#F8F5EE] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5DEC9] pb-6">
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-extrabold tracking-[-0.025em] text-[#13243C] sm:text-4xl">
              Winter Camp <span className="text-[#B8354B]">Leaderboard</span>
            </h1>
            <p className="text-sm text-[#4B5E77]">
              Participant rankings and task-wise performance across released weeks.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md border border-[#E5DEC9] bg-[#FFFCF7] px-4 py-2 text-sm font-medium text-[#1E3A5F] transition-colors hover:border-[#DE546A] hover:text-[#B8354B]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#E5DEC9] bg-[#FFFCF7] shadow-xs">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5DEC9] bg-[#F8F5EE] text-xs font-semibold tracking-wider text-[#5A6C84] uppercase">
                <th className="px-5 py-3.5">Rank</th>
                <th className="px-5 py-3.5">Participant</th>
                <th className="px-5 py-3.5 text-right">Week 1</th>
                <th className="px-5 py-3.5 text-right">Week 2</th>
                <th className="px-5 py-3.5 text-right">Week 3</th>
                <th className="px-5 py-3.5 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE9DC]">
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-[#5A6C84]">
                    Evaluation scores will appear once results are published.
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={`${entry.rank}-${entry.participantName}`} className="hover:bg-[#F8F5EE]">
                    <td className="px-5 py-3.5 font-mono font-semibold text-[#B8354B] tabular-nums">
                      #{entry.rank}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-[#13243C]">
                      {entry.participantName}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-[#33465F] tabular-nums">
                      {entry.weekScores[1] ?? '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-[#33465F] tabular-nums">
                      {entry.weekScores[2] ?? '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-[#33465F] tabular-nums">
                      {entry.weekScores[3] ?? '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono font-semibold text-[#1E3A5F] tabular-nums">
                      {entry.totalScore}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
