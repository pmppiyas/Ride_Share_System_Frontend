/* eslint-disable @typescript-eslint/no-explicit-any */

import { AdminEditModal } from '@/components/modules/shared/EditAdminModal';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useUpdateProfileMutation } from '@/redux/features/auth/auth.api';
import { Role, type IError } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DProfile() {
  const { me, isError } = useAuth();
  const user = me?.data;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);


  const [updateProfile] = useUpdateProfileMutation();


  if (isError) toast.error('Failed to fetch user data. Please try again.');


  const handleEditSubmit = async (formData: any) => {

    try {
      await updateProfile({ id: selectedAdmin._id, ...formData }).unwrap();
      toast.success('Profile updated successfully!');
      setIsEditModalOpen(false);
      setSelectedAdmin(null);
    } catch (err) {
      console.error(err);
      toast.error('Profile update failed!');
    }
  };

  return (
    <div className="">
      {/* Profile Card */}
      <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Info */}
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Phone:</strong> {user?.phone}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Location:</strong> {user?.location?.coordinates?.join(', ')}</p>
            <p><strong>Created:</strong> {new Date(user?.createdAt).toLocaleString()}</p>
          </div>

          {/* Center Avatar */}
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

          {/* Right Info */}
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Phone:</strong> {user?.phone}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Location:</strong> {user?.location?.coordinates?.join(', ')}</p>
            <p><strong>Created:</strong> {new Date(user?.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between mt-6 gap-3">
          <Button
            onClick={() => {
              setSelectedAdmin(user);
              setIsEditModalOpen(true);
            }}
            className="flex items-center gap-2 bg-primary hover:bg-primary/80 w-2/4 mx-auto"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>


      <AdminEditModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        driverData={selectedAdmin}
        isLoading={false}
      />
    </div>
  );
}