import { Shield, CheckCircle, Zap, Award } from 'lucide-react';

export const ServiceHighlights = () => {
  const services = [
    {
      icon: <Zap className="w-16 h-16" />,
      title: "Lightning Fast",
      description: "Average pickup time of just 3 minutes in urban areas.",
      features: ["Real-time tracking", "Instant booking", "Quick ETAs"]
    },
    {
      icon: <Shield className="w-16 h-16" />,
      title: "100% Safe",
      description: "All drivers verified with background checks and insurance.",
      features: ["ID verification", "Safety monitoring", "Emergency support"]
    },
    {
      icon: <Award className="w-16 h-16" />,
      title: "Premium Quality",
      description: "High-rated drivers and well-maintained vehicles only.",
      features: ["4.8+ star rating", "Clean vehicles", "Professional service"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">Why Choose RideShare Pro</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the difference with our premium ride-sharing service designed for your comfort and safety.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/70 rounded-3xl p-8 h-full hover:from-primary hover:to-primary transition-all duration-500 group-hover:text-foreground">
                <div className="text-foreground group-hover:text-gray-900 mb-6 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-foreground group-hover:text-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-foreground group-hover:text-foreground">
                      <CheckCircle className="w-4 h-4 text-foreground group-hover:text-gray-900 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};