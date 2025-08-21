import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Pencil, CarFront } from 'lucide-react';
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Profile() {
  const { me } = useAuth()
  const user = me.data;
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    toast.error("Please login to view your profile");
  }

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg- shadow-lg rounded-2xl border border-accent">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mb-3">
            {user.name?.charAt(0)}
          </div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <span
            className={`mt-2 px-3 py-1 text-sm rounded-full ${user.isActive === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
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
            <strong>Location:</strong>{" "}
            {user.location?.coordinates?.join(", ")}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>

        </div>

        <div className='flex justify-between mt-6'>
          <Button><CarFront /> Be a Driver</Button>
          <Button><Pencil /> Edit</Button>
        </div>
      </div>


      <div>

        <h3 className="text-lg font-semibold mt-10 mb-4 text-center">My Rides</h3>

        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4">
          {/* Example ride item */}
          <div className="border-b py-2">
            <p className="text-gray-800">Ride from A to B</p>
            <p className="text-gray-500 text-sm">Date: 2023-10-01</p>
          </div>

        </div>
      </div>
    </div>
  );
}