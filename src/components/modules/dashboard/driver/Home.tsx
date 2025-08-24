import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { TrendingUp, Clock, Activity, Car, CheckCircle, FileText } from "lucide-react";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useGetRideHistoryQuery } from '@/redux/features/driver/driver.api';

export default function DHome() {


  const { data, isLoading } = useGetRideHistoryQuery(undefined);

  if (isLoading) {
    return <h1>Loading</h1>
  }
  console.log(data);
  const stats = [
    { title: "Total Rides", value: `${data.meta + 100}`, icon: Car, color: "text-blue-500" },
    { title: "Completed Rides", value: 95, icon: CheckCircle, color: "text-green-500" },
    { title: "Pending Requests", value: 1, icon: Clock, color: "text-yellow-500" },
    { title: "Cancelled Rides", value: 9, icon: FileText, color: "text-red-500" },
  ];



  const rideStatusData = [
    { name: 'Completed', value: 324, color: '#10b981' },
    { name: 'In Progress', value: 42, color: '#f59e0b' },
    { name: 'Cancelled', value: 18, color: '#ef4444' },
    { name: 'Pending', value: 8, color: '#8b5cf6' }
  ];



  const revenueData = [
    { name: 'Mon', revenue: 4500, rides: 45 },
    { name: 'Tue', revenue: 5200, rides: 52 },
    { name: 'Wed', revenue: 4800, rides: 48 },
    { name: 'Thu', revenue: 6100, rides: 61 },
    { name: 'Fri', revenue: 7300, rides: 73 },
    { name: 'Sat', revenue: 8900, rides: 89 },
    { name: 'Sun', revenue: 6700, rides: 67 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
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

      {/* Recent Activity Section */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className='flex  gap-2'>  <Clock className="h-5 w-5 text-orange-600" />
            Recent Drive</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No recent rides yet. Start accepting ride requests!</p>
        </CardContent>
      </Card>


      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-7">
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
              <AreaChart data={revenueData}>
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
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

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

      {/* Recent Activity */}
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

          </div>
        </CardHeader>
        <CardContent>
          {/* <div className="space-y-4">
            {data.rides.map((ride: any) => (
              <RideCard key={ride._id} ride={ride} />
            ))}
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
