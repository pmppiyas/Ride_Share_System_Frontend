import React from "react";
import { Button } from "@/components/ui/button";
import type { Driver } from '@/types/driver.types';

interface DriverTableRowProps {
  driver: Driver;
  index: number;
  onAssign: (driver: Driver) => void;
  onViewDetails: (driver: Driver) => void;
}

const DriverTableRow: React.FC<DriverTableRowProps> = ({
  driver,
  index,
  onAssign,
  onViewDetails,
}) => {
  return (
    <tr
      key={driver._id || index}
      className="hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => onViewDetails(driver)}
    >
      {/* Driver Info */}
      <td className="px-4 py-3">
        <div className="font-medium text-primary">
          {driver.name || "Unknown Driver"}
        </div>
      </td>

      {/* Contact */}
      <td className="px-4 py-3 text-gray-600">
        {driver.phone || "N/A"}
      </td>

      {/* Vehicle Type */}
      <td className="px-4 py-3">
        <div className="capitalize text-gray-600">
          {driver.vehicleInfo?.type || "N/A"}
        </div>
        {driver.vehicleInfo?.plateNumber && (
          <div className="text-xs text-gray-500">
            {driver.vehicleInfo.plateNumber}
          </div>
        )}
      </td>

      {/* Vehicle Model */}
      <td className="px-4 py-3 text-gray-600">
        <div>{driver.vehicleInfo?.model || "N/A"}</div>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <span
            className={`inline-block w-2 h-2 rounded-full ${driver.isAvailable
              ? "bg-green-500"
              : "bg-red-500"
              }`}
          ></span>

        </div>
      </td>

      {/* Distance */}
      <td className="px-4 py-3">
        {driver.distance && (
          <div className="text-sm text-gray-600">
            {driver.distance.toFixed(1)} km
          </div>
        )}

      </td>

      {/* Action */}
      <td className="px-4 py-3">
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onAssign(driver);
          }}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Assign
        </Button>
      </td>
    </tr>
  );
};

export default DriverTableRow;