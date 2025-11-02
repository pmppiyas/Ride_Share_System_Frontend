import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const roles = [
  {
    title: 'Rider',
    features: [
      'Book rides instantly or schedule in advance',
      'Choose pickup and drop-off locations',
      'Track driver in real-time',
      'Rate and review drivers',
      'Access ride history and receipts',
      'Secure payments via card, wallet, or cash',
    ],
  },
  {
    title: 'Driver',
    features: [
      'Receive and manage ride requests',
      'Navigate with built-in GPS and route optimization',
      'Track earnings and ride history',
      'Rate riders and report issues',
      'Set availability (Online/Offline)',
      'Access performance analytics',
    ],
  },
  {
    title: 'Admin',
    features: [
      'Manage riders and drivers',
      'Monitor live ride activity and system health',
      'Configure pricing, zones, and promo codes',
      'Access detailed analytics and reports',
      'Handle support tickets and feedback',
      'Detect fraud and enforce platform policies',
    ],
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Platform <span className="text-primary">Features</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore the core capabilities tailored for Riders, Drivers, and Admins to ensure a seamless ride-sharing experience.
          </p>
        </div>

        {/* Role-based Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{role.title}</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent className="space-y-4">
                {role.features.map((feature, i) => (
                  <Badge key={i} variant="secondary" className="text-sm">
                    {feature}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}