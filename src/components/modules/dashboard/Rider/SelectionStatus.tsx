import type { SelectingMode } from '@/types';

interface SelectionStatusProps {
  selecting: SelectingMode;
}

export default function SelectionStatus({ selecting }: SelectionStatusProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center gap-2 text-blue-800">
        <div className="font-semibold">Currently selecting:</div>
        <div className="capitalize font-medium bg-blue-200 px-2 py-1 rounded text-sm">
          {selecting}
        </div>
      </div>
      <div className="text-blue-600 text-sm mt-1">
        {selecting === 'pickup' && '📍 Click on the map to set your pickup location'}
        {selecting === 'destination' && '🏁 Click on the map to set your destination'}
      </div>
    </div>
  );
}