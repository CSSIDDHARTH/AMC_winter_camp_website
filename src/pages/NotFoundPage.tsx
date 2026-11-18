import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center bg-[#F8F5EE] px-4 py-16 sm:px-6 lg:px-8 blueprint-grid">
      <div className="w-full max-w-lg rounded-2xl border border-[#E5DEC9] bg-[#FFFCF7] p-8 text-center shadow-xs sm:p-12">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-[#F3C5CE] bg-[#FDF1F3]">
          <Compass className="h-7 w-7 text-[#B8354B]" aria-hidden="true" />
        </div>
        <p className="font-mono text-xs font-semibold tracking-wider text-[#B8354B]">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.025em] text-[#13243C] sm:text-4xl">
          Page <span className="text-[#B8354B]">Not Found</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4B5E77]">
          The requested page does not exist in the AMC Winter Camp curriculum.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-[#1E3A5F] px-5 py-2.5 text-sm font-semibold text-[#FFFCF7] transition-colors hover:bg-[#B8354B]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
