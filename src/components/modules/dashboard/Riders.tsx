import { Button } from '@/components/ui/button';

const Rider = () => {
  // Demo Riders
  const riders = [
    {
      _id: "1",
      name: "Milu",
      email: "milu@gamil.com",
      phone: "01777233717",
      rideHistory: 2,
      isActive: "ACTIVE",
      isVerified: false,
      createdAt: "2025-08-05T12:22:41.001+00:00",
    },
    {
      _id: "2",
      name: "Raha",
      email: "raha@gamil.com",
      phone: "01777233718",
      rideHistory: 3,
      isActive: "ACTIVE",
      isVerified: true,
      createdAt: "2025-08-05T13:26:13.694+00:00",
    },
    {
      _id: "3",
      name: "Prince",
      email: "princepiyas2021@gmail.com",
      phone: "01777233799",
      rideHistory: 1,
      isActive: "ACTIVE",
      isVerified: false,
      createdAt: "2025-08-06T18:20:42.851+00:00",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Rider Details </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {riders.map((rider) => (
          <div
            key={rider._id}
            className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-1">{rider.name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Email:</strong> {rider.email}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Phone:</strong> {rider.phone}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Ride History:</strong> {rider.rideHistory} rides
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Status:</strong> {rider.isActive}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Verified:</strong> {rider.isVerified ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Joined:</strong>{" "}
              {new Date(rider.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-4 flex justify-end">
              <Button >Suspend</Button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rider;
