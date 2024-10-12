import Hero from '@/components/Hero';
import PopularSubjects from '@/components/PopularSubjects';
import FeaturedTutors from '@/components/FeaturedTutors';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import TrustedBy from '@/components/TrustedBy';

export default function Home() {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <PopularSubjects />
      <FeaturedTutors />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}