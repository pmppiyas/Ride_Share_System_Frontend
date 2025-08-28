import Loading from '@/components/modules/dashboard/Rider/Loading'
import { useGetMyDrivesQuery } from '@/redux/features/driver/driver.api'
import { useSetRideStatusMutation } from '@/redux/features/ride/ride.api'
import { toast } from "sonner";

export default function DriveRequest() {
  const { data, isLoading } = useGetMyDrivesQuery(null)

  const [setRideStatus] = useSetRideStatusMutation()

  const sortedDrives = data?.slice().sort((a, b) =>
    new Date(b.timestamps.requestedAt).getTime() - new Date(a.timestamps.requestedAt).getTime()
  )

  if (isLoading) {
    return <Loading title='Drive Request' />
  }

  const handleAction = async (id: string, action: string) => {
    try {
      await setRideStatus({ id, action });
      toast.success(`Ride ${action} successfully.`)
    }
    catch (err) {
      console.log(err)
      toast.error(`Ride ${action} unsuccessfull.`)
    }

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
                  {drive.status === 'requested' ? (
                    <div className='flex gap-2'>
                      <button onClick={() => handleAction(drive._id, "accepted")} className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600'>
                        {isLoading ? "Accepting" : "Accept"}
                      </button>
                      <button onClick={() => handleAction(drive._id, "rejected")} className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'>
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className='text-gray-500'>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}