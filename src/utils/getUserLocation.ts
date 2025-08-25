export async function getUserLocation(): Promise<{
  lat: number;
  lng: number;
} | null> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        resolve({ lat, lng });
      },
      (error) => {
        reject(`Unable to retrieve location: ${error.message}`);
      }
    );
  });
}
