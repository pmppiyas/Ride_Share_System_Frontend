// RideRow.tsx
import React from "react";

interface Location {
  address: string;
  lat: number;
  lng: number;
}

interface Person {
  name: string;
  phone: string;
}

interface Ride {
  _id: string;
  pickupLocation: Location;
  destinationLocation: Location;
  driver: Person;
  rider: Person;
  fare: number;
  distance: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  timestamps: {
    requestedAt: string;
  };
}

interface RideRowProps {
  ride: Ride;
  onCancel: (ride: Ride) => void;
}

const RideRow: React.FC<RideRowProps> = ({ ride, onCancel }) => {
  return (
    <tr className="border-b hover:bg-muted/30 transition">
      <td className="px-4 py-3 text-sm font-mono">{ride._id}</td>
      <td className="px-4 py-3 text-sm">{ride.rider.name} ({ride.rider.phone})</td>
      <td className="px-4 py-3 text-sm">{ride.driver.name} ({ride.driver.phone})</td>
      <td className="px-4 py-3 text-sm">{ride.pickupLocation.address}</td>
      <td className="px-4 py-3 text-sm">{ride.destinationLocation.address}</td>
      <td className="px-4 py-3 text-sm">{ride.distance.toFixed(2)} m</td>
      <td className="px-4 py-3 text-sm">৳{ride.fare.toFixed(2)}</td>
      <td className="px-4 py-3 text-sm">
        <span className={`px-2 py-1 rounded text-xs font-medium ${ride.status === "completed"
          ? "bg-green-100 text-green-700"
          : ride.status === "cancelled"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
          }`}>
          {ride.status}
        </span>
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground">
        {new Date(ride.timestamps.requestedAt).toLocaleString()}
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onCancel(ride)}
          className="text-red-600 hover:underline text-sm"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default RideRow;