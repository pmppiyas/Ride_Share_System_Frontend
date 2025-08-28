import { Star } from 'lucide-react';

export const CustomerTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Business Executive",
      content: "RideShare Pro has transformed my daily commute. The drivers are professional and the app is incredibly user-friendly.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      role: "College Student",
      content: "As a student, I need reliable and affordable transportation. This service delivers on both fronts every single time.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily Johnson",
      role: "Healthcare Worker",
      content: "Working late shifts, safety is my priority. I always feel secure with RideShare Pro's verified drivers and tracking features.",
      rating: 5,
      avatar: "EJ"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-tr from-primary/50 via-primary/10 to-primary/0">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-6">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of satisfied riders who trust RideShare Pro for their daily journeys.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-background rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-current" />
                  ))}
                </div>

                <p className="text-foreground/70 mb-6 leading-relaxed text-lg italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-primary to-primary/70  hover:to-primary text-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-background rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="bg-background rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="bg-background rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-primary mb-2">1M+</div>
            <div className="text-muted-foreground">Rides Completed</div>
          </div>
        </div>
      </div>
    </section>
  );
};