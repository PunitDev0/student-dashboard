"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  Download,
  User,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedView, setSelectedView] = useState("monthly");

  // Fetch attendance from backend
  useEffect(() => {
    async function fetchAttendance() {
      try {
        const stored = localStorage.getItem("studentData");
        if (!stored) throw new Error("Student not logged in");

        const { institutionId, id: studentId } = JSON.parse(stored);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/students/portal/attendance?institutionId=${institutionId}&studentId=${studentId}`
        );

        if (res.data.success) {
          const records = res.data.data || [];
          // Sort newest first
          records.sort((a, b) => new Date(b.date) - new Date(a.date));
          setAttendanceRecords(records);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load attendance");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAttendance();
  }, []);

  // Derive stats
  const totalDays = attendanceRecords.length;
  const present = attendanceRecords.filter((r) => r.status === "Present").length;
  const absent = attendanceRecords.filter((r) => r.status === "Absent").length;
  const late = attendanceRecords.filter((r) => r.status === "Late").length;
  const leave = attendanceRecords.filter((r) => r.status === "Leave").length;

  const attendancePercentage = totalDays > 0 ? Math.round((present / totalDays) * 100) : 0;

  // Monthly grouping
  const monthlySummary = attendanceRecords.reduce((acc, record) => {
    const date = new Date(record.date);
    const monthKey = date.toLocaleString("default", { month: "short", year: "numeric" });

    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthKey, present: 0, absent: 0, late: 0, leave: 0, total: 0 };
    }
    acc[monthKey][record.status.toLowerCase()]++;
    acc[monthKey].total++;
    return acc;
  }, {});

  const monthlyData = Object.values(monthlySummary)
    .map((m) => ({
      ...m,
      percentage: Math.round((m.present / m.total) * 100),
    }))
    .reverse();

  const getStatusColor = (status) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-800 border-green-300";
      case "Absent": return "bg-red-100 text-red-800 border-red-300";
      case "Late": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Leave": return "bg-purple-100 text-purple-800 border-purple-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Present": return <CheckCircle className="h-4 w-4" />;
      case "Absent": return <XCircle className="h-4 w-4" />;
      case "Late": return <Clock className="h-4 w-4" />;
      case "Leave": return <AlertTriangle className="h-4 w-4" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
              <CardContent><Skeleton className="h-10 w-20" /></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">My Attendance</h1>
        <p className="text-muted-foreground">Track your daily attendance and performance</p>
      </div>

      {/* Low Attendance Warning */}
      {attendancePercentage < 75 && (
        <Alert className="border-orange-300 bg-orange-50">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <AlertTitle className="text-orange-800">Low Attendance Alert</AlertTitle>
          <AlertDescription className="text-orange-700">
            Your attendance is {attendancePercentage}%. Minimum required is 75%. Please improve to avoid penalties.
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall %</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${attendancePercentage >= 75 ? "text-green-600" : "text-red-600"}`}>
              {attendancePercentage}%
            </div>
            <Progress value={attendancePercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Present</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">{present}</div></CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Absent</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-600">{absent}</div></CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Late</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-yellow-600">{late}</div></CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">On Leave</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-purple-600">{leave}</div></CardContent>
        </Card>
      </div>

      <Tabs value={selectedView} onValueChange={setSelectedView}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="daily">Daily Records</TabsTrigger>
            <TabsTrigger value="chart">Analytics</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Monthly View */}
        <TabsContent value="monthly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="present" fill="#10b981" name="Present" />
                    <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                    <Bar dataKey="late" fill="#f59e0b" name="Late" />
                    <Bar dataKey="leave" fill="#8b5cf6" name="Leave" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-muted-foreground py-10">No attendance data yet this year</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Daily Records */}
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance History</CardTitle>
              <CardDescription>Latest records shown first</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceRecords.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No attendance marked yet.</p>
                ) : (
                  attendanceRecords.map((record) => (
                    <div
                      key={record._id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${getStatusColor(record.status)}`}>
                          {getStatusIcon(record.status)}
                        </div>
                        <div>
                          <p className="font-medium">
                            {new Date(record.date).toLocaleDateString("en-IN", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                          {record.remarks && (
                            <p className="text-sm text-muted-foreground mt-1">{record.remarks}</p>
                          )}
                        </div>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="chart" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Line type="monotone" dataKey="percentage" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                {["Present", "Absent", "Late", "Leave"].map((status) => {
                  const count = attendanceRecords.filter((r) => r.status === status).length;
                  const percent = totalDays > 0 ? Math.round((count / totalDays) * 100) : 0;
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${getStatusColor(status).split(" ")[0]}`} />
                        <span className="font-medium">{status}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold">{count}</span>
                        <span className="text-sm text-muted-foreground ml-2">({percent}%)</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}