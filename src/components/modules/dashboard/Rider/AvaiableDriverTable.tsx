import React from "react";
import { Search } from "lucide-react"; // or wherever your icon comes from
import DriverTableRow from '@/components/modules/dashboard/Rider/DriverTableRow';
import type { Driver } from '@/types/driver.types';

interface AvailableDriversPanelProps {
  availableDrivers: Driver[];
  handleAssignDriver: (driver: Driver) => void;
  handleViewDriverDetails: (driver: Driver) => void;
}

export const AvailableDriversPanel: React.FC<AvailableDriversPanelProps> = ({
  availableDrivers,
  handleAssignDriver,
  handleViewDriverDetails,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 rounded-full p-1">
              <Search className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800 text-lg">
                Available Drivers ({availableDrivers.length})
              </h3>
              <p className="text-green-600 text-sm">
                Click on drivers in the map (🚗✅) or table rows for details
              </p>
            </div>
          </div>
          <div className="text-xs text-green-600 bg-green-200 px-2 py-1 rounded">
            Real-time data
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver Info
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle Model
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distance
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {availableDrivers.map((driver, index) => (
              <DriverTableRow
                key={driver._id || index}
                driver={driver}
                index={index}
                onAssign={handleAssignDriver}
                onViewDetails={handleViewDriverDetails}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>Showing {availableDrivers.length} available driver(s)</div>
          <div>Click any row to view detailed driver information</div>
        </div>
      </div>
    </div>
  );
};