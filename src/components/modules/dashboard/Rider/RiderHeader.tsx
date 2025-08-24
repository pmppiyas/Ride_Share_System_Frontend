import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Search, RotateCcw } from "lucide-react";

export default function RiderHeader({ handleRefreshDrivers }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Search className="h-6 w-6" />
          Find a Driver
        </CardTitle>
        <p className="text-blue-100 mt-1">
          Select pickup and destination locations to find nearby drivers
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleRefreshDrivers}
        className="text-blue-600 border-blue-200 hover:bg-blue-50"
      >
        <RotateCcw className="h-4 w-4 mr-1" />
        Refresh
      </Button>
    </div>
  )
}
