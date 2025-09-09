import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Clock, Users, Activity, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from "recharts";

interface RoomUtilizationProps {
  data: {
    overallUtilization: number;
    rooms: Array<{
      id: string;
      name: string;
      utilization: number;
      hoursUsed: number;
      totalHours: number;
      revenue: number;
      appointmentsCount: number;
    }>;
    hourlyUtilization: Array<{
      hour: string;
      utilization: number;
      appointments: number;
    }>;
    weeklyTrends: Array<{
      day: string;
      utilization: number;
      efficiency: number;
    }>;
    predictions: {
      nextWeekUtilization: number;
      optimizationSuggestions: Array<{
        room: string;
        suggestion: string;
        potentialIncrease: number;
      }>;
    };
  };
}

export default function RoomUtilization({ data }: RoomUtilizationProps) {
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return 'hsl(var(--success))';
    if (utilization >= 60) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const radialData = data.rooms.map(room => ({
    name: room.name,
    utilization: room.utilization,
    fill: getUtilizationColor(room.utilization)
  }));

  return (
    <div className="space-y-6">
      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Utilization</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatPercentage(data.overallUtilization)}</div>
            <div className="text-xs text-muted-foreground">
              Target: 75-85%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rooms</CardTitle>
            <Home className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{data.rooms.length}</div>
            <div className="text-xs text-muted-foreground">
              {data.rooms.filter(r => r.utilization > 50).length} highly utilized
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {data.hourlyUtilization.reduce((max, curr) => curr.utilization > max.utilization ? curr : max).hour}
            </div>
            <div className="text-xs text-muted-foreground">
              Highest utilization period
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {formatCurrency(data.rooms.reduce((sum, room) => sum + room.revenue, 0))}
            </div>
            <div className="text-xs text-muted-foreground">
              From room utilization
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Room Utilization Radial Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Room Utilization Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={radialData}>
                <RadialBar
                  label={{ position: 'insideStart', fill: 'white' }}
                  background
                  dataKey="utilization"
                />
                <Legend iconSize={10} />
                <Tooltip 
                  formatter={(value: number) => [formatPercentage(value), 'Utilization']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              {data.rooms.map((room) => (
                <div key={room.id} className="p-4 border rounded-lg bg-gradient-to-r from-card to-muted/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{room.name}</h4>
                    <span 
                      className="text-sm font-bold px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: `${getUtilizationColor(room.utilization)}20`,
                        color: getUtilizationColor(room.utilization)
                      }}
                    >
                      {formatPercentage(room.utilization)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>Hours Used: {room.hoursUsed}/{room.totalHours}</div>
                    <div>Revenue: {formatCurrency(room.revenue)}</div>
                    <div>Appointments: {room.appointmentsCount}</div>
                    <div>Efficiency: {formatPercentage((room.revenue / room.totalHours) / 100)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Utilization Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Hourly Utilization Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.hourlyUtilization}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="utilization" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Trends & Efficiency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="utilization" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="efficiency" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Optimization Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            AI-Powered Optimization Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">Next Week Prediction</h4>
              <p className="text-sm text-muted-foreground">
                Expected utilization: <span className="font-bold text-primary">{formatPercentage(data.predictions.nextWeekUtilization)}</span>
              </p>
            </div>
            {data.predictions.optimizationSuggestions.map((suggestion, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg border border-accent/20">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-accent">{suggestion.room}</h4>
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                    +{formatPercentage(suggestion.potentialIncrease)} potential
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{suggestion.suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}