import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, TrendingUp, Clock, AlertTriangle, Target, Activity } from "lucide-react";
import { useState } from "react";

// Mock data for the dashboard
const mockData = {
  dailyRevenue: { value: 4250, change: 12, target: 4000 },
  ebita: { value: 1870, change: 8, target: 1500 },
  profitMargin: 44,
  cashCollected: { value: 3900, rate: 92 },
  roomUtilization: { overall: 78, rooms: [{ id: 1, rate: 92 }, { id: 2, rate: 71 }, { id: 3, rate: 71 }] },
  patientsSeen: { total: 28, walkIns: 6, preBooked: 22 },
  avgSessionValue: { value: 152, change: 12 },
  noShowRate: 7,
  topPerformer: { name: "Sarah Chen", satisfaction: 97, revenue: 2100 },
  alerts: [
    { type: "warning", message: "Room 3 idle 2.5 hrs (10:30-1:00) - scheduling gap" },
    { type: "suggestion", message: "Tomorrow 10-12 slot underbooked. Send SMS blast to 'Sports Injury' segment offering 15% off - projected +$600 revenue" }
  ]
};

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Hong Kong Sports Clinic ERP
              </h1>
              <p className="text-muted-foreground mt-1">Daily Executive Summary - {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border rounded-lg bg-card"
              />
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Reports
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Financial Pulse Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-primary" />
            Financial Pulse
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20 shadow-medium">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">${mockData.dailyRevenue.value.toLocaleString()}</div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-success mr-1" />
                  <span className="text-success font-medium">↑{mockData.dailyRevenue.change}%</span>
                  <span className="text-muted-foreground text-sm ml-1">vs Yesterday</span>
                </div>
                <Badge variant="outline" className="mt-2 text-success border-success/30">
                  Target: ${mockData.dailyRevenue.target.toLocaleString()} ✓
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-secondary/5 border-secondary/20 shadow-medium">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">EBITA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">${mockData.ebita.value.toLocaleString()}</div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-success mr-1" />
                  <span className="text-success font-medium">↑{mockData.ebita.change}%</span>
                </div>
                <Badge variant="outline" className="mt-2 text-success border-success/30">
                  Target: ${mockData.ebita.target.toLocaleString()} ✓
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-accent/5 border-accent/20 shadow-medium">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Profit Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">{mockData.profitMargin}%</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Industry Avg: 35%
                </div>
                <Badge variant="outline" className="mt-2 text-success border-success/30">
                  Above Average
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-muted shadow-medium">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cash Collected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${mockData.cashCollected.value.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  {mockData.cashCollected.rate}% collection rate
                </div>
                <Badge variant="outline" className="mt-2 text-success border-success/30">
                  Excellent
                </Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Operational Efficiency Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-secondary" />
            Operational Efficiency
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Room Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-4">{mockData.roomUtilization.overall}%</div>
                <div className="space-y-3">
                  {mockData.roomUtilization.rooms.map((room) => (
                    <div key={room.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium">Room {room.id}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div 
                            className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                            style={{ width: `${room.rate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{room.rate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-secondary" />
                  Patients Seen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-secondary mb-4">{mockData.patientsSeen.total}</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-semibold">{mockData.patientsSeen.walkIns}</div>
                    <div className="text-sm text-muted-foreground">Walk-ins</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-semibold">{mockData.patientsSeen.preBooked}</div>
                    <div className="text-sm text-muted-foreground">Pre-booked</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg Session Value</span>
                    <div className="flex items-center">
                      <span className="font-semibold">${mockData.avgSessionValue.value}</span>
                      <TrendingUp className="w-4 h-4 text-success ml-1" />
                      <span className="text-success text-sm">+${mockData.avgSessionValue.change}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Performance & Alerts */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-warning" />
            Performance & Alerts
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-medium border-success/20">
              <CardHeader>
                <CardTitle className="text-success">⭐ Top Performer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{mockData.topPerformer.name}</span>
                    <Badge className="bg-success text-success-foreground">
                      {mockData.topPerformer.satisfaction}% satisfaction
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-success">
                    ${mockData.topPerformer.revenue.toLocaleString()} revenue generated
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Outstanding performance this period
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-warning/20">
              <CardHeader>
                <CardTitle className="text-warning flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Attention Needed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <div className="text-sm font-medium">No-Show Rate: {mockData.noShowRate}%</div>
                    <div className="text-xs text-muted-foreground">Target: &lt;5%</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {mockData.alerts[0].message}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AI Suggestion */}
        <section>
          <Card className="shadow-strong bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <TrendingUp className="w-6 h-6 mr-2" />
                💡 AI-Suggested Action
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-card/80 p-4 rounded-lg border">
                <p className="text-foreground mb-4">
                  "{mockData.alerts[1].message}"
                </p>
                <div className="flex gap-3">
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary">
                    Send SMS Campaign
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;