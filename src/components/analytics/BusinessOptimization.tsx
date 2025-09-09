import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, AlertTriangle, Lightbulb, Zap, BarChart3 } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, FunnelChart, Funnel, LabelList } from "recharts";

interface BusinessOptimizationProps {
  data: {
    kpis: {
      clientRetention: number;
      appointmentUtilization: number;
      revenuePerClient: number;
      profitMargin: number;
      employeeEfficiency: number;
      marketGrowth: number;
    };
    opportunities: Array<{
      category: string;
      description: string;
      impact: 'high' | 'medium' | 'low';
      effort: 'high' | 'medium' | 'low';
      potentialRevenue: number;
      priority: number;
    }>;
    riskFactors: Array<{
      factor: string;
      severity: 'high' | 'medium' | 'low';
      probability: number;
      impact: string;
      mitigation: string;
    }>;
    competitiveAnalysis: {
      marketPosition: number;
      strengths: string[];
      weaknesses: string[];
      threats: string[];
      opportunities: string[];
    };
    conversionFunnel: Array<{
      name: string;
      value: number;
      fill: string;
    }>;
    actionItems: Array<{
      title: string;
      deadline: string;
      priority: 'high' | 'medium' | 'low';
      owner: string;
      estimatedImpact: number;
    }>;
  };
}

export default function BusinessOptimization({ data }: BusinessOptimizationProps) {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  const radarData = [
    { subject: 'Client Retention', value: data.kpis.clientRetention, fullMark: 100 },
    { subject: 'Utilization', value: data.kpis.appointmentUtilization, fullMark: 100 },
    { subject: 'Revenue/Client', value: (data.kpis.revenuePerClient / 500) * 100, fullMark: 100 },
    { subject: 'Profit Margin', value: data.kpis.profitMargin, fullMark: 100 },
    { subject: 'Employee Efficiency', value: data.kpis.employeeEfficiency, fullMark: 100 },
    { subject: 'Market Growth', value: data.kpis.marketGrowth, fullMark: 100 },
  ];

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'hsl(var(--destructive))';
      case 'medium': return 'hsl(var(--warning))';
      case 'low': return 'hsl(var(--success))';
      default: return 'hsl(var(--muted))';
    }
  };

  const getImpactIcon = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high': return <Zap className="h-4 w-4 text-destructive" />;
      case 'medium': return <TrendingUp className="h-4 w-4 text-warning" />;
      case 'low': return <Target className="h-4 w-4 text-success" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Business Performance Radar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Key Insights</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="font-medium">Strongest Areas</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Client retention ({formatPercentage(data.kpis.clientRetention)}) and profit margins are performing well
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-warning/10 to-warning/5 rounded-lg border border-warning/20">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="font-medium">Areas for Improvement</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Focus on increasing appointment utilization and market growth initiatives
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Client Conversion Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
              <Funnel
                dataKey="value"
                data={data.conversionFunnel}
                isAnimationActive
              >
                <LabelList position="center" fill="#fff" stroke="none" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Optimization Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Optimization Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.opportunities
              .sort((a, b) => b.priority - a.priority)
              .map((opportunity, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-card to-muted/10">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getImpactIcon(opportunity.impact)}
                      <h4 className="font-semibold">{opportunity.category}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span 
                        className="text-xs px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: `${getPriorityColor(opportunity.impact)}20`,
                          color: getPriorityColor(opportunity.impact)
                        }}
                      >
                        {opportunity.impact} impact
                      </span>
                      <span className="text-sm font-bold text-success">
                        {formatCurrency(opportunity.potentialRevenue)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
                  <div className="flex justify-between text-xs">
                    <span>Effort: {opportunity.effort}</span>
                    <span>Priority Score: {opportunity.priority}/10</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Assessment & Mitigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.riskFactors.map((risk, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-destructive/5 to-card">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-destructive">{risk.factor}</h4>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: `${getPriorityColor(risk.severity)}20`,
                        color: getPriorityColor(risk.severity)
                      }}
                    >
                      {risk.severity} severity
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatPercentage(risk.probability)} probability
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{risk.impact}</p>
                <div className="p-2 bg-success/10 rounded border border-success/20">
                  <p className="text-xs text-success-foreground">
                    <strong>Mitigation:</strong> {risk.mitigation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Priority Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.actionItems
              .sort((a, b) => {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
              })
              .map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-muted/20 to-card">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getPriorityColor(action.priority) }}
                    />
                    <div>
                      <h4 className="font-medium">{action.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        Due: {action.deadline} • Owner: {action.owner}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-success">
                      +{formatCurrency(action.estimatedImpact)}
                    </div>
                    <div className="text-xs text-muted-foreground">estimated impact</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* SWOT Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            SWOT Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-lg border border-success/20">
              <h4 className="font-semibold text-success mb-2">Strengths</h4>
              <ul className="text-sm space-y-1">
                {data.competitiveAnalysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-success rounded-full" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-lg border border-destructive/20">
              <h4 className="font-semibold text-destructive mb-2">Weaknesses</h4>
              <ul className="text-sm space-y-1">
                {data.competitiveAnalysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-destructive rounded-full" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">Opportunities</h4>
              <ul className="text-sm space-y-1">
                {data.competitiveAnalysis.opportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    {opportunity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-gradient-to-br from-warning/10 to-warning/5 rounded-lg border border-warning/20">
              <h4 className="font-semibold text-warning mb-2">Threats</h4>
              <ul className="text-sm space-y-1">
                {data.competitiveAnalysis.threats.map((threat, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-warning rounded-full" />
                    {threat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}