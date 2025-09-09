import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, MapPin, Plus, Search, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const SmartScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState("physio");
  const [scheduleData, setScheduleData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${API_URL}/api/scheduler?date=${selectedDate}&type=${selectedAppointmentType}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch schedule data");
        return res.json();
      })
      .then(setScheduleData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [selectedDate, selectedAppointmentType]);

  const handleExport = () => {
    if (!scheduleData) return;
    const ws = XLSX.utils.json_to_sheet(scheduleData.appointments || []);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Schedule");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buf], { type: "application/octet-stream" });
    saveAs(blob, `schedule_${selectedDate}.xlsx`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "success";
      case "pending": return "warning";
      case "available": return "secondary";
      default: return "muted";
    }
  };

  const getTherapistTypeColor = (type: string) => {
    return type === "Partner" ? "primary" : "secondary";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Smart Scheduler
          </h1>
          <p className="text-muted-foreground mt-1">AI-powered booking optimization for 40-min sessions in 1-hour slots</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-card"
          />
          <select
            value={selectedAppointmentType}
            onChange={(e) => setSelectedAppointmentType(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-card"
          >
            <option value="physio">Physio</option>
            <option value="massage">Massage</option>
            <option value="gym">Gym</option>
          </select>
          <Button className="bg-gradient-to-r from-primary to-secondary">
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
          <Button variant="outline" onClick={handleExport} disabled={!scheduleData}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      {loading && <div className="text-center text-lg">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!loading && !error && scheduleData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Bookings</p>
                  <p className="text-2xl font-bold text-primary">{scheduleData.stats?.bookings ?? '-'}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-card to-secondary/5 border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Slots</p>
                  <p className="text-2xl font-bold text-secondary">{scheduleData.stats?.availableSlots ?? '-'}</p>
                </div>
                <Clock className="w-8 h-8 text-secondary/60" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-card to-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Therapists</p>
                  <p className="text-2xl font-bold text-accent">{scheduleData.stats?.activeTherapists ?? '-'}</p>
                </div>
                <User className="w-8 h-8 text-accent/60" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-card to-success/5 border-success/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Utilization</p>
                  <p className="text-2xl font-bold text-success">{scheduleData.stats?.utilization ?? '-'}%</p>
                </div>
                <MapPin className="w-8 h-8 text-success/60" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Suggestions */}
      {scheduleData && scheduleData.suggestions && (
        <Card className="shadow-strong bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <Search className="w-5 h-5 mr-2" />
              🤖 AI Scheduling Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scheduleData.suggestions.map((suggestion: any, index: number) => (
                <div key={index} className="bg-card p-4 rounded-lg border border-border/50 shadow-soft">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{suggestion.time}</span>
                    <Badge variant="outline" className="text-primary border-primary/30">
                      {suggestion.confidence}% match
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{suggestion.therapist}</p>
                  <p className="text-xs text-muted-foreground mt-1">{suggestion.reason}</p>
                  <Button size="sm" className="mt-3 w-full bg-gradient-to-r from-primary to-secondary">
                    Book This Slot
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}


      {/* Schedule Grid */}
      {scheduleData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Therapist Availability */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-secondary" />
                Therapist Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduleData.therapists?.map((therapist: any) => (
                  <div key={therapist.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${therapist.available ? 'bg-success' : 'bg-warning'}`} />
                      <div>
                        <p className="font-medium">{therapist.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${getTherapistTypeColor(therapist.type) === 'primary' ? 'border-primary/30 text-primary' : 'border-secondary/30 text-secondary'}`}
                          >
                            {therapist.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Next Available</p>
                      <p className="text-xs text-muted-foreground">{therapist.nextAvailable}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Today's Schedule */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduleData.appointments?.map((appointment: any) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium w-16">{appointment.time}</div>
                      <div>
                        <p className="font-medium text-sm">
                          {appointment.status === 'available' ? 'Available Slot' : appointment.patient}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">{appointment.therapist}</p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">Room {appointment.room}</p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">{appointment.duration}min</p>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs border-${getStatusColor(appointment.status)}/30 text-${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Room Status */}
      {scheduleData && scheduleData.rooms && (
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-accent" />
              Room Status & Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scheduleData.rooms.map((room: any) => (
                <div key={room.id} className="text-center p-6 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{room.name}</h3>
                  <Badge className="bg-success text-success-foreground">{room.status}</Badge>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Utilization</span>
                      <span className="font-medium">{room.utilization ?? '-'}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div
                        className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                        style={{ width: `${room.utilization ?? 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartScheduler;