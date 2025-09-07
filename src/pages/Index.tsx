import Dashboard from "@/components/Dashboard";
import SmartScheduler from "@/components/SmartScheduler";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Calendar, Users, Settings, FileText, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/5">
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-card/80 backdrop-blur-sm shadow-soft">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="scheduler" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Scheduler
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="scheduler" className="space-y-6">
            <SmartScheduler />
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Patient Management</h3>
              <p className="text-muted-foreground">Coming soon - Comprehensive patient records and history</p>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground">Coming soon - Predictive analytics and business intelligence</p>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Report Generation</h3>
              <p className="text-muted-foreground">Coming soon - Automated daily, weekly, and quarterly reports</p>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="text-center py-12">
              <Settings className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">System Settings</h3>
              <p className="text-muted-foreground">Coming soon - Configure system preferences and integrations</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
