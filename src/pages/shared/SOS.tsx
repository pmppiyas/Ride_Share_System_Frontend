import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { getCurrentLocation, type Location } from '@/utils/GetCurrentLocation';

export function EmergencySOS() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);

  const handleSOS = async () => {
    setOpen(false);

    getCurrentLocation(
      (loc: Location) => {
        toast.success("Your Location Sended, We are helping as soon as possible.");
        setLocation(loc);
      },
      () => toast.error("Location access denied")
    );

  };


  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/70  hover:to-primary rounded-full w-16 h-16 shadow-xl"
              onClick={() => setOpen(true)}
            >
              <AlertTriangle className="w-6 h-6 text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Emergency SOS</p>
          </TooltipContent>
        </Tooltip>

        {/* Confirmation Dialog */}
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Activate Emergency SOS?</AlertDialogTitle>
            </AlertDialogHeader>
            <p className="text-muted-foreground text-sm mt-2">
              This will immediately notify emergency services with your location (if available).
            </p>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSOS} className="bg-primary hover:bg-primary/90">
                Send SOS
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}
