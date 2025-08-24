import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Navigation, UserCheck, Star, TrendingUp, Activity } from "lucide-react"
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';


export default function RHome() {

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
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <Card className="relative overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successfull Rides</CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <Navigation className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">42</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-blue-600 font-medium">↗ +15.3%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Drivers</CardTitle>
            <div className="p-2 bg-purple-100 rounded-full">
              <UserCheck className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">287</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-purple-600 font-medium">↗ +12.5%</span> from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">৳45,231</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">↗ +20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Ride Analytics
            </CardTitle>
            <CardDescription>Ride analytics over the past week</CardDescription>
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
    </div>
  )
}
