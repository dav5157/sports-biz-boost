import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award, TrendingUp, Star, Clock, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, LineChart, Line } from "recharts";

interface EmployeeInsightsProps {
  data: {
    totalEmployees: number;
    averageRating: number;
    totalCompensation: number;
    employees: Array<{
      id: string;
      name: string;
      role: string;
      hoursWorked: number;
      revenue: number;
      appointments: number;
      rating: number;
      retention: number;
      compensation: number;
      efficiency: number;
    }>;
    performanceByRole: Array<{
      role: string;
      avgRevenue: number;
      avgRating: number;
      count: number;
    }>;
    monthlyPerformance: Array<{
      month: string;
      totalRevenue: number;
      avgSatisfaction: number;
      hoursWorked: number;
    }>;
    retentionMetrics: {
      overall: number;
      byRole: Array<{ role: string; retention: number }>;
    };
  };
}

export default function EmployeeInsights({ data }: EmployeeInsightsProps) {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  const topPerformers = data.employees
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const performanceVsCompensation = data.employees.map(emp => ({
    name: emp.name,
    performance: emp.revenue,
    compensation: emp.compensation,
    efficiency: emp.efficiency
  }));

  return (
    <div className="space-y-6">
      {/* Key Employee Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{data.totalEmployees}</div>
            <div className="text-xs text-muted-foreground">
              Active employees
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{data.averageRating.toFixed(1)}/5</div>
            <div className="text-xs text-muted-foreground">
              Client satisfaction score
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Compensation</CardTitle>
            <DollarSign className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{formatCurrency(data.totalCompensation)}</div>
            <div className="text-xs text-muted-foreground">
              Monthly payroll
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{formatPercentage(data.retentionMetrics.overall)}</div>
            <div className="text-xs text-muted-foreground">
              Employee retention
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((emp, index) => (
              <div key={emp.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/20 to-card rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{emp.name}</h4>
                    <p className="text-sm text-muted-foreground">{emp.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-success">{formatCurrency(emp.revenue)}</div>
                  <div className="text-xs text-muted-foreground">
                    {emp.appointments} appointments • {emp.rating.toFixed(1)}★
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance by Role */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Performance by Role
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.performanceByRole}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="role" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="avgRevenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance vs Compensation Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance vs Compensation Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={performanceVsCompensation}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                type="number" 
                dataKey="compensation" 
                name="Compensation" 
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                type="number" 
                dataKey="performance" 
                name="Revenue Generated" 
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => [
                  name === 'performance' ? formatCurrency(value as number) : formatCurrency(value as number),
                  name === 'performance' ? 'Revenue' : 'Compensation'
                ]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Scatter dataKey="performance" fill="hsl(var(--primary))" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Monthly Performance Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="totalRevenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                name="Total Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="avgSatisfaction" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="Avg Satisfaction"
              />
              <Line 
                type="monotone" 
                dataKey="hoursWorked" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Hours Worked"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Retention by Role */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Employee Retention by Role
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.retentionMetrics.byRole.map((role) => (
              <div key={role.role} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{role.role}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-success" 
                      style={{ width: `${role.retention}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold w-12">{formatPercentage(role.retention)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}