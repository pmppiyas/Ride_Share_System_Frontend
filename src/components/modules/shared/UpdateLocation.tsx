import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useUpdateProfileMutation } from '@/redux/features/auth/auth.api';
import { getUserLocation } from '@/utils/getUserLocation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function UpdateLocation() {
  const { me } = useAuth();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [updateProfile, { isLoading, isError }] = useUpdateProfileMutation();

  // 1. Get user location
  const handleGetLocation = async () => {
    try {
      const loc = await getUserLocation();
      console.log(loc);

      if (loc) {
        await updateProfile({
          id: me.data._id,
          data: {
            location: {
              type: "Point",
              coordinates: [loc.lat, loc.lng]
            },
          },
        });
      }

    } catch (err) {
      setError((err as Error).message || 'Failed to get location');
    }
  };

  const updateLocation = async () => {
    if (!location || !me?.data?._id) return;

    try {
      toast.success('Location updated successfully!');
    } catch (err) {
      toast.error('Failed to update location');
      console.error(err);
    }
  };


  useEffect(() => {
    const fetchAndUpdate = async () => {
      await handleGetLocation();

    };
    fetchAndUpdate();
  }, []);


  useEffect(() => {
    if (location) {
      updateLocation();
    }
  }, []);



  return (
    <div>

      <Button>Update Location</Button>
    </div>
  )
}
