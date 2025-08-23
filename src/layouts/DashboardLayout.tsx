import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from "react-router";
import {
  Bell,
  Search,
  Filter,
  Menu,
  UserPlus,
  AlertTriangle,
  Zap,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/pages/shared/Navbar';
import ProfileBadge from '@/components/modules/auth/ProfileBadge';
import { getNavItems } from '@/utils/getNavItems';
import { useAuth } from '@/hooks/useAuth';
import { getRolebasedLinks } from '@/utils/getRolebaseLinks';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const location = useLocation();
  const { me } = useAuth();


  const userRole = me?.data?.role;
  const navItems = getNavItems(userRole);


  const quickActions = [
    { label: 'Add New Driver', icon: UserPlus, color: 'bg-blue-500' },
    { label: 'Emergency Alert', icon: AlertTriangle, color: 'bg-red-500' },
    { label: 'System Health', icon: Zap, color: 'bg-green-500' },
    { label: 'Send Broadcast', icon: Globe, color: 'bg-purple-500' }
  ];
  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location]);

  const renderSidebarItem = (item: any) => {
    const route = getRolebasedLinks(userRole);
    const fullPath = item.path ? `${route}/${item.path}` : route;

    const isActive = activeSection === fullPath;

    return (
      <Link
        to={fullPath}
        key={item.id}
        onClick={() => setSidebarOpen(false)}
        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
          ? 'bg-primary text-primary-foreground shadow-md'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-4 w-4" />
          <span className="truncate">{item.label}</span>
        </div>
        {item.badge && (
          <Badge
            variant={isActive ? "secondary" : "outline"}
            className="text-xs px-2 py-0.5"
          >
            {item.badge}
          </Badge>
        )}
      </Link>
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-card border-r transform transition-transform duration-300 ease-in-out
            flex flex-col 
            lg:translate-x-0 lg:static lg:inset-0 
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* User Profile Section */}
          <ProfileBadge />

          {/* Navigation - Make this scrollable */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {navItems.map((section) => (
              <div key={section.section}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                  {section.section}
                </h3>
                <div className="space-y-1">
                  {section?.items?.map(renderSidebarItem)}
                </div>
              </div>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t bg-muted/30">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="flex flex-col gap-1 h-16 p-2"
                >
                  <div className={`p-1 rounded ${action.color}`}>
                    <action.icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="h-16 bg-card border-b flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold capitalize">
                  {activeSection === 'dashboard' ? 'Overview' : activeSection.replace('-', ' ')}
                </h2>
                <Badge variant="outline" className="text-xs">
                  Live
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64"
                />
              </div>

              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Today</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                  <SelectItem value="90d">3 Months</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
            <Outlet />
          </main>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default DashboardLayout;