

import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import SmartScheduler from "@/components/SmartScheduler";
import { BarChart, Calendar, Users, TrendingUp, FileText, Settings, PlusCircle, UserCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { DailyReport, WeeklyReport } from "@/components/ReportCards";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Index = () => {
  const navigate = useNavigate();
  // Analytics state
  const [analyticsDate, setAnalyticsDate] = useState(new Date().toISOString().split('T')[0]);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");

  // Reports state
  const [reportType, setReportType] = useState("daily");
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportData, setReportData] = useState<any>(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState("");

  useEffect(() => {
    setAnalyticsLoading(true);
    setAnalyticsError("");
    fetch(`${API_URL}/api/analytics?date=${analyticsDate}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch analytics");
        return res.json();
      })
      .then(setAnalyticsData)
      .catch((e) => setAnalyticsError(e.message))
      .finally(() => setAnalyticsLoading(false));
  }, [analyticsDate]);

  useEffect(() => {
    setReportLoading(true);
    setReportError("");
    fetch(`${API_URL}/api/reports?type=${reportType}&date=${reportDate}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch report");
        return res.json();
      })
      .then(setReportData)
      .catch((e) => setReportError(e.message))
      .finally(() => setReportLoading(false));
  }, [reportType, reportDate]);

  const handleAnalyticsExport = () => {
    if (!analyticsData) return;
    const ws = XLSX.utils.json_to_sheet([analyticsData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Analytics");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buf], { type: "application/octet-stream" });
    saveAs(blob, `analytics_${analyticsDate}.xlsx`);
  };

  const handleReportExport = () => {
    if (!reportData) return;
    const ws = XLSX.utils.json_to_sheet(Array.isArray(reportData) ? reportData : [reportData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buf], { type: "application/octet-stream" });
    saveAs(blob, `report_${reportType}_${reportDate}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/5">
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="w-full">
  <TabsList className="grid w-full grid-cols-8 mb-8 bg-card/80 backdrop-blur-sm shadow-soft">
      <TabsTrigger value="employee-advice" className="flex items-center gap-2" onClick={() => navigate('/employee-advice')}>
        <UserCheck className="w-4 h-4" />
        Employee Advice
      </TabsTrigger>
          <TabsTrigger value="appointment" className="flex items-center gap-2" onClick={() => navigate('/appointment')}>
            <PlusCircle className="w-4 h-4" />
            New Appointment
          </TabsTrigger>
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
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <input type="date" value={analyticsDate} onChange={e => setAnalyticsDate(e.target.value)} className="px-3 py-2 border rounded-lg bg-card" />
              <button onClick={handleAnalyticsExport} className="px-4 py-2 rounded bg-primary text-white disabled:opacity-50" disabled={!analyticsData}>Export</button>
            </div>
            {analyticsLoading && <div className="text-center text-lg">Loading...</div>}
            {analyticsError && <div className="text-center text-red-500">{analyticsError}</div>}
            {!analyticsLoading && !analyticsError && analyticsData && (
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">{JSON.stringify(analyticsData, null, 2)}</pre>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <select value={reportType} onChange={e => setReportType(e.target.value)} className="px-3 py-2 border rounded-lg bg-card">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                {/* <option value="monthly">Monthly</option> */}
              </select>
              <input type="date" value={reportDate} onChange={e => setReportDate(e.target.value)} className="px-3 py-2 border rounded-lg bg-card" />
              <button onClick={handleReportExport} className="px-4 py-2 rounded bg-primary text-white disabled:opacity-50" disabled={!reportData}>Export</button>
            </div>
            {reportLoading && <div className="text-center text-lg">Loading...</div>}
            {reportError && <div className="text-center text-red-500">{reportError}</div>}
            {!reportLoading && !reportError && reportData && (
              <>
                {reportType === "daily" && <DailyReport data={reportData} />}
                {reportType === "weekly" && <WeeklyReport data={reportData} />}
              </>
            )}
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
