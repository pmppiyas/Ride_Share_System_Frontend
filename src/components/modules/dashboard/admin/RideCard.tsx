/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge';
import type { Ride } from '@/types';
import { MapPin } from "lucide-react"


interface RideCardProps {
  ride: Ride;
}

export default function RideCard({ ride }: RideCardProps) {


  const handleRideClick = (ride: any) => {
    console.log(ride)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      case 'pending': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };
  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  return (
    <div onClick={() => handleRideClick(ride)} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div onClick={() => handleRideClick(ride)} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
        <div className={`w-3 h-3 rounded-full ${getStatusColor(ride.status)}`} />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{ride.rider.name}</span>
            <span className="text-muted-foreground">→</span>
            <span className="font-medium">{ride.driver?.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{ride?.pickupLocation?.address
            } → {ride?.destinationLocation?.address}</span>
          </div>
        </div>
      </div>
      <div className="text-right space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant={ride.status === 'completed' ? 'default' : ride.status === 'in-progress' ? 'secondary' : 'outline'}>
            {getStatusText(ride.status)}
          </Badge>
          <span className="font-bold">৳{ride.fare}</span>
        </div>
      </div>
    </div>
  )
}
