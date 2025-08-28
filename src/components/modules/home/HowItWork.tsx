import { Car, Phone, CheckCircle, Users, } from 'lucide-react';


export const HowItWorks = () => {
  const steps = [
    {
      icon: <Phone className="w-12 h-12" />,
      title: "Book Your Ride",
      description: "Open the app, enter your destination, and choose your ride type."
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Get Matched",
      description: "We'll connect you with a verified driver near your location."
    },
    {
      icon: <Car className="w-12 h-12" />,
      title: "Enjoy the Journey",
      description: "Track your ride in real-time and enjoy a comfortable trip."
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: "Safe Arrival",
      description: "Rate your experience and arrive safely at your destination."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Getting around has never been easier. Follow these simple steps to start your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-background rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-primary text-foreground rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto group-hover:text-accent transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {step.description}
                </p>

                {/* Step Number */}
                <div className="absolute -top-4 -right-4 bg-primary text-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-yellow-400 z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};