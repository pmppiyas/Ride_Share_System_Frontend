import type { LocationDisplayProps, SelectingMode } from "@/types";
import { formatCoordinates } from "@/utils/FormateCoordinates";
import React from "react";

const getColorClass = (type: SelectingMode) =>
  type === "pickup" ? "text-green-600" : "text-red-600";


const getIcon = (type: SelectingMode): React.ReactNode =>
  type === "pickup" ? "📍" : "🏁";


export const LocationDisplay: React.FC<LocationDisplayProps> = ({
  location,
  type,
}) => {
  const color = getColorClass(type);
  const icon = getIcon(type);
  const hasLocation = Boolean(location);

  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50 shadow-sm">
      {/* Icon */}
      <div className={`text-xl ${color}`}>{icon}</div>

      {/* Text Content */}
      <div className="flex-1">
        <div className="font-semibold capitalize text-gray-800">
          {type} Location
        </div>

        {hasLocation ? (
          <div className={`font-mono text-xs ${color} font-semibold`}>
            {formatCoordinates(location!.lat, location!.lng)}
          </div>
        ) : (
          <div className="text-gray-500 text-xs italic">Not selected</div>
        )}
      </div>
    </div>
  );
};