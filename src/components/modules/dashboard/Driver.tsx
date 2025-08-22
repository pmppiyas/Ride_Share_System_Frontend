import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGetDriverRequestQuery, useGetDriversQuery } from '@/redux/features/driver/driver.api';
import TourPagination from '@/components/modules/shared/TourPagination';


const Driver = () => {
  const [currentDPage, setCurrentDPage] = useState(1);
  const [currentRDPage, setCurrentRDPage] = useState(1);

  const { data: drivers, isLoading: driverLoading } = useGetDriversQuery({
    limit: "6",
    page: currentDPage.toString(),
  });


  const { data: requests, isLoading: requestLoading } = useGetDriverRequestQuery({
    limit: "6",
    page: currentRDPage.toString(),
  })


  if (driverLoading || requestLoading) return <div>Loading...</div>;



  return (
    <div>


      <div className="p-6">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-bold mb-4 text-primary">Avaiable Drivers</h2>
          <h2 className="text-xl font-bold mb-4 text-primary">Total: {drivers.users.length} Drivers</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drivers.users.map((driver: any) => (
            <div
              key={driver._id}
              className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-1">{driver.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> {driver.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Phone:</strong> {driver.phone}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>License:</strong> {driver.licenseNumber}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Status:</strong> {driver.rideStatus}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Earnings:</strong> ${driver.earnings}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Approval:</strong> {driver.approvalStatus}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Available:</strong> {driver.isAvailable ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Created:</strong>{" "}
                {new Date(driver.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-between">
                <Button variant={"outline"}>Suspend</Button>
                <Button className="ml-2">Contacts</Button>

              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        {drivers.users.length > 0 ? <TourPagination
          page={drivers?.meta?.page}
          totalPage={drivers?.meta?.totalPage}
          onPageChange={(newPage) => setCurrentDPage(newPage)}
        /> : <div className='flex h-20 w-full border-2 items-center justify-center'>No Drivers Found !</div>}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-bold mb-4 text-primary">All Driver Drivers</h2>
          <h2 className="text-xl font-bold mb-4 text-primary">Total: {requests.users.length} Drivers</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {requests.users.map((driver: any) => (
            <div
              key={driver._id}
              className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center ">
                <h2 className="text-xl font-bold mb-4 text-primary">Requested Drivers</h2>
                <h2 className="text-xl font-bold mb-4 text-primary">Total: {requests?.meta?.total} Drivers</h2>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> {driver.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Phone:</strong> {driver.phone}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>License:</strong> {driver.licenseNumber}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Status:</strong> {driver.rideStatus}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Earnings:</strong> ${driver.earnings}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Approval:</strong> {driver.approvalStatus}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Available:</strong> {driver.isAvailable ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Created:</strong>{" "}
                {new Date(driver.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-between">
                <Button variant={"outline"}>Cancel</Button>
                <Button className="ml-2">Accept</Button>

              </div>
              {/* Pagination */}
              <TourPagination
                page={requests?.meta?.page}
                totalPage={requests?.meta?.totalPage}
                onPageChange={(newPage) => setCurrentDPage(newPage)}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {requests.users.length > 0 ? <TourPagination
          page={requests?.meta?.page}
          totalPage={requests?.meta?.totalPage}
          onPageChange={(newPage) => setCurrentRDPage(newPage)}
        /> : <div className='flex h-20 w-full border-2 items-center justify-center'>No New Requests Found !</div>}
      </div>
    </div>
  );
};

export default Driver;
