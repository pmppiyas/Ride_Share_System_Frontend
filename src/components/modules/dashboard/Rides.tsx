import { useState, useEffect } from "react";

import TourPagination from "@/components/modules/shared/TourPagination";
import { useGetRidesQuery } from '@/redux/features/ride/ride.api';
import RideCard from '@/components/modules/dashboard/RideCard';

export default function Rides() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetRidesQuery({
    limit: "6",
    page: currentPage.toString(),
  });



  if (isLoading) return <div className="p-6">Loading rides...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load rides.</div>;
  console.log(data.users);
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-primary">All Rides</h2>

      <div className="space-y-4">
        {data.users?.map((ride: any) => (
          <RideCard ride={ride} />
        ))}
      </div>

      {/* Pagination */}
      {data.users.length > 0 ? (
        <TourPagination
          page={data?.meta?.page}
          totalPage={data?.meta?.totalPage}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      ) : (
        <div className="flex h-20 w-full border-2 items-center justify-center">
          No Rides Found!
        </div>
      )}
    </div>
  );
}