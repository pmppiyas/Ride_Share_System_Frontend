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
      onClose();
    } catch (err) {
      const error = err as IError;
      if (error.status === 400) {
        toast.error(error.data.message);
      } else {
        toast.error("Some error occurred.");
      }
      console.log(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" z-[60] max-w-lg bg-gradient-to-tl from-primary/30 to-primary text-background">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center">Confirm Ride 🚘</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2 border p-2 rounded-md">
          <h2 className="col-span-2 text-xl font-semibold">From:</h2>
          <span>Lat: {location.pickupLocation?.lat}</span>
          <span>Lng: {location.pickupLocation?.lng}</span>
          <h2 className="col-span-2 text-xl font-semibold">To:</h2>
          <span>Lat: {location.destinationLocation?.lat}</span>
          <span>Lng: {location.destinationLocation?.lng}</span>
        </div>

        <div className="border p-2 rounded-md mt-4">
          <h2 className="text-xl font-semibold mb-2">Driver Info:</h2>
          <p>Name: {driver.name}</p>
          <p>Vehicle: {driver.vehicleInfo?.type}</p>
          <p>Plate: {driver.vehicleInfo?.plateNumber}</p>
          <p>Phone: {driver.phone}</p>
        </div>

        <DialogFooter className="flex justify-between pt-4">
          <Button variant="outline" onClick={onClose} className='text-foreground '>
            Close
          </Button>
          <Button onClick={handleConfirm}>
            {isLoading ? "Confirming..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};