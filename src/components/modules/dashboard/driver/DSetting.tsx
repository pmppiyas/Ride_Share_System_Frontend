import UpdateLocation from '@/components/modules/shared/UpdateLocation';
import { Switch } from '@/components/ui/switch';


import { useActiveStatusMutation } from '@/redux/features/driver/driver.api';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DSetting() {
  const [isOnline, setIsOnline] = useState(false);
  const [activeStatusMutation, { isLoading }] = useActiveStatusMutation();

  const toggleStatus = async () => {
    try {
      const newStatus = !isOnline;
      await activeStatusMutation({ status: newStatus }).unwrap();
      setIsOnline(newStatus);
      toast.success(`You are now ${newStatus ? "online" : "offline"}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to change status");
    }
  };

  return (
    <div className="space-y-4 p-4">
      <UpdateLocation />

      <div className="flex items-center gap-2">
        <span>Status:</span>
        <Switch
          checked={isOnline}
          onCheckedChange={toggleStatus}
          disabled={isLoading}
        />
        <span>{isOnline ? "Online" : "Offline"}</span>
      </div>

    </div>
  );
}
