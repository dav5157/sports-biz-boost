import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, MapPin, Plus, Search } from "lucide-react";
import { useState } from "react";

// Mock data for scheduling
const mockScheduleData = {
  rooms: [
    { id: 1, name: "Physio Room 1", status: "active" },
    { id: 2, name: "Physio Room 2", status: "active" },
    { id: 3, name: "Gym Area", status: "active" }
  ],
  therapists: [
    { id: 1, name: "Sarah Chen", type: "Partner", available: true, nextAvailable: "10:00 AM" },
    { id: 2, name: "Mike Torres", type: "Associate", available: true, nextAvailable: "11:00 AM" },
    { id: 3, name: "Amy Liu", type: "Associate", available: false, nextAvailable: "2:00 PM" },
    { id: 4, name: "James Park", type: "Partner", available: true, nextAvailable: "9:00 AM" }
  ],
  appointments: [
    { id: 1, time: "9:00 AM", patient: "John Doe", therapist: "Sarah Chen", room: 1, type: "Physio", duration: 45, status: "confirmed" },
    { id: 2, time: "10:00 AM", patient: "Jane Smith", therapist: "Mike Torres", room: 2, type: "Massage", duration: 60, status: "confirmed" },
    { id: 3, time: "11:00 AM", patient: "Available", therapist: "Amy Liu", room: 1, type: "slot", duration: 60, status: "available" },
    { id: 4, time: "12:00 PM", patient: "Bob Wilson", therapist: "James Park", room: 3, type: "Gym Session", duration: 30, status: "pending" },
    { id: 5, time: "1:00 PM", patient: "Available", therapist: "Sarah Chen", room: 2, type: "slot", duration: 60, status: "available" },
    { id: 6, time: "2:00 PM", patient: "Lisa Brown", therapist: "Mike Torres", room: 1, type: "Physio", duration: 45, status: "confirmed" }
  ],
  suggestions: [
    { time: "11:00 AM", therapist: "Amy Liu", room: 1, reason: "Optimal for knee rehabilitation", confidence: 95 },
    { time: "1:00 PM", therapist: "Sarah Chen", room: 2, reason: "High success rate with sports injuries", confidence: 88 },
    { time: "3:00 PM", therapist: "James Park", room: 3, reason: "Specialized in athletic performance", confidence: 92 }
  ]
};

const SmartScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState("physio");

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
          <Button className="bg-gradient-to-r from-primary to-secondary">
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Bookings</p>
                <p className="text-2xl font-bold text-primary">24</p>
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
                <p className="text-2xl font-bold text-secondary">8</p>
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
                <p className="text-2xl font-bold text-accent">3</p>
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
                <p className="text-2xl font-bold text-success">78%</p>
              </div>
              <MapPin className="w-8 h-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions */}
      <Card className="shadow-strong bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Search className="w-5 h-5 mr-2" />
            🤖 AI Scheduling Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockScheduleData.suggestions.map((suggestion, index) => (
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

      {/* Schedule Grid */}
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
              {mockScheduleData.therapists.map((therapist) => (
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
              {mockScheduleData.appointments.map((appointment) => (
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

      {/* Room Status */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-accent" />
            Room Status & Utilization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockScheduleData.rooms.map((room) => (
              <div key={room.id} className="text-center p-6 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{room.name}</h3>
                <Badge className="bg-success text-success-foreground">
                  {room.status}
                </Badge>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Utilization</span>
                    <span className="font-medium">
                      {room.id === 1 ? '92%' : room.id === 2 ? '71%' : '71%'}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div 
                      className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                      style={{ width: room.id === 1 ? '92%' : '71%' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartScheduler;