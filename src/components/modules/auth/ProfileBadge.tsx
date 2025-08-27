import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface ProfileBadgeProps {
  me: {
    name: string;
    role: string;
    email: string;
  };
}

export default function ProfileBadge({ me }: ProfileBadgeProps) {

  return (
    <div className="p-4 border-b bg-muted/30">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10 border-2 border-primary/20">
          <AvatarImage src="/api/placeholder/40/40" alt="Admin" />
          <AvatarFallback className="bg-primary/10">
            {me?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className='flex items-center  gap-6'>
            <p className="font-semibold text-sm truncate">{me.name}</p>
            <p className="font-semibold text-[10px] truncate">( {me.role} )</p>
          </div>
          <p className="text-xs text-muted-foreground truncate">{me.email}</p>
        </div>

      </div>
      <div className="text-xs text-muted-foreground">
        <div className="flex justify-between mb-1">
          <span>System Status</span>
          <span className="text-green-600 font-medium">Online</span>
        </div>
        <Progress value={98} className="h-1" />
      </div>
    </div >
  )
}
