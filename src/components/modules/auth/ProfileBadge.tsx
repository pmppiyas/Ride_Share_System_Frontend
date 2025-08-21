import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  LogOut,
  ChevronDown, Settings, Bell
} from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { useNavigate } from "react-router"

export default function ProfileBadge() {
  const navigate = useNavigate()
  return (
    <div className="p-4 border-b bg-muted/30">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10 border-2 border-primary/20">
          <AvatarImage src="/api/placeholder/40/40" alt="Admin" />
          <AvatarFallback className="bg-primary/10">AD</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">Admin User</p>
          <p className="text-xs text-muted-foreground truncate">admin@ridemanager.com</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <Settings className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
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
    </div>
  )
}
