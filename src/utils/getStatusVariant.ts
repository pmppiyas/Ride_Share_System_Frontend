export const getStatusVariant = (
  status: string
): "default" | "secondary" | "outline" | "destructive" => {
  switch (status.toLowerCase()) {
    case "requested":
      return "secondary";
    case "accepted":
      return "default";
    case "completed":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};
