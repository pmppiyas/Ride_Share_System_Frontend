export type Location = { lat: number; lng: number };

export const getCurrentLocation = (
  onSuccess: (location: Location) => void,
  onError?: () => void
) => {
  if (!navigator.geolocation) {
    onError?.();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const location = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      onSuccess(location);
      return location

    },
    (err) => {
      onError?.();
      return err.message;

    }
  );
};