import { Hero } from '@/components/modules/home/Hero';
import { HowItWorks } from '@/components/modules/home/HowItWork';

export default function Home() {

  return (
    <div className='min-h-[calc(100vh-70px)]  '>
      <Hero />
      <HowItWorks />
    </div>
  );
}