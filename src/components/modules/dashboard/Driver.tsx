import { Button } from '@/components/ui/button';


const Driver = () => {

  const drivers = [
    {
      _id: "1",
      name: "Mahi",
      email: "mahi@gamil.com",
      phone: "01777233765",
      licenseNumber: "DL-123456",
      rideStatus: "idle",
      earnings: 1200,
      approvalStatus: "approved",
      isAvailable: true,
      createdAt: "2025-08-05T16:41:30.633+00:00",
    },
    {
      _id: "2",
      name: "Ratul",
      email: "ratul@gamil.com",
      phone: "01777233711",
      licenseNumber: "DL-987654",
      rideStatus: "on-ride",
      earnings: 800,
      approvalStatus: "pending",
      isAvailable: false,
      createdAt: "2025-08-10T10:30:20.633+00:00",
    },
    {
      _id: "3",
      name: "Sakib",
      email: "sakib@gamil.com",
      phone: "01777233799",
      licenseNumber: "DL-555888",
      rideStatus: "idle",
      earnings: 1500,
      approvalStatus: "approved",
      isAvailable: true,
      createdAt: "2025-08-12T09:15:30.633+00:00",
    },
  ];

  return (
    <div>


      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-primary">Avaiable Drivers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drivers.map((driver) => (
            <div
              key={driver._id}
              className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-1">{driver.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> {driver.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Phone:</strong> {driver.phone}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>License:</strong> {driver.licenseNumber}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Status:</strong> {driver.rideStatus}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Earnings:</strong> ${driver.earnings}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Approval:</strong> {driver.approvalStatus}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Available:</strong> {driver.isAvailable ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Created:</strong>{" "}
                {new Date(driver.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-between">
                <Button variant={"outline"}>Suspend</Button>
                <Button className="ml-2">Contacts</Button>

              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-primary" >Requested Drivers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drivers.map((driver) => (
            <div
              key={driver._id}
              className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-1">{driver.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> {driver.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Phone:</strong> {driver.phone}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>License:</strong> {driver.licenseNumber}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Status:</strong> {driver.rideStatus}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Earnings:</strong> ${driver.earnings}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Approval:</strong> {driver.approvalStatus}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Available:</strong> {driver.isAvailable ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Created:</strong>{" "}
                {new Date(driver.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-between">
                <Button variant={"outline"}>Cancel</Button>
                <Button className="ml-2">Accept</Button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Driver;
