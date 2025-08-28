import { Car, Clock, Shield, } from 'lucide-react';


export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-tr from-primary/50 via-primary/10 to-primary/0 text-foreground py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Your Journey
              <span className="block text-foreground">Starts Here</span>
            </h1>
            <p className="text-xl text-accent-foreground leading-relaxed">
              Experience the future of transportation with RideShare Pro.
              Safe, reliable, and affordable rides at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-foreground text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-foreground transition-all transform hover:scale-105">
                Book a Ride
              </button>
              <button className="border-2 border-foreground text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-foreground hover:text-primary transition-all">
                Become a Driver
              </button>
            </div>
          </div>
          <div className="relative group transition-colors ">
            <div className="bg-gradient-to-r from-primary to-primary/70  hover:to-primary  rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Car className="w-32 h-32 text-background group-hover:text-foreground mx-auto" />
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-background group-hover:text-foreground">
                  <span className="font-semibold">Available Now</span>
                  <span className="bg-green-500 w-3 h-3 rounded-full"></span>
                </div>
                <div className="text-background/80 group-hover:text-foreground/80">
                  <p>Honda Civic • 4.9★</p>
                  <p className="text-sm">2 min away</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 bg-foreground/20 backdrop-blur-sm rounded-full p-4 animate-bounce">
        <Clock className="w-8 h-8 text-primary" />
      </div>
      <div className="absolute bottom-20 left-10 bg-foreground/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
        <Shield className="w-8 h-8 text-primary" />
      </div>
    </section>
  );
};