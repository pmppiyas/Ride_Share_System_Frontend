import RideCard from "@/components/modules/dashboard/ride/RideCard";
import Loading from "@/components/modules/dashboard/Rider/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetMyRidesQuery,
  useToggleStatusMutation,
} from "@/redux/features/ride/ride.api";
import { type IError, type Ride } from "@/types";
import { RideStatusEnum } from "@/types/ride.types";
import { useState } from "react";
import { toast } from "sonner";

export default function MyRides() {
  const { data, isLoading } = useGetMyRidesQuery(undefined);
  const [toggleStatus] = useToggleStatusMutation();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const confirmCancel = async () => {
    if (!confirmId) return;

    try {
      await toggleStatus({ id: confirmId, status: RideStatusEnum.CANCELED }).unwrap();

      toast.success("Ride canceled successfully.");
      setConfirmId(null);
    } catch (err) {
      const error = err as IError;
      if (error.status === 400) {
        toast.error("This ride is already canceled.");
      } else {
        toast.error("Ride cancel failed.");
      }
      console.log(err);
    }
  };

  if (isLoading) {
    return <Loading title="Rides" />;
  }

  if (!data || data.rides.length === 0) {
    return (
      <div className="container mx-auto">
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
                  <RideCard
                    key={ride._id}
                    ride={ride}
                    onCancel={
                      ride.status !== RideStatusEnum.CANCELED
                        ? () => setConfirmId(ride._id)
                        : undefined
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {data.meta.count} ride{data.meta.count !== 1 ? "s" : ""}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {confirmId && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to cancel this ride?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 text-sm rounded bg-muted hover:bg-muted/80"
              >
                No, go back
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
