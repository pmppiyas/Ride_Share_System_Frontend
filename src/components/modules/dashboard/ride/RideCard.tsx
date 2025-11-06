import { Button } from "@/components/ui/button";
import { RideStatusEnum, type Ride } from "@/types/ride.types";

export default function RideCard({ ride, onCancel }: { ride: Ride; onCancel?: () => void }) {
  const statusColor =
    ride.status === RideStatusEnum.COMPLETED ? "bg-green-500" :
      ride.status === RideStatusEnum.CANCELED ? "bg-red-500" :
        "bg-yellow-500";

  // Determine button text and disabled state
  const isDisabled = ride.status === RideStatusEnum.COMPLETED || ride.status === RideStatusEnum.CANCELED;
  const buttonText = ride.status === RideStatusEnum.COMPLETED
    ? "Completed"
    : ride.status === RideStatusEnum.CANCELED
      ? "Canceled"
      : "Cancel Ride";

  const buttonClass = ride.status === RideStatusEnum.COMPLETED
    ? "bg-green-600 hover:bg-green-700 text-white cursor-default"
    : ride.status === RideStatusEnum.CANCELED
      ? "bg-red-600 hover:bg-red-700 text-white cursor-default"
      : "bg-red-600 hover:bg-red-700 text-white";

  return (
    <tr className="border-b hover:bg-muted/30">
      {/* Status Circle */}
      <td className="px-4 py-3">
        <div className={`h-3 w-3 rounded-full ${statusColor}`}></div>
      </td>

      <td className="px-4 py-3">{ride.rider?.name}</td>
      <td className="px-4 py-3">{ride.driver?.name ?? "Pending"}</td>
      <td className="px-4 py-3">{ride.pickupLocation?.address || "Lat/Lng"}</td>
      <td className="px-4 py-3">{ride.destinationLocation?.address || "Lat/Lng"}</td>
      <td className="px-4 py-3">{ride.distance ?? "-"} km</td>
      <td className="px-4 py-3">${ride.fare}</td>
      <td className="px-4 py-3">{new Date(ride.createdAt).toLocaleString()}</td>

      {/* Action Button */}
      <td className="px-4 py-3">
        <Button
          onClick={onCancel}
          disabled={isDisabled}
          className={buttonClass}
        >
          {buttonText}
        </Button>
      </td>
    </tr>
  );
}
