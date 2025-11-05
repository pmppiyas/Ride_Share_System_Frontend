
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMyRideHistoryQuery } from "@/redux/features/rider/rider.api";
import { Activity, DollarSign, Navigation, Star, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function RHome() {
  const { data, isLoading, isError } = useGetMyRideHistoryQuery(undefined);

  if (isLoading) return <h1 className="p-6">Loading...</h1>;
  if (isError) return <h1 className="p-6 text-red-500">Failed to load data.</h1>;
  console.log(data)
  const totalRides = data?.meta?.total || 0;
  const summary = data?.summary || {};

  const totalSpend = summary.totalSpend || 0;
  const statusCounts = summary.statusCounts || {};
  const weeklyStats = summary.weeklyStats || {};

  const stats = [
    { title: "Successful Rides", value: statusCounts.completed || 0, icon: Navigation, color: "text-blue-600" },
    { title: "Total Spend", value: `৳${totalSpend}`, icon: DollarSign, color: "text-green-600" },
    { title: "Cancelled Rides", value: statusCounts.cancelled || 0, icon: Activity, color: "text-red-600" },
    { title: "Total Rides", value: totalRides, icon: Star, color: "text-yellow-600" },
  ];

  const rideStatusData = Object.entries(statusCounts).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    color:
      key === "completed"
        ? "#10b981"
        : key === "in-progress"
          ? "#f59e0b"
          : key === "cancelled"
            ? "#ef4444"
            : "#8b5cf6",
  }));

  const chartData = Object.entries(weeklyStats).map(([day, count]) => ({
    name: day,
    rides: count,
  }));

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Card key={i} className="border-l-4 p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-1">
              <CardTitle className="text-sm">{s.title}</CardTitle>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart & Pie */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Ride Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="rides" stroke="#3b82f6" fill="#bfdbfe" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Ride Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={rideStatusData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                  {rideStatusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
