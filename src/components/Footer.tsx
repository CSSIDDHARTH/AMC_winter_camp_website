import { Link } from 'react-router-dom';
import { Instagram, MessageCircle } from 'lucide-react';

const OFFICIAL_LINKS = {
  instagram: 'https://www.instagram.com/amc.iitbhu?igsh=dnYwM2xiYW9yYmJ4&utm_source=chatgpt.com',
  whatsapp: 'https://chat.whatsapp.com/Da1EGUBqaZND1hUWKjejpD',
};

export function Footer() {
  return (
    <footer className="border-t border-[#243B5C] bg-[#13243C] text-[#F8F5EE]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <img
              src="/assets/aistudio/aeromodellingClub_7a388ce9.png"
              alt="Aeromodelling Club IIT (BHU) logo"
              className="h-16 w-16 rounded-xl border border-[#2B466B] bg-black object-contain p-1 shrink-0"
            />
            <div className="space-y-1.5">
              <p className="font-display text-2xl font-bold tracking-tight text-[#FFFCF7] sm:text-3xl">
                Aeromodelling Club
              </p>
              <p className="text-sm font-medium text-[#D9D4C7]">
                Indian Institute of Technology (BHU), Varanasi
              </p>
              <p className="pt-0.5 text-sm font-medium text-[#F48B9B]">
                Where sky is not our limit, it&apos;s our playground.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-12">
            <div className="space-y-2.5">
              <p className="text-xs font-semibold tracking-wider text-[#8FA4BE] uppercase">
                Camp Sections
              </p>
              <ul className="space-y-1.5 text-sm text-[#D9D4C7]">
                <li>
                  <Link to="/" className="transition-colors hover:text-[#F48B9B]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/week/1" className="transition-colors hover:text-[#F48B9B]">
                    Week 1 — CAD
                  </Link>
                </li>
                <li>
                  <Link to="/week/2" className="transition-colors hover:text-[#F48B9B]">
                    Week 2 — ROS 2
                  </Link>
                </li>
                <li>
                  <Link to="/week/3" className="transition-colors hover:text-[#F48B9B]">
                    Week 3 — Component Selection
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="transition-colors hover:text-[#F48B9B]">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-wider text-[#8FA4BE] uppercase">
                Official Channels
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={OFFICIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aeromodelling Club IIT (BHU) Instagram"
                  title="Instagram (@amc.iitbhu)"
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-[#2B466B] bg-[#1B314F] px-3 text-xs font-medium text-[#F8F5EE] transition-colors hover:border-[#DE546A] hover:text-[#F48B9B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE546A]"
                >
                  <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Instagram</span>
                </a>

                <a
                  href={OFFICIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aeromodelling Club IIT (BHU) WhatsApp Group"
                  title="WhatsApp Community"
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-[#2B466B] bg-[#1B314F] px-3 text-xs font-medium text-[#F8F5EE] transition-colors hover:border-[#DE546A] hover:text-[#F48B9B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE546A]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#243B5C] pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-[#8FA4BE]">
          <p>AMC Winter Camp 2026–27 (1 Dec – 21 Dec) · Aeromodelling Club, IIT (BHU)</p>
          <p>Structured Technical Learning Platform</p>
        </div>
      </div>
    </footer>
  );
}
