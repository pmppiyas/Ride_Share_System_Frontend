import { Hero } from '@/components/modules/home/Hero';
import { HowItWorks } from '@/components/modules/home/HowItWork';
import { ServiceHighlights } from '@/components/modules/home/ServiceHighlights';

export default function Home() {

  return (
    <div className='min-h-[calc(100vh-70px)]  '>
      <Hero />
      <HowItWorks />
      <ServiceHighlights />
    </div>
  );
}