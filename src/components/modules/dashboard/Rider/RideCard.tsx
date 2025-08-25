import React, { useState } from 'react';
import { X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// Using regular table elements since shadcn table component isn't available

// RideCard Component
const RideCard = ({ ride, onCancel }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'requested': return 'secondary';
      case 'accepted': return 'default';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const canCancel = (status) => {
    return ['requested', 'accepted'].includes(status.toLowerCase());
  };

  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="px-4 py-3 font-medium">
        #{ride._id.slice(-8)}
      </td>
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="font-medium">{ride.rider.name}</div>
          <div className="text-sm text-muted-foreground">{ride.rider.phone}</div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="font-medium">{ride.driver.name}</div>
          <div className="text-sm text-muted-foreground">{ride.driver.phone}</div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm">
          <div>{ride.pickupLocation.lat.toFixed(4)}</div>
          <div className="text-muted-foreground">{ride.pickupLocation.lng.toFixed(4)}</div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm">
          <div>{ride.destinationLocation.lat.toFixed(4)}</div>
          <div className="text-muted-foreground">{ride.destinationLocation.lng.toFixed(4)}</div>
        </div>
      </td>
      <td className="px-4 py-3">{ride.distance} km</td>
      <td className="px-4 py-3 font-medium">৳{ride.fare}</td>
      <td className="px-4 py-3">
        <Badge variant={getStatusVariant(ride.status)}>
          {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
        </Badge>
      </td>
      <td className="px-4 py-3 text-sm">
        {formatDate(ride.timestamps.requestedAt)}
      </td>
      <td className="px-4 py-3">
        {canCancel(ride.status) ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onCancel(ride._id)}
            className="h-8"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        ) : (
          <span className="text-sm text-muted-foreground">
            {ride.status === 'cancelled' ? 'Cancelled' : 'Completed'}
          </span>
        )}
      </td>
    </tr>
  );
};