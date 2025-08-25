import RideCard from '@/components/modules/dashboard/ride/RideCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetMyRidesQuery, useSetRideStatusMutation } from '@/redux/features/ride/ride.api';
import { type IError, type Ride } from '@/types';
import { toast } from "sonner";
export default function MyRides() {
  const { data } = useGetMyRidesQuery(undefined);


  const [setRide] = useSetRideStatusMutation();

  const handleCancel = async (id: string) => {
    try {
      await setRide({ id, status: "canceled" }).unwrap()

    } catch (err) {
      const error = err as IError;
      if (error.status === 400) {
        toast.error("This ride is already canceled.")
      }
      else {
        toast.error("Ride cancel failed.")
      }
      console.log(err)
    }
  };




  if (!data || data.rides.length === 0) {
    return (
      <div className="container mx-auto ">
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No rides found
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Rides</CardTitle>
          <p className="text-muted-foreground">
            Manage your ride requests and bookings
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Ride ID</th>
                  <th className="px-4 py-3 text-left">Rider</th>
                  <th className="px-4 py-3 text-left">Driver</th>
                  <th className="px-4 py-3 text-left">Pickup</th>
                  <th className="px-4 py-3 text-left">Destination</th>
                  <th className="px-4 py-3 text-left">Distance</th>
                  <th className="px-4 py-3 text-left">Fare</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Requested</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.rides.map((ride: Ride) => (
                  <RideCard key={ride._id} ride={ride} onCancel={() => handleCancel(ride._id)} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {data.meta.count} ride{data.meta.count !== 1 ? 's' : ''}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}