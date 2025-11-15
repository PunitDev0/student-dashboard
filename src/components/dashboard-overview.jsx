"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle,
  BookOpen,
} from "lucide-react"
import {
  mockStudent,
  mockTimetable,
  mockUpcomingExams,
  mockAssignments,
  mockAttendance,
  mockAnnouncements,
} from "@/lib/mock-data"

export default function DashboardOverview() {
  // Get today's timetable (assuming Monday for demo)
  const todaysTimetable = mockTimetable.slice(0, 3)

  // Get pending assignments
  const pendingAssignments = mockAssignments.filter((a) => !a.submitted)

  // Get recent attendance (last 5 days)
  const recentAttendance = mockAttendance.slice(-5)
  const presentDays = recentAttendance.filter((a) => a.status === "present").length

  // Get latest announcements
  const latestAnnouncements = mockAnnouncements.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Welcome back, {mockStudent.name.split(" ")[0]}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your academics today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudent.attendancePercentage}%</div>
            <p className="text-xs text-muted-foreground">{presentDays}/5 days this week</p>
            <Progress value={mockStudent.attendancePercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAssignments.length}</div>
            <p className="text-xs text-muted-foreground">Assignments due soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUpcomingExams.length}</div>
            <p className="text-xs text-muted-foreground">Next exam in 3 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5th</div>
            <p className="text-xs text-muted-foreground">Out of 45 students</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Timetable */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaysTimetable.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                    <span className="text-xs font-medium">P{entry.period}</span>
                  </div>
                  <div>
                    <p className="font-medium">{entry.subject}</p>
                    <p className="text-sm text-muted-foreground">{entry.teacher}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {entry.startTime} - {entry.endTime}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    45 min
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              View Full Timetable
            </Button>
          </CardContent>
        </Card>

        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recent Attendance
            </CardTitle>
            <CardDescription>Your attendance for the last 5 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAttendance.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      record.status === "present"
                        ? "bg-green-500"
                        : record.status === "late"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <div>
                    <p className="font-medium">
                      {new Date(record.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    {record.remarks && <p className="text-sm text-muted-foreground">{record.remarks}</p>}
                  </div>
                </div>
                <Badge
                  variant={
                    record.status === "present" ? "default" : record.status === "late" ? "secondary" : "destructive"
                  }
                >
                  {record.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              View Full Attendance
            </Button>
          </CardContent>
        </Card>

        {/* Pending Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Pending Assignments
            </CardTitle>
            <CardDescription>Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingAssignments.length > 0 ? (
              pendingAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                    <Badge variant="outline">{assignment.totalMarks} marks</Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                <p>All assignments completed!</p>
              </div>
            )}
            <Button variant="outline" className="w-full bg-transparent">
              View All Assignments
            </Button>
          </CardContent>
        </Card>

        {/* Latest Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Latest Announcements
            </CardTitle>
            <CardDescription>Important updates and notices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {latestAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{announcement.title}</h4>
                  <Badge
                    variant={
                      announcement.priority === "high"
                        ? "destructive"
                        : announcement.priority === "normal"
                          ? "default"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                <p className="text-xs text-muted-foreground">{new Date(announcement.date).toLocaleDateString()}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              View All Announcements
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
