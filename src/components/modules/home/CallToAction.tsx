import { Phone } from 'lucide-react';


export const CallToAction = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-tr from-primary/50 via-primary/10 to-primary/0 ">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
          Ready to Ride?
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          Download the RideShare Pro app today and experience the future of transportation.
          Your next adventure is just a tap away.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button className="bg-foreground hover:bg-foreground/90 text-primary font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 flex items-center space-x-2">
            <Phone className="w-6 h-6" />
            <span>Download for iOS</span>
          </button>
          <button className="bg-foreground hover:bg-foreground/90 text-primary  font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 flex items-center space-x-2">
            <Phone className="w-6 h-6" />
            <span>Download for Android</span>
          </button>
        </div>

        <div className="border-t-2 border-foreground/20 pt-10">
          <h3 className="text-2xl font-bold text-foreground mb-6">Join Our Driver Network</h3>
          <p className="text-foreground/80  mb-6 max-w-xl mx-auto">
            Turn your car into an income opportunity. Flexible hours, competitive earnings, and full support.
          </p>
          <button className="border-2 border-foreground hover:bg-foreground hover:text-primary text-foreground font-bold py-3 px-8 rounded-full text-lg transition-all">
            Become a Driver
          </button>
        </div>
      </div>
    </section>
  );
};
