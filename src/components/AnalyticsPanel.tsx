import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Users, Activity, BarChart3, Target } from "lucide-react";
import FinancialMetrics from "./analytics/FinancialMetrics";
import RoomUtilization from "./analytics/RoomUtilization";
import EmployeeInsights from "./analytics/EmployeeInsights";
import BusinessOptimization from "./analytics/BusinessOptimization";

// Mock data generator for comprehensive analytics
const generateMockData = (baseData: any) => {
  return {
    financial: {
      revenue: baseData.revenue || 125000,
      profit: baseData.profit || 32500,
      expenses: 92500,
      profitMargin: ((baseData.profit || 32500) / (baseData.revenue || 125000)) * 100,
      ebitda: (baseData.profit || 32500) + 15000, // Adding depreciation back
      cashFlow: [
        { month: 'Jan', inflow: 120000, outflow: 90000, net: 30000 },
        { month: 'Feb', inflow: 130000, outflow: 95000, net: 35000 },
        { month: 'Mar', inflow: 125000, outflow: 92500, net: 32500 },
        { month: 'Apr', inflow: 135000, outflow: 98000, net: 37000 },
        { month: 'May', inflow: 140000, outflow: 100000, net: 40000 },
        { month: 'Jun', inflow: 145000, outflow: 102000, net: 43000 }
      ],
      revenueByService: [
        { name: 'Physiotherapy', value: 45000, color: '#0088FE' },
        { name: 'Sports Medicine', value: 38000, color: '#00C49F' },
        { name: 'Rehabilitation', value: 25000, color: '#FFBB28' },
        { name: 'Consultations', value: 17000, color: '#FF8042' }
      ],
      monthlyTrends: [
        { month: 'Jan', revenue: 120000, profit: 30000, expenses: 90000 },
        { month: 'Feb', revenue: 130000, profit: 35000, expenses: 95000 },
        { month: 'Mar', revenue: 125000, profit: 32500, expenses: 92500 },
        { month: 'Apr', revenue: 135000, profit: 37000, expenses: 98000 },
        { month: 'May', revenue: 140000, profit: 40000, expenses: 100000 },
        { month: 'Jun', revenue: 145000, profit: 43000, expenses: 102000 }
      ]
    },
    roomUtilization: {
      overallUtilization: baseData.utilization || 78.5,
      rooms: [
        { id: '1', name: 'Therapy Room A', utilization: 85, hoursUsed: 34, totalHours: 40, revenue: 12500, appointmentsCount: 45 },
        { id: '2', name: 'Therapy Room B', utilization: 72, hoursUsed: 29, totalHours: 40, revenue: 9800, appointmentsCount: 38 },
        { id: '3', name: 'Consultation Room', utilization: 90, hoursUsed: 36, totalHours: 40, revenue: 15200, appointmentsCount: 52 },
        { id: '4', name: 'Exercise Room', utilization: 65, hoursUsed: 26, totalHours: 40, revenue: 7500, appointmentsCount: 28 }
      ],
      hourlyUtilization: [
        { hour: '8AM', utilization: 45, appointments: 3 },
        { hour: '9AM', utilization: 78, appointments: 5 },
        { hour: '10AM', utilization: 85, appointments: 6 },
        { hour: '11AM', utilization: 92, appointments: 7 },
        { hour: '12PM', utilization: 88, appointments: 6 },
        { hour: '1PM', utilization: 95, appointments: 8 },
        { hour: '2PM', utilization: 90, appointments: 7 },
        { hour: '3PM', utilization: 85, appointments: 6 },
        { hour: '4PM', utilization: 75, appointments: 5 },
        { hour: '5PM', utilization: 60, appointments: 4 },
        { hour: '6PM', utilization: 40, appointments: 2 }
      ],
      weeklyTrends: [
        { day: 'Mon', utilization: 82, efficiency: 75 },
        { day: 'Tue', utilization: 85, efficiency: 78 },
        { day: 'Wed', utilization: 90, efficiency: 82 },
        { day: 'Thu', utilization: 88, efficiency: 80 },
        { day: 'Fri', utilization: 85, efficiency: 77 },
        { day: 'Sat', utilization: 65, efficiency: 68 }
      ],
      predictions: {
        nextWeekUtilization: 83.2,
        optimizationSuggestions: [
          { room: 'Exercise Room', suggestion: 'Consider adding group therapy sessions during low-utilization hours', potentialIncrease: 15 },
          { room: 'Therapy Room B', suggestion: 'Optimize appointment scheduling for better time slot distribution', potentialIncrease: 12 }
        ]
      }
    },
    employees: {
      totalEmployees: 12,
      averageRating: 4.3,
      totalCompensation: 85000,
      employees: [
        { id: '1', name: 'Dr. Sarah Chen', role: 'Senior Physiotherapist', hoursWorked: 38, revenue: 18500, appointments: 42, rating: 4.8, retention: 95, compensation: 8500, efficiency: 487 },
        { id: '2', name: 'Mark Johnson', role: 'Sports Medicine Specialist', hoursWorked: 35, revenue: 16200, appointments: 38, rating: 4.6, retention: 92, compensation: 8000, efficiency: 463 },
        { id: '3', name: 'Lisa Rodriguez', role: 'Rehabilitation Therapist', hoursWorked: 40, revenue: 15800, appointments: 45, rating: 4.4, retention: 88, compensation: 7200, efficiency: 395 },
        { id: '4', name: 'Dr. Michael Park', role: 'Senior Consultant', hoursWorked: 32, revenue: 14500, appointments: 28, rating: 4.7, retention: 96, compensation: 9200, efficiency: 453 },
        { id: '5', name: 'Jennifer Kim', role: 'Physiotherapist', hoursWorked: 36, revenue: 13200, appointments: 35, rating: 4.2, retention: 85, compensation: 6800, efficiency: 367 }
      ],
      performanceByRole: [
        { role: 'Senior Physiotherapist', avgRevenue: 17000, avgRating: 4.7, count: 3 },
        { role: 'Sports Medicine Specialist', avgRevenue: 15500, avgRating: 4.5, count: 2 },
        { role: 'Rehabilitation Therapist', avgRevenue: 14200, avgRating: 4.3, count: 4 },
        { role: 'Consultant', avgRevenue: 16800, avgRating: 4.6, count: 3 }
      ],
      monthlyPerformance: [
        { month: 'Jan', totalRevenue: 72000, avgSatisfaction: 4.2, hoursWorked: 420 },
        { month: 'Feb', totalRevenue: 78000, avgSatisfaction: 4.3, hoursWorked: 435 },
        { month: 'Mar', totalRevenue: 82000, avgSatisfaction: 4.4, hoursWorked: 440 },
        { month: 'Apr', totalRevenue: 85000, avgSatisfaction: 4.3, hoursWorked: 445 },
        { month: 'May', totalRevenue: 88000, avgSatisfaction: 4.4, hoursWorked: 450 },
        { month: 'Jun', totalRevenue: 92000, avgSatisfaction: 4.5, hoursWorked: 455 }
      ],
      retentionMetrics: {
        overall: 89.5,
        byRole: [
          { role: 'Senior Physiotherapist', retention: 95 },
          { role: 'Sports Medicine Specialist', retention: 92 },
          { role: 'Rehabilitation Therapist', retention: 86 },
          { role: 'Consultant', retention: 94 },
          { role: 'Support Staff', retention: 82 }
        ]
      }
    },
    optimization: {
      kpis: {
        clientRetention: baseData.retention || 87.5,
        appointmentUtilization: baseData.utilization || 78.5,
        revenuePerClient: 850,
        profitMargin: 26.0,
        employeeEfficiency: 82.3,
        marketGrowth: 15.2
      },
      opportunities: [
        { category: 'Service Expansion', description: 'Add specialized sports injury prevention programs', impact: 'high' as const, effort: 'medium' as const, potentialRevenue: 25000, priority: 9 },
        { category: 'Technology Integration', description: 'Implement AI-powered treatment planning system', impact: 'medium' as const, effort: 'high' as const, potentialRevenue: 18000, priority: 7 },
        { category: 'Marketing Optimization', description: 'Enhance digital marketing for corporate wellness programs', impact: 'high' as const, effort: 'low' as const, potentialRevenue: 32000, priority: 8 },
        { category: 'Operational Efficiency', description: 'Optimize appointment scheduling algorithms', impact: 'medium' as const, effort: 'medium' as const, potentialRevenue: 15000, priority: 6 }
      ],
      riskFactors: [
        { factor: 'Staff Turnover', severity: 'medium' as const, probability: 25, impact: 'Potential loss of experienced staff could affect service quality', mitigation: 'Implement retention bonuses and career development programs' },
        { factor: 'Market Competition', severity: 'high' as const, probability: 35, impact: 'New competitors entering the market could reduce market share', mitigation: 'Focus on service differentiation and client relationship management' },
        { factor: 'Economic Downturn', severity: 'medium' as const, probability: 20, impact: 'Reduced discretionary spending on healthcare services', mitigation: 'Diversify service offerings and insurance partnerships' }
      ],
      competitiveAnalysis: {
        marketPosition: 78,
        strengths: ['Experienced medical team', 'Modern equipment', 'High client satisfaction', 'Strategic location'],
        weaknesses: ['Limited digital presence', 'Higher pricing than competitors', 'Capacity constraints during peak hours'],
        opportunities: ['Corporate wellness contracts', 'Telehealth services', 'Sports team partnerships', 'Insurance network expansion'],
        threats: ['New clinic openings nearby', 'Economic uncertainty', 'Healthcare regulation changes', 'Technology disruption']
      },
      conversionFunnel: [
        { name: 'Inquiries', value: 1000, fill: 'hsl(var(--primary))' },
        { name: 'Consultations', value: 650, fill: 'hsl(var(--secondary))' },
        { name: 'First Appointment', value: 520, fill: 'hsl(var(--accent))' },
        { name: 'Treatment Plan', value: 450, fill: 'hsl(var(--success))' },
        { name: 'Completed Treatment', value: 380, fill: 'hsl(var(--warning))' }
      ],
      actionItems: [
        { title: 'Launch digital marketing campaign', deadline: '2024-02-15', priority: 'high' as const, owner: 'Marketing Team', estimatedImpact: 32000 },
        { title: 'Implement new scheduling system', deadline: '2024-03-01', priority: 'medium' as const, owner: 'Operations', estimatedImpact: 15000 },
        { title: 'Develop corporate wellness packages', deadline: '2024-02-28', priority: 'high' as const, owner: 'Business Development', estimatedImpact: 45000 },
        { title: 'Staff retention program rollout', deadline: '2024-03-15', priority: 'medium' as const, owner: 'HR', estimatedImpact: 8000 }
      ]
    }
  };
};

export default function AnalyticsPanel({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!data) return null;
  
  const mockData = generateMockData(data);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${(data.revenue || 125000).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">+12.5% from last month</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Room Utilization</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{(data.utilization || 78.5).toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Target: 75-85%</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{data.uniqueClients || 147}</div>
            <div className="text-xs text-muted-foreground">{(data.retention || 87.5).toFixed(1)}% retention rate</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {data.profit && data.revenue ? Math.round((data.profit / data.revenue) * 100) : 26}%
            </div>
            <div className="text-xs text-muted-foreground">Industry avg: 15-25%</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card/80 backdrop-blur-sm shadow-soft">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="rooms" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Room Analytics
          </TabsTrigger>
          <TabsTrigger value="employees" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Staff Insights
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <FinancialMetrics data={mockData.financial} />
        </TabsContent>

        <TabsContent value="rooms" className="space-y-6">
          <RoomUtilization data={mockData.roomUtilization} />
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <EmployeeInsights data={mockData.employees} />
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <BusinessOptimization data={mockData.optimization} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
