import { Button } from '@/components/ui/button';
import { useRideRequestMutation } from '@/redux/features/ride/ride.api';
import type { Driver, FindDriverPayload, IError } from '@/types';
import { toast } from "sonner";
interface DriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Partial<Driver> | null;
  location: FindDriverPayload;
}



export const RideAssignModal: React.FC<DriverModalProps> = ({ isOpen, onClose, driver, location }) => {
  const [rideRequest, { isLoading }] = useRideRequestMutation();
  if (!isOpen || !driver) return null;


  const handleConfirm = async () => {
    try {
      const payload = {
        pickupLocation: location.pickupLocation,
        destinationLocation: location.destinationLocation,
        driverId: driver._id as string,
      };

      await rideRequest(payload).unwrap();
      toast.success(`Ride request sent to ${driver.name}`);
      onClose()
    }
    catch (err) {
      console.log(err);
      const error = err as IError;
      if (error.status === 400) {
        toast.error(error.data.message)
      }
      else {
        toast.error("Some error occoured.");
      }
    }

  }

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50 flex items-end justify-center backdrop-blur-sm h-full">
      <div
        className="bg-gradient-to-tl from-primary/30 to-primary h-3/4 w-full max-w-lg rounded-t-[70px] shadow-lg px-4 py-8 animate-slideUpmd:pt-12 flex flex-col gap-4"
      >

        <div className=''>
          <h2 className='text-background text-4xl text-center font-semibold'>Confirm Ride 🚘</h2>
        </div>
        <div className=' flex-1 border grid grid-cols-2 p-2'>
          <h2 className='text-2xl'>From: </h2>
          <h3>Lat: {location.pickupLocation.lat}</h3>
          <h3>Lan: {location.pickupLocation.lng}</h3>
          <h2 className='text-2xl'>To: </h2>
          <h3>Lat: {location.pickupLocation.lat}</h3>
          <h3>Lan: {location.pickupLocation.lng}</h3>
        </div>
        <div className=' flex-1 border p-2'>
          <h2 className='text-2xl'>Driver: </h2>
          <h3>Lat: {driver.name}</h3>

          <h3>Lat: {driver.vehicleInfo?.type}</h3>
          <h3>Lat: {driver.vehicleInfo?.plateNumber}</h3>
          <h3>Lat: {driver?.phone}</h3>
        </div>

        <div className='flex  justify-between items-center  pb-6'>
          <Button
            variant={"outline"}
            size={"lg"}
            onClick={onClose}
          >
            Close
          </Button>
          <Button size={"lg"} onClick={() => handleConfirm()}>
            {isLoading ? "Comfirming" : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
};