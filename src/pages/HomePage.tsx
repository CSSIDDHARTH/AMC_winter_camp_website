import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { Roadmap } from '../components/Roadmap';
import { WorkflowSection } from '../components/WorkflowSection';
import { GuidelinesSection } from '../components/GuidelinesSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Roadmap />
      <WorkflowSection />
      <GuidelinesSection />
    </>
  );
}
