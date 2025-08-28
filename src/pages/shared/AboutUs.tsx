import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import FAQSection from '@/pages/shared/FAQ';

const AboutUs = () => {
  const stats = [
    { number: "1M+", label: "Rides Completed" },
    { number: "750K+", label: "Happy Riders" },
    { number: "10+", label: "Years of Service" },
    { number: "50K+", label: "Registered Drivers" }
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "We leverage cutting-edge technology like AI-powered route optimization, real-time tracking, and automated dispatching to provide seamless ride experiences."
    },
    {
      title: "Safety First",
      description:
        "Our platform integrates advanced safety features including SOS alerts, driver background checks, and real-time ride sharing with friends and family."
    },
    {
      title: "Sustainability",
      description:
        "We promote eco-friendly rides through electric vehicle integration, carpooling options, and data-driven environmental insights."
    },
    {
      title: "Customer-Centric",
      description:
        "Every feature we build—from smart pricing to loyalty rewards—puts our riders and drivers at the center of the experience."
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Stevens",
      role: "CEO & Founder",
      bio: "Sarah launched RideShare Pro with a mission to make urban transportation more affordable, reliable, and safe. With over a decade in the mobility industry, she sets the vision for the platform's future.",
      initials: "SS",
      skills: ["Leadership", "Business Strategy", "Product Vision"]
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Michael built the core architecture powering real-time ride matching and dynamic pricing algorithms. A former senior engineer at Uber, he brings world-class technical expertise.",
      initials: "MC",
      skills: ["Full Stack Development", "Cloud Architecture", "AI/ML"]
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      bio: "Emily ensures our rider and driver apps deliver intuitive and accessible user experiences across iOS, Android, and web platforms.",
      initials: "ER",
      skills: ["UI/UX", "Design Systems", "User Research"]
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      bio: "David leads our backend and mobile engineering teams, ensuring scalable services handle millions of daily ride requests efficiently.",
      initials: "DK",
      skills: ["Microservices", "DevOps", "Agile Leadership"]
    },
    {
      name: "Ana Lopez",
      role: "Head of Operations",
      bio: "Ana coordinates partnerships with cities, manages driver onboarding, and ensures seamless rider support across regions.",
      initials: "AL",
      skills: ["Operations", "Client Relations", "Partnerships"]
    },
    {
      name: "James Wilson",
      role: "Lead Data Scientist",
      bio: "James designs predictive analytics for demand forecasting, surge pricing, and ETA accuracy, ensuring smarter and faster rides.",
      initials: "JW",
      skills: ["Data Science", "Machine Learning", "Predictive Modeling"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            About <span className="text-primary">RideShare Pro</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Revolutionizing urban mobility with a full-stack ride sharing platform built for speed, safety, and scalability.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Story Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl">Our Story</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              RideShare Pro started in 2013 with a single goal: to make urban transportation smarter and more efficient. What began as a simple carpooling web app evolved into a full-stack ride sharing ecosystem serving millions of riders and drivers worldwide.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, our platform powers real-time ride matching, dynamic pricing, route optimization, and driver management—all backed by cutting-edge cloud infrastructure and AI-driven insights.
            </p>
          </CardContent>
        </Card>

        {/* Mission & Values Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Mission & Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Building a smarter, safer, and more sustainable urban transportation network.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The builders, dreamers, and problem-solvers behind RideShare Pro.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {member.initials}
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Why Choose RideShare Pro?</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              RideShare Pro is built with a modern full-stack architecture—React, Node.js, GraphQL, PostgreSQL, and Kubernetes—delivering speed, reliability, and security at scale.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From real-time GPS tracking to seamless payments and driver analytics, our platform gives riders and drivers a frictionless experience backed by data-driven insights.
            </p>
          </CardContent>
        </Card>

        <FAQSection />
      </div>
    </div>
  );
};

export default AboutUs;
