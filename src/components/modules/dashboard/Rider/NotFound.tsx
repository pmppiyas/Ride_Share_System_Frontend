import { Button } from '@/components/ui/button';
import { Search, RotateCcw } from 'lucide-react';


interface NotFoundProps {
  handleFind: () => void;
  handleReset: () => void;
  isLoading: boolean;
}

export default function NotFound({ handleFind, handleReset, isLoading }: NotFoundProps) {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <div className="space-y-4">
        <div className="text-6xl">🚗</div>
        <div>
          <h3 className="text-lg font-medium text-primary mb-2">
            No Available Drivers Found
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            No drivers are currently available in the selected area.
            Try expanding your search radius or selecting different locations.
          </p>
        </div>
        <div className="flex justify-center gap-3 pt-4">
          <Button variant="outline" onClick={handleFind} disabled={isLoading}>
            <Search className="h-4 w-4 mr-2" />
            Search Again
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Different Locations
          </Button>
        </div>
      </div>
    </div>
  );
}