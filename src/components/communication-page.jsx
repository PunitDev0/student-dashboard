"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  MessageSquare,
  Bell,
  Calendar,
  Users,
  Send,
  Phone,
  Mail,
  Clock,
  AlertCircle,
  CheckCircle,
  BookOpen,
} from "lucide-react"

// Communication data
const announcements = [
  {
    id: 1,
    title: "Parent-Teacher Meeting Scheduled",
    content:
      "PTM scheduled for next Friday at 2 PM. Please ensure your parents attend to discuss your academic progress.",
    type: "event",
    priority: "high",
    author: "Principal",
    date: "2024-02-10",
    read: false,
  },
  {
    id: 2,
    title: "Holiday Notice - National Day",
    content:
      "School will remain closed on Monday, February 12th, in observance of National Day. Regular classes will resume on Tuesday.",
    type: "holiday",
    priority: "normal",
    author: "Administration",
    date: "2024-02-08",
    read: true,
  },
  {
    id: 3,
    title: "Math Olympiad Registration Open",
    content:
      "Registration is now open for the inter-school mathematics competition. Interested students should contact their math teacher by February 20th.",
    type: "general",
    priority: "normal",
    author: "Dr. Sarah Johnson",
    date: "2024-02-05",
    read: true,
  },
]

const messages = [
  {
    id: 1,
    sender: "Dr. Sarah Johnson",
    subject: "Mathematics Assignment Feedback",
    content:
      "Great work on your algebra assignment! Your problem-solving approach shows good understanding. Keep it up!",
    date: "2024-02-09",
    read: false,
    type: "teacher",
  },
  {
    id: 2,
    sender: "Prof. Michael Chen",
    subject: "Physics Lab Report",
    content:
      "Your lab report was well-structured. However, please include more detailed error analysis in future reports.",
    date: "2024-02-07",
    read: true,
    type: "teacher",
  },
  {
    id: 3,
    sender: "Class Representative",
    subject: "Study Group Formation",
    content:
      "We're forming study groups for the upcoming exams. Let me know if you're interested in joining the Physics study group.",
    date: "2024-02-06",
    read: true,
    type: "student",
  },
]

const teachers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    subject: "Mathematics",
    email: "sarah.johnson@school.edu",
    phone: "+1234567890",
    officeHours: "Mon-Fri 2:00-4:00 PM",
    room: "Room 101",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    subject: "Physics",
    email: "michael.chen@school.edu",
    phone: "+1234567891",
    officeHours: "Tue-Thu 1:00-3:00 PM",
    room: "Physics Lab",
  },
  {
    id: 3,
    name: "Ms. Emily Davis",
    subject: "English",
    email: "emily.davis@school.edu",
    phone: "+1234567892",
    officeHours: "Mon-Wed 3:00-5:00 PM",
    room: "Room 205",
  },
]

export function CommunicationPage() {
  const [selectedTab, setSelectedTab] = useState("announcements")
  const [newMessage, setNewMessage] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState("")

  const unreadAnnouncements = announcements.filter((a) => !a.read).length
  const unreadMessages = messages.filter((m) => !m.read).length

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Communication Center</h1>
        <p className="text-muted-foreground">
          Stay connected with teachers, receive announcements, and manage messages
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Announcements</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadAnnouncements}</div>
            <p className="text-xs text-muted-foreground">New notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessages}</div>
            <p className="text-xs text-muted-foreground">From teachers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming PTM</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Days remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-xs text-muted-foreground">For contact</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="announcements" className="relative">
            Announcements
            {unreadAnnouncements > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {unreadAnnouncements}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="messages" className="relative">
            Messages
            {unreadMessages > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {unreadMessages}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="teachers">Teacher Contact</TabsTrigger>
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className={`${!announcement.read ? "border-l-4 border-l-primary" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                    <Badge variant="outline">{announcement.type}</Badge>
                    {!announcement.read && <Badge variant="destructive">New</Badge>}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {new Date(announcement.date).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-lg">{announcement.title}</CardTitle>
                <CardDescription>By {announcement.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{announcement.content}</p>
                {!announcement.read && (
                  <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Read
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={`${!message.read ? "border-l-4 border-l-primary" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{message.sender}</p>
                      <p className="text-sm text-muted-foreground">{message.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!message.read && <Badge variant="destructive">New</Badge>}
                    <span className="text-sm text-muted-foreground">{new Date(message.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">{message.content}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                  {!message.read && (
                    <Button variant="outline" size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Read
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="teachers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <Card key={teacher.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{teacher.name}</CardTitle>
                      <CardDescription>{teacher.subject}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{teacher.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{teacher.officeHours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{teacher.room}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compose" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Compose New Message
              </CardTitle>
              <CardDescription>Send a message to your teachers or classmates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select recipient</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.name}>
                        {teacher.name} - {teacher.subject}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Enter message subject" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={6}
                />
              </div>
              <div className="flex gap-2">
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline">Save Draft</Button>
              </div>
            </CardContent>
          </Card>

          {/* PTM Notification */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Upcoming Parent-Teacher Meeting</AlertTitle>
            <AlertDescription>
              Don't forget to inform your parents about the PTM scheduled for Friday, February 16th at 2:00 PM. You can
              send them a reminder through the parent portal.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}
