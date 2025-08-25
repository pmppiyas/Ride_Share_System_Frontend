import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { RideCardProps } from '@/types';
import React from 'react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/formatDate';
import { getStatusVariant } from '@/utils/getStatusVariant';

const RideCard: React.FC<RideCardProps> = ({ ride, onCancel }) => {

  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="px-2 py-3 font-medium">#{ride?._id.slice(-4)}</td>
      <td className="px-2 py-3">
        <div className="space-y-1">
          <div className="font-medium">{ride?.rider?.name}</div>
          <div className="text-sm text-muted-foreground">{ride?.rider?.phone}</div>
        </div>
      </td>
      <td className="px-2 py-3">
        <div className="space-y-1">
          <div className="font-medium">{ride?.driver?.name}</div>
          <div className="text-sm text-muted-foreground">{ride?.driver?.phone}</div>
        </div>
      </td>
      <td className="px-2 py-3">
        <div className="text-sm">
          <div>{ride.pickupLocation.lat.toFixed(4)}</div>
          <div className="text-muted-foreground">{ride?.pickupLocation?.lng.toFixed(4)}</div>
        </div>
      </td>
      <td className="px-2 py-3">
        <div className="text-sm">
          <div>{ride.destinationLocation.lat.toFixed(4)}</div>
          <div className="text-muted-foreground">{ride.destinationLocation.lng.toFixed(4)}</div>
        </div>
      </td>
      <td className="px-2 py-3">{ride?.distance} km</td>
      <td className="px-2 py-3 font-medium">৳{ride?.fare}</td>
      <td className="px-2 py-3">
        <Badge variant={getStatusVariant(ride.status)}>
          {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
        </Badge>
      </td>
      <td className="px-2 py-3 text-sm">{formatDate(ride?.timestamps?.requestedAt)}</td>
      <td className="px-2 py-3">

        <Button
          variant="destructive"
          size="sm"
          onClick={() => onCancel()}
          className={cn("h-8", ride?.status === 'canceled' && "bg-red-400")}
        >
          {ride?.status === 'canceled' ? <span className='flex items-center gap-1'> <X className="h-4 w-4 " />Canceled</span> : <span className='uppercase'>{ride?.status}ed</span>
          }
        </Button>


      </td>
    </tr>
  );
};

export default RideCard;