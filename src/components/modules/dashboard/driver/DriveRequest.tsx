import Loading from '@/components/modules/dashboard/Rider/Loading';
import { useGetMyDrivesQuery } from '@/redux/features/driver/driver.api';
import { useSetRideStatusMutation, useToggleStatusMutation } from '@/redux/features/ride/ride.api';
import { RideStatusEnum, type IRideStatus } from '@/types/ride.types';
import { toast } from "sonner";


const statusActionsMap: Record<IRideStatus, { label: string; next: RideStatusEnum; color: string }[]> = {
  [RideStatusEnum.REQUESTED]: [
    { label: "Accept", next: RideStatusEnum.ACCEPTED, color: "green" },
    { label: "Reject", next: RideStatusEnum.CANCELED, color: "red" },
  ],
  [RideStatusEnum.ACCEPTED]: [
    { label: "Pick Up", next: RideStatusEnum.PICKED_UP, color: "blue" },
  ],
  [RideStatusEnum.PICKED_UP]: [
    { label: "Start Ride", next: RideStatusEnum.IN_TRANSIT, color: "purple" },
  ],
  [RideStatusEnum.IN_TRANSIT]: [
    { label: "Complete", next: RideStatusEnum.COMPLETED, color: "gray" },
  ],
  [RideStatusEnum.COMPLETED]: [],
  [RideStatusEnum.CANCELED]: [],
};

export default function DriveRequest() {
  const { data, isLoading } = useGetMyDrivesQuery(null);
  const [toggleStatusMutation] = useToggleStatusMutation()
  const sortedDrives = data?.slice().sort((a, b) =>
    new Date(b.timestamps.requestedAt).getTime() - new Date(a.timestamps.requestedAt).getTime()
  );

  const handleAction = async (id: string, status: RideStatusEnum) => {
    try {
      await toggleStatusMutation({ id, status }).unwrap()
      toast.success(`Ride ${status} successfully.`);
    } catch (err) {
      console.error(err);
      toast.error(`Ride ${status} unsuccessfully.`);
    }
  };

  if (isLoading) {
    return <Loading title='Drive Request' />;
  }

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-medium mb-4'>Invitation</h2>

      <div className='overflow-x-auto'>
        <table className='min-w-full border border-gray-300'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-2 text-left'>Pickup</th>
              <th className='px-4 py-2 text-left'>Destination</th>
              <th className='px-4 py-2 text-left'>Distance (km)</th>
              <th className='px-4 py-2 text-left'>Fare (৳)</th>
              <th className='px-4 py-2 text-left'>Status</th>
              <th className='px-4 py-2 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedDrives?.map((drive) => (
              <tr key={drive._id} className='border-t'>
                <td className='px-4 py-2'>{drive.pickupLocation?.address || '—'}</td>
                <td className='px-4 py-2'>{drive.destinationLocation?.address || '—'}</td>
                <td className='px-4 py-2'>{drive.distance.toFixed(2)}</td>
                <td className='px-4 py-2'>{drive.fare.toFixed(2)}</td>
                <td className='px-4 py-2 capitalize'>{drive.status}</td>
                <td className='px-4 py-2'>
                  <div className='flex gap-2 flex-wrap'>
                    {statusActionsMap[drive.status as RideStatusEnum]?.map((action) => (
                      <button
                        key={action.next}
                        onClick={() => handleAction(drive._id, action.next)}
                        className={`px-3 py-1 bg-${action.color}-500 text-white rounded hover:bg-${action.color}-600`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}