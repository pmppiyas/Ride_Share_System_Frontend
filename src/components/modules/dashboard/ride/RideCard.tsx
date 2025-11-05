import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { RideCardProps } from '@/types';
import { formatDate } from '@/utils/formatDate';
import { getStatusVariant } from '@/utils/getStatusVariant';
import { X } from 'lucide-react';
import React from 'react';

const RideCard: React.FC<RideCardProps> = ({ ride, onCancel }) => {
  const isFinished = ride.status === "completed" || ride.status === "canceled";

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

        {/* ✅ Cancel / Completed / Canceled Button Logic */}
        {isFinished ? (
          <Button
            variant="destructive"
            size="sm"
            disabled
            className="h-8 opacity-60 cursor-not-allowed"
          >
            {ride.status === "completed" ? "Completed" : "Canceled"}
          </Button>
        ) : (
          <Button
            variant="destructive"
            size="sm"
            onClick={onCancel}
            className="h-8 flex items-center gap-1"
          >
            <X className="h-4 w-4" /> Cancel
          </Button>
        )}

      </td>
    </tr>
  );
};

export default RideCard;
