/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetRideHistoryQuery } from '@/redux/features/driver/driver.api';
import {
  Activity,
  Car,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
} from 'lucide-react';
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

export default function DHome() {
  const { data, isLoading, isError } = useGetRideHistoryQuery(undefined);
  console.log(data)

  if (isLoading) return <h1 className="p-6">Loading...</h1>;
  if (isError) return <h1 className="p-6 text-red-500">Failed to load data.</h1>;

  const rides = data?.data || [];
  const summary = data?.summary || {};
  const totalRides = data?.meta?.total || 0;
  const totalRevenue = summary.totalRevenue || 0;
  const statusCounts = summary.statusCounts || {};
  const weeklyRevenue = summary.weeklyRevenue || {};

  // ✅ Stats section
  const stats = [
    { title: "Total Rides", value: totalRides, icon: Car, color: "text-blue-500" },
    { title: "Completed Rides", value: statusCounts.completed || 0, icon: CheckCircle, color: "text-green-500" },
    { title: "In Progress", value: statusCounts['in-progress'] || 0, icon: Clock, color: "text-yellow-500" },
    { title: "Cancelled Rides", value: statusCounts.cancelled || 0, icon: FileText, color: "text-red-500" },
  ];

  // ✅ Ride status pie chart
  const rideStatusData = Object.entries(statusCounts).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    color:
      key === 'completed'
        ? '#10b981'
        : key === 'in-progress'
          ? '#f59e0b'
          : key === 'cancelled'
            ? '#ef4444'
            : '#8b5cf6',
  }));

  // ✅ Weekly revenue chart
  const revenueData = Object.entries(weeklyRevenue).map(([day, revenue]) => ({
    name: day,
    revenue,
  }));

  return (
    <div className="space-y-6 p-6">
      {/* 📊 Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="shadow-lg rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 💵 Revenue & Status Charts */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="lg:col-span-4 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Revenue Analytics
            </CardTitle>
            <CardDescription>Daily revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            {revenueData.length ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    fill="url(#revenueGradient)"
                    fillOpacity={1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center">No revenue data available.</p>
            )}
          </CardContent>
        </Card>

        {/* Ride Status Pie Chart */}
        <Card className="lg:col-span-3 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Ride Status
            </CardTitle>
            <CardDescription>Current ride distribution</CardDescription>
          </CardHeader>
          <CardContent>
            {rideStatusData.length ? (
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
            ) : (
              <p className="text-gray-500 text-center">No ride data yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 🕒 Recent Rides */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Recent Rides
          </CardTitle>
        </CardHeader>
        <CardContent>
          {rides.length ? (
            <div className="space-y-3">
              {rides.slice(0, 5).map((ride: any) => (
                <div key={ride._id} className="p-3 rounded-lg border hover:bg-gray-50 transition">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{ride.pickupLocation?.address} → {ride.destinationLocation?.address}</p>
                    <span className="text-sm text-gray-500">{ride.status}</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Fare: ৳{ride.fare} | {new Date(ride.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent rides yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
