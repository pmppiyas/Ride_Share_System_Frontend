import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  actionType: "approved" | "refuse";
}

export default function DriverRequestAction({
  open,
  onClose,
  onConfirm,
  isLoading = false,
  actionType,
}: Props) {
  const title = actionType === "approved" ? "Confirm Acceptance" : "Confirm Cancellation";
  const message =
    actionType === "approved"
      ? "Are you sure you want to accept this driver request?"
      : "Are you sure you want to cancel this driver request?";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={actionType === "refuse" ? "text-red-500" : "text-green-600"}>
            {title}
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm">{message}</p>
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Close
          </Button>
          <Button
            variant={actionType === "refuse" ? "destructive" : "default"}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : actionType === "approved" ? "Accept" : "Cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}