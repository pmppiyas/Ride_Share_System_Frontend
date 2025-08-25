import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  LogOut,
  ChevronDown, Settings, Bell
} from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { useNavigate, Link } from "react-router";

import { toast } from "sonner";
import { useLogoutMutation } from '@/redux/features/auth/auth.api';

export default function ProfileBadge({ me }) {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      const res = await logout({}).unwrap();
      toast.success(res.message);
      navigate("/auth/login");
    } catch (err) {
      toast.error("Logout failed.")
      console.log(err);

    }
  };


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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem >
              <Link to={"/driver/profile"}><Settings className="mr-2 h-4 w-4" />
                Profile Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLogout()} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
