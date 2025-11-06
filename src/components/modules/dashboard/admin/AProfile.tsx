/* eslint-disable @typescript-eslint/no-explicit-any */


import { ChangePasswordModal } from '@/components/modules/shared/ChangePasswordModal';
import { AdminEditModal } from '@/components/modules/shared/EditAdminModal';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useResetPasswordMutation, useUpdateProfileMutation } from '@/redux/features/auth/auth.api';
import { type IError } from '@/types';
import { KeyRound, Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DProfile() {
  const { me, isError } = useAuth();
  const user = me?.data;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);

  const [updateProfile] = useUpdateProfileMutation();
  const [resetPassword, { isLoading: isPasswordLoading }] = useResetPasswordMutation();

  if (isError) toast.error('Failed to fetch user data. Please try again.');

  const handleEditSubmit = async (formData: any) => {
    console.log(formData);
    try {
      await updateProfile({
        id: selectedAdmin._id,
        ...formData
      }).unwrap();
      toast.success('Profile updated successfully!');
      setIsEditModalOpen(false);
      setSelectedAdmin(null);
    } catch (err) {
      console.error(err);
      const error = err as IError;
      toast.error(error?.data?.message || 'Profile update failed!');
    }
  };

  const handlePasswordChange = async (passwordData: { oldPassword: string; newPassword: string }) => {
    try {
      await resetPassword(passwordData).unwrap();
      toast.success('Password changed successfully!');
      setIsPasswordModalOpen(false);
    } catch (err) {
      console.error(err);
      const error = err as IError;
      toast.error(error?.data?.message || 'Password change failed!');
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
        <div className="flex flex-wrap justify-center mt-6 gap-3">
          <Button
            onClick={() => {
              setSelectedAdmin(user);
              setIsEditModalOpen(true);
            }}
            className="flex items-center gap-2 bg-primary hover:bg-primary/80"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>

          <Button
            onClick={() => setIsPasswordModalOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <KeyRound className="h-4 w-4" />
            Change Password
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

      <ChangePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordChange}
        isLoading={isPasswordLoading}
      />
    </div>
  );
}