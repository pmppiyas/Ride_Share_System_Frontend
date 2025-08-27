
import { Loader2 } from "lucide-react";


interface LoadingTitle {
  title: string
}

export default function Loading({ title }: LoadingTitle) {
  return (
    <div className="flex justify-center items-center min-h-[500px]">
      <div className="text-center space-y-4">
        <Loader2 className="animate-spin h-12 w-12 mx-auto text-primary" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">Loading {title}...</h2>
          <p className="text-foreground/70 mt-1">Please wait while we fetch available drivers</p>
        </div>
      </div>
    </div>
  )
}
