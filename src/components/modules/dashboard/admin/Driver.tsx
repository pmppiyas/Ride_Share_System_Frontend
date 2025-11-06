/* eslint-disable @typescript-eslint/no-explicit-any */
import DriverRequestAction from '@/components/modules/shared/DriverRequestAction';
import TourPagination from "@/components/modules/shared/TourPagination";
import { Button } from "@/components/ui/button";
import {
  useDriverReqHandleMutation,
  useGetDriverRequestQuery,
  useGetDriversQuery,
  useSuspendDriverMutation,
} from "@/redux/features/driver/driver.api";
import type { Driver } from '@/types';
import { useState } from "react";
import { toast } from "sonner";
import LoadingSpinner from './../../../../../public/loading';


const Drivers = () => {
  const [currentDPage, setCurrentDPage] = useState(1);
  const [currentRDPage, setCurrentRDPage] = useState(1);
  const { data: drivers, isLoading: driverLoading } = useGetDriversQuery({
    limit: "6",
    page: currentDPage.toString(),
  });

  const { data: requests, isLoading: requestLoading } = useGetDriverRequestQuery({
    limit: "6",
    page: currentRDPage.toString(),
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [actionType, setActionType] = useState<"approved" | "refuse">("approved");
  const [suspendDriver, { isLoading: suspending }] = useSuspendDriverMutation();


  const [handleRequest, { isLoading }] = useDriverReqHandleMutation();

  const openModal = (driver: any, type: "approved" | "refuse") => {
    setSelectedDriver(driver);
    setActionType(type);
    setModalOpen(true);
  };



  const handleSuspend = async (driver: any) => {
    const newStatus = driver.isActive.toUpperCase() === "ACTIVE" ? "BLOCK" : "ACTIVE";

    try {
      await suspendDriver({ id: driver._id, status: newStatus }).unwrap();
      toast.success(
        `${driver.name} has been ${newStatus === "BLOCK" ? "suspended" : "activated"} successfully.`
      );
    } catch (err) {
      console.log(err);
      toast.error("Failed to update driver status.");
    }
  };



  const confirmAction = async () => {
    if (!selectedDriver) return;
    try {
      await handleRequest({
        id: selectedDriver._id,
        status: actionType,
      }).unwrap();
      toast.success(`${selectedDriver.name} has been ${actionType === "approved" ? "approved" : "refused"} successfully.`);

      setModalOpen(false);
    } catch (err) {
      console.log(err)
      toast.error("Failed to process the request. Please try again.");
    }
  };

  if (driverLoading || requestLoading) return <LoadingSpinner />

  console.log(drivers?.drivers)


  return (
    <div>
      {/* Available Drivers Section */}
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4 text-primary">Available Drivers</h2>
          <h2 className="text-xl font-bold mb-4 text-primary">
            Total: {drivers?.drivers?.length} Drivers (in Page)
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drivers?.drivers.map((driver: any) => (
            <div
              key={driver._id}
              className={`border rounded-xl shadow p-4 hover:shadow-lg transition ${driver.isActive.toUpperCase() === "BLOCK" ? "bg-red-100" : "bg-green-200"
                }`}
            >
              <h3 className="text-lg font-semibold mb-1">{driver.name}</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {driver.email}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Phone:</strong> {driver.phone}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>License:</strong> {driver.licenseNumber}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Status:</strong> {driver.rideStatus}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Earnings:</strong> ${driver.earnings}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Approval:</strong> {driver.approvalStatus}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Available:</strong> {driver.isAvailable ? "Yes" : "No"}</p>
              <p className="text-sm text-gray-600"><strong>Created:</strong> {new Date(driver.createdAt).toLocaleDateString()}</p>
              <div className="mt-4 flex justify-between">
                <Button
                  onClick={() => handleSuspend(driver)}
                  variant={driver.isActive.toUpperCase() === "ACTIVE" ? "destructive" : "default"}
                  disabled={suspending}
                >
                  {driver.isActive.toUpperCase() === "ACTIVE" ? "Suspend" : "Activate"}
                </Button>


                <Button onClick={() => toast.success('This feature is coming soon!')} className="ml-2">
                  Contacts
                </Button>
              </div>


            </div>
          ))}
        </div>
        {drivers.drivers.length >= 0 && drivers?.drivers.length === drivers?.meta?.limit && (
          <TourPagination
            page={drivers?.meta?.page}
            totalPage={drivers?.meta?.totalPage}
            onPageChange={(newPage) => setCurrentDPage(newPage)}
          />
        )}

      </div>

      {/* Requested Drivers Section */}
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4 text-primary">All Requested Drivers</h2>
          <h2 className="text-xl font-bold mb-4 text-primary">
            Total: {requests.users.length} Request
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {requests.users.map((driver: Driver) => (
            <div
              key={driver._id}
              className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-1">{driver.name}</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {driver.email}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Phone:</strong> {driver.phone}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>License:</strong> <span className='uppercase'>{driver.vehicleInfo.type}</span></p>
              <p className="text-sm text-gray-600 mb-1"><strong>License:</strong> {driver.vehicleInfo.plateNumber}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Status:</strong> {driver.isActive}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Approval:</strong> {driver.approvalStatus}</p>
              <p className="text-sm text-gray-600"><strong>Created:</strong> {new Date(driver.createdAt).toLocaleDateString()}</p>
              <div className="mt-4 flex justify-between">
                <Button onClick={() => {
                  openModal(driver, "refuse");
                }} variant="outline">Reject</Button>
                <Button onClick={() => {
                  openModal(driver, "approved");
                }} className="ml-2">Approve</Button>
              </div>
            </div>
          ))}
        </div>
        {requests.users.length >= 0 && requests?.users.length === requests?.meta?.limit && (
          <TourPagination
            page={requests?.meta?.page}
            totalPage={requests?.meta?.totalPage}
            onPageChange={(newPage) => setCurrentRDPage(newPage)}
          />
        )}

        {
          requests.users.length <= 0 && (
            <div className="flex h-20 w-full border-2 items-center justify-center">
              No Request Found!
            </div>
          )
        }

      </div>

      {/* Modal for Accept/Cancel */}
      <DriverRequestAction
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmAction}
        isLoading={isLoading}
        actionType={actionType}
      />
    </div >
  );
};

export default Drivers;