import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, CarFront, CheckLine } from 'lucide-react';
import { DriverRegistrationModal } from '@/components/modules/shared/DriverRequestModal';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useDriverRegisterMutation } from '@/redux/features/driver/driver.api';
import type { IError } from '@/types';



export default function Profile() {
  const { me, isError } = useAuth()
  if (isError) {
    toast.error("Failed to fetch user data. Please try again.");
  }
  const user = me?.data;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [driverRegister] = useDriverRegisterMutation(undefined)
  console.log('👤 User Data:', user);
  const requested = user.approvalStatus === 'pending';
  const approved = user.approvalStatus === 'approved';
  console.log(approved)
  const handleDriverSubmit = async (data: any) => {
    console.log('🚗 Driver Registered:', data);
    try {
      await driverRegister(data).unwrap();
      toast.success('Driver registration successful! 🎉');
    } catch (err) {
      const error = err as IError;
      console.error('Error registering driver:', err);

      if (error.status === 409) {
        return toast.error(error.data.message);
      }
      toast.error('Failed to register driver. Please try again.');
      return;
    }
    toast.success('Driver registered successfully! 🎉');
    setIsModalOpen(false);

  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Profile Card */}
      <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mb-3">
            {user.name?.charAt(0)}
          </div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <span
            className={`mt-2 px-3 py-1 text-sm rounded-full ${user.isActive === 'ACTIVE'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
              }`}
          >
            {user.isActive}
          </span>
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-700">
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Location:</strong>{' '}
            {user.location?.coordinates?.join(', ')}
          </p>
          <p>
            <strong>Created:</strong>{' '}
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex justify-between mt-6">


          {
            requested && <Button
              onClick={() => toast.success('Your driver request is still pending.')}
              className="flex items-center gap-2"
            >
              <CarFront className="h-4 w-4" />
              Driver Request Pending
            </Button>
          }
          {
            approved && <Button
              onClick={() => toast.success('Your are a verified driver.')}
              className="flex items-center gap-2 cursor-not-allowed"
            >
              <CheckLine className="h-4 w-4" />
              Verified Driver
            </Button>
          }
          {user.role === "rider" && <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <CarFront className="h-4 w-4" />
            Be a Driver
          </Button>}
          <Button className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Ride History */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4 text-center">My Rides</h3>
        <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
          <div className="border-b pb-2">
            <p className="text-gray-800">Ride from A to B</p>
            <p className="text-gray-500 text-sm">Date: 2023-10-01</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-800">Ride from C to D</p>
            <p className="text-gray-500 text-sm">Date: 2023-11-12</p>
          </div>
          <div>
            <p className="text-gray-800">Ride from E to F</p>
            <p className="text-gray-500 text-sm">Date: 2024-01-05</p>
          </div>
        </div>
      </div>

      {/* Driver Registration Modal */}
      {isModalOpen && <DriverRegistrationModal
        open={isModalOpen}

        onClose={() => {
          setIsModalOpen(false)
        }}
        onSubmit={handleDriverSubmit}
        isLoading={false}
      />}
    </div>
  );
}