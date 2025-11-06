/* eslint-disable @typescript-eslint/no-explicit-any */
import RideCard from '@/components/modules/dashboard/admin/RideCard';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useMetadataQuery } from '@/redux/features/auth/auth.api';
import {
  Activity,
  Clock,
  DollarSign,
  Navigation,
  Star,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import LoadingSpinner from './../../../../../public/loading';

export default function DashboardHome() {
  const navigate = useNavigate();
  const { data: metadata, isLoading, isError } = useMetadataQuery(undefined);
  const { data: admin } = useMetadataQuery(undefined);

  if (isLoading) return <LoadingSpinner />
  if (isError) return <div className="p-6 text-red-500">Failed to load dashboard.</div>;


  const rides = metadata?.data || [];
  const summary = metadata?.summary || {};
  const totalRevenue = summary.totalRevenue || 0;
  const statusCounts = summary.statusCounts || {};
  const activeRides = statusCounts['in_transit'] || 0;
  const totalDrivers = admin?.meta?.totalDriver || 0;

  const rideStatusData = Object.entries(statusCounts).map(([status, value]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value,
    color:
      status === 'completed'
        ? '#10b981'
        : status === 'in_transit'
          ? '#f59e0b'
          : status === 'canceled'
            ? '#ef4444'
            : '#8b5cf6',
  }));


  const weeklyRevenue = summary.weeklyStats
    ? Object.entries(summary.weeklyStats).map(([day, count]) => ({
      name: day,
      revenue: count * 500,
    }))
    : [
      { name: 'Mon', revenue: 0 },
      { name: 'Tue', revenue: 0 },
      { name: 'Wed', revenue: 0 },
      { name: 'Thu', revenue: 0 },
      { name: 'Fri', revenue: 0 },
      { name: 'Sat', revenue: 0 },
      { name: 'Sun', revenue: 0 },
    ];

  return (
    <div className="p-6 space-y-6">
      {/* 📊 Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card className="relative overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">৳{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">↗ +20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        {/* Active Rides */}
        <Card className="relative overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Rides</CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <Navigation className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeRides}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-blue-600 font-medium">↗ +15.3%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        {/* Online Drivers */}
        <Card className="relative overflow-hidden border-l-4 border-l-purple-500">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Online Drivers</CardTitle>
            <div className="p-2 bg-purple-100 rounded-full">
              <UserCheck className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalDrivers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-purple-600 font-medium">↗ +12.5%</span> from last hour
            </p>
          </CardContent>
        </Card>

        {/* Avg Rating */}
        <Card className="relative overflow-hidden border-l-4 border-l-yellow-500">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <div className="p-2 bg-yellow-100 rounded-full">
              <Star className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">4.8</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-yellow-600 font-medium">↗ +0.2</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 📈 Charts Section */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Revenue Analytics
            </CardTitle>
            <CardDescription>Daily revenue trends over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyRevenue}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#revenueGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ride Status Pie Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Ride Status
            </CardTitle>
            <CardDescription>Current distribution of all rides</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={rideStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {rideStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 🕒 Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest ride requests and completions</CardDescription>
            </div>
            <Button onClick={() => navigate('/admin/rides')} variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rides.length ? (
              rides.map((ride: any) => <RideCard key={ride._id} ride={ride} />)
            ) : (
              <p className="text-sm text-muted-foreground">No rides found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
