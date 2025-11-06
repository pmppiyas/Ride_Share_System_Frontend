import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRideRequestMutation } from "@/redux/features/ride/ride.api";
import type { Driver, FindDriverPayload, IError } from "@/types";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface DriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Partial<Driver> | null;
  location: FindDriverPayload;
}

export const RideAssignModal: React.FC<DriverModalProps> = ({
  isOpen,
  onClose,
  driver,
  location,
}) => {
  const [rideRequest, { isLoading }] = useRideRequestMutation();
  const navigate = useNavigate();

  if (!driver) return null;

  const handleConfirm = async () => {
    try {
      const payload = {
        pickupLocation: location.pickupLocation,
        destinationLocation: location.destinationLocation,
        driverId: driver._id as string,
      };

      await rideRequest(payload).unwrap();
      toast.success(`Ride request sent to ${driver.name}`);
      navigate("/rider/my_rides");
      onClose();
    } catch (err) {
      const error = err as IError;
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white dark:bg-neutral-900 rounded-lg p-5 shadow-xl">

        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Confirm Ride 🚘
          </DialogTitle>
        </DialogHeader>

        {/* Route Info */}
        <div className="mt-3 border rounded-md p-3 text-sm space-y-2">
          <p className="font-medium text-gray-700 dark:text-gray-300">Route</p>
          <p>Pickup: <span className="font-mono">{location.pickupLocation?.lat}, {location.pickupLocation?.lng}</span></p>
          <p>Destination: <span className="font-mono">{location.destinationLocation?.lat}, {location.destinationLocation?.lng}</span></p>
        </div>

        {/* Driver Info */}
        <div className="mt-4 border rounded-md p-3 text-sm space-y-1">
          <p className="font-medium text-gray-700 dark:text-gray-300">Driver Info</p>
          <p>Name: <span className="font-semibold">{driver.name}</span></p>
          <p>Phone: {driver.phone}</p>
          <p>Vehicle: {driver.vehicleInfo?.type || "N/A"}</p>
          <p>Plate: {driver.vehicleInfo?.plateNumber || "N/A"}</p>
        </div>

        <DialogFooter className="pt-5">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Confirming..." : "Confirm Ride"}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};
