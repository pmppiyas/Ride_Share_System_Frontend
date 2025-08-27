import { Button } from '@/components/ui/button'
import { MapPin } from "lucide-react"

interface GettingStartedProps {
  setSelecting: (value: string) => void;
}

export default function GettingStarted({ setSelecting }: GettingStartedProps) {
  return (
    <div className="text-center py-12 bg-blue-50 rounded-lg border border-blue-200">
      <div className="space-y-4">
        <div className="text-5xl">🗺️</div>
        <div>
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            Get Started
          </h3>
          <p className="text-blue-700 max-w-md mx-auto">
            Select your pickup location first, then your destination to find available drivers in your area.
          </p>
        </div>
        <div className="flex justify-center gap-3 pt-4">
          <Button
            onClick={() => setSelecting("pickup")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Start by Selecting Pickup
          </Button>
        </div>
      </div>
    </div>
  )
}
