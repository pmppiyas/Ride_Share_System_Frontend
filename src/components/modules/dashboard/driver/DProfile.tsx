/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, CarFront, Check } from 'lucide-react';
import { Link } from 'react-router';
import { DriverRegistrationModal } from '@/components/modules/shared/DriverRequestModal';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useDriverRegisterMutation } from '@/redux/features/driver/driver.api';
import { Role, type IError } from '@/types';
import { useGetMyRidesQuery } from '@/redux/features/ride/ride.api';
import RideCard from '@/components/modules/dashboard/admin/RideCard';
import { DriverEditModal } from '@/components/modules/shared/EditProfileModal';
import { useUpdateProfileMutation } from '@/redux/features/auth/auth.api';

export default function DProfile() {
  const { me, isError } = useAuth();
  const user = me?.data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const [driverRegister, { isLoading }] = useDriverRegisterMutation();
  const [updateProfile, { isLoading: updateLoading }] = useUpdateProfileMutation();
  const { data, isLoading: RLoading } = useGetMyRidesQuery({ limit: '3' });

  if (isError) toast.error('Failed to fetch user data. Please try again.');
  if (RLoading) return <h2 className="text-center mt-6">Loading...</h2>;

  const Rides = data?.rides || [];

  const beADriver = () => {
    if (user?.role === Role.DRIVER && user.approvalStatus === 'approved') {
      toast.success('You are already a driver.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleDriverSubmit = async (formData: any) => {
    try {
      if (user?.role === Role.DRIVER && user.approvalStatus === 'approved') {
        toast.success('You are already a driver.');
        return;
      }
      await driverRegister(formData).unwrap();
      toast.success('Driver registration successful! 🎉');
    } catch (err) {
      const error = err as IError;
      console.error('Error registering driver:', err);

      if (error.status === 409) return toast.error(error.data.message);
      toast.error('Failed to register driver. Please try again.');
    }
    setIsModalOpen(false);
  };

  const handleEditSubmit = async (formData: any) => {
    console.log(formData)
    try {

      await updateProfile({ id: selectedDriver._id, ...formData }).unwrap();
      toast.success("Update profile successfully!");
      setIsEditModalOpen(false);
      setSelectedDriver(null);
    } catch (err) {
      console.error(err);
      toast.error("Update profile failed!");
    }
  };



  const requested = user?.approvalStatus === 'pending';
  const approved = user?.approvalStatus === 'approved' && user?.role === Role.DRIVER;

  return (
    <div className="">
      {/* Profile Card */}
      <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Phone:</strong> {user?.phone}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Location:</strong> {user?.location?.coordinates?.join(', ')}</p>
            <p><strong>Created:</strong> {new Date(user?.createdAt).toLocaleString()}</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mb-3">
              {user?.name?.charAt(0)}
            </div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <span
              className={`mt-2 px-3 py-1 text-sm rounded-full ${user?.isActive === 'ACTIVE'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
                }`}
            >
              {user?.isActive}
            </span>
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Phone:</strong> {user?.phone}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Location:</strong> {user?.location?.coordinates?.join(', ')}</p>
            <p><strong>Created:</strong> {new Date(user?.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-between mt-6 gap-3">
          {requested ? (
            <Button onClick={() => toast.success('Your driver request is pending.')} className="flex items-center gap-2">
              <CarFront className="h-4 w-4" />
              Driver Request Pending
            </Button>
          ) : (
            <Button onClick={beADriver} className="flex items-center gap-2">
              <CarFront className="h-4 w-4" />
              Be a Driver
            </Button>
          )}

          {approved && (
            <Button onClick={() => toast.success('You are a verified driver.')} className="flex items-center gap-2 bg-green-500 hover:bg-green-600">
              <Check className="h-4 w-4" />
              Verified Driver
            </Button>
          )}

          <Button
            onClick={() => {
              setSelectedDriver(user);
              setIsEditModalOpen(true);
            }}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Ride History */}
      <div className="mt-10 flex">
        {Rides.length > 0 ? (
          <div className="grid gap-4">
            {Rides.map((ride: any) => <RideCard key={ride._id} ride={ride} />)}
          </div>
        ) : (
          <Button className="w-1/3 mx-auto mt-4">
            <Link to="/rider/find_driver">Make A Ride</Link>
          </Button>
        )}
      </div>

      {/* Modals */}
      <DriverRegistrationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleDriverSubmit}
        isLoading={isLoading}
      />

      <DriverEditModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        driverData={selectedDriver}
        isLoading={false}
      />
    </div>
  );
}
