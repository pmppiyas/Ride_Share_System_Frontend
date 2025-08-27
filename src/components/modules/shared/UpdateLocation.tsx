import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { useUpdateProfileMutation } from '@/redux/features/auth/auth.api';
import { getUserLocation } from '@/utils/getUserLocation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function UpdateLocation() {
  const { me } = useAuth();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // Get user location and update profile
  const handleGetLocation = async () => {
    if (!me?.data?._id) {
      toast.error('User not authenticated');
      return;
    }

    setIsGettingLocation(true);
    setError(null);

    try {
      const loc = await getUserLocation();
      console.log(loc);

      if (loc) {
        setLocation(loc);
        await updateProfile({
          id: me.data._id,
          data: {
            location: [loc.lat, loc.lng]
          },
        }).unwrap();

      } else {
        throw new Error('Unable to get location');
      }
    } catch (err) {
      const errorMessage = (err as Error).message || 'Failed to get location';
      setError(errorMessage);
      // toast.error(errorMessage);
      console.error(err);
    } finally {
      setIsGettingLocation(false);
    }
  };


  // useEffect(() => {
  //   handleGetLocation();
  // });

  return (
    <div className="space-y-4">
      <Button
        onClick={handleGetLocation}
        disabled={isGettingLocation || isLoading}
        className="w-full"
      >
        {isGettingLocation || isLoading ? 'Updating Location...' : 'Update Location'}
      </Button>

      {error && (
        <div className="text-red-500 text-sm">
          Error: {error}
        </div>
      )}

      {location && (
        <div className="text-green-600 text-sm">
          Current location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
        </div>
      )}
    </div>
  );
}