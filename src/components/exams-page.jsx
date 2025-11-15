"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Calendar,
  Clock,
  GraduationCap,
  Download,
  TrendingUp,
  Award,
  BookOpen,
  FileText,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

// Extended exam data
const upcomingExams = [
  {
    id: 1,
    name: "Mid-term Mathematics",
    subject: "Mathematics",
    date: "2024-02-15",
    startTime: "09:00",
    endTime: "11:00",
    duration: "2 hours",
    totalMarks: 100,
    room: "Room 101",
    syllabus: "Chapters 1-5: Algebra, Geometry, Trigonometry",
    instructions: "Bring calculator, ruler, and compass",
  },
  {
    id: 2,
    name: "Physics Practical",
    subject: "Physics",
    date: "2024-02-18",
    startTime: "10:00",
    endTime: "12:00",
    duration: "2 hours",
    totalMarks: 50,
    room: "Physics Lab",
    syllabus: "Experiments 1-8: Mechanics and Optics",
    instructions: "Lab coat mandatory, bring observation notebook",
  },
  {
    id: 3,
    name: "English Literature",
    subject: "English",
    date: "2024-02-20",
    startTime: "14:00",
    endTime: "16:00",
    duration: "2 hours",
    totalMarks: 80,
    room: "Room 205",
    syllabus: "Poetry, Drama, and Prose sections",
    instructions: "No electronic devices allowed",
  },
]

const examResults = [
  {
    id: 1,
    examName: "First Term Mathematics",
    subject: "Mathematics",
    date: "2024-01-10",
    totalMarks: 100,
    marksObtained: 85,
    grade: "A",
    percentage: 85,
    rank: 5,
    remarks: "Excellent performance in algebra",
  },
  {
    id: 2,
    examName: "Physics Unit Test",
    subject: "Physics",
    date: "2024-01-12",
    totalMarks: 50,
    marksObtained: 42,
    grade: "B+",
    percentage: 84,
    rank: 8,
    remarks: "Good understanding of concepts",
  },
  {
    id: 3,
    examName: "English Essay",
    subject: "English",
    date: "2024-01-15",
    totalMarks: 50,
    marksObtained: 44,
    grade: "A-",
    percentage: 88,
    rank: 3,
    remarks: "Creative writing skills demonstrated",
  },
  {
    id: 4,
    examName: "Chemistry Lab Test",
    subject: "Chemistry",
    date: "2024-01-18",
    totalMarks: 30,
    marksObtained: 26,
    grade: "A-",
    percentage: 87,
    rank: 4,
    remarks: "Accurate experimental procedures",
  },
  {
    id: 5,
    examName: "Biology Quiz",
    subject: "Biology",
    date: "2024-01-20",
    totalMarks: 25,
    marksObtained: 22,
    grade: "A-",
    percentage: 88,
    rank: 2,
    remarks: "Strong grasp of biological concepts",
  },
]

// Performance data for charts
const subjectPerformance = [
  { subject: "Math", percentage: 85, grade: "A" },
  { subject: "Physics", percentage: 84, grade: "B+" },
  { subject: "English", percentage: 88, grade: "A-" },
  { subject: "Chemistry", percentage: 87, grade: "A-" },
  { subject: "Biology", percentage: 88, grade: "A-" },
]

const performanceTrend = [
  { exam: "Test 1", percentage: 82 },
  { exam: "Test 2", percentage: 85 },
  { exam: "Test 3", percentage: 84 },
  { exam: "Test 4", percentage: 87 },
  { exam: "Test 5", percentage: 88 },
]

export function ExamsPage() {
  const [selectedTerm, setSelectedTerm] = useState("current")
  const [selectedView, setSelectedView] = useState("schedule")

  // Calculate overall statistics
  const totalExams = examResults.length
  const averagePercentage = Math.round(examResults.reduce((sum, exam) => sum + exam.percentage, 0) / totalExams)
  const averageRank = Math.round(examResults.reduce((sum, exam) => sum + exam.rank, 0) / totalExams)

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800 border-green-200"
      case "A-":
        return "bg-green-100 text-green-700 border-green-200"
      case "B+":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "B":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "C":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDaysUntilExam = (examDate) => {
    const today = new Date()
    const exam = new Date(examDate)
    const diffTime = exam.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Exams & Results</h1>
        <p className="text-muted-foreground">Track your exam schedules, results, and academic performance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averagePercentage}%</div>
            <p className="text-xs text-muted-foreground">Across {totalExams} exams</p>
            <Progress value={averagePercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rank</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{averageRank}</div>
            <p className="text-xs text-muted-foreground">Class position</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingExams.length}</div>
            <p className="text-xs text-muted-foreground">Next exam in {getDaysUntilExam(upcomingExams[0].date)} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Subject</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">English</div>
            <p className="text-xs text-muted-foreground">88% average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Select value={selectedTerm} onValueChange={setSelectedTerm}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Term</SelectItem>
                <SelectItem value="previous">Previous Term</SelectItem>
                <SelectItem value="all">All Terms</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Report Card
            </Button>
          </div>
        </div>

        <TabsContent value="schedule" className="space-y-6">
          {/* Upcoming Exams Alert */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Upcoming Exams</AlertTitle>
            <AlertDescription>
              You have {upcomingExams.length} exams scheduled in the next few weeks. Make sure to prepare well!
            </AlertDescription>
          </Alert>

          {/* Exam Schedule Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingExams.map((exam) => {
              const daysUntil = getDaysUntilExam(exam.date)
              return (
                <Card key={exam.id} className="relative overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 w-1 h-full ${
                      daysUntil <= 3 ? "bg-red-500" : daysUntil <= 7 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={
                          daysUntil <= 3
                            ? "bg-red-50 text-red-700 border-red-200"
                            : daysUntil <= 7
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-green-50 text-green-700 border-green-200"
                        }
                      >
                        {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days`}
                      </Badge>
                      <Badge variant="secondary">{exam.totalMarks} marks</Badge>
                    </div>
                    <CardTitle className="text-lg">{exam.name}</CardTitle>
                    <CardDescription>{exam.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(exam.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {exam.startTime} - {exam.endTime} ({exam.duration})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{exam.room}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-1">Syllabus:</p>
                      <p className="text-xs">{exam.syllabus}</p>
                    </div>
                    <div className="pt-1">
                      <p className="text-xs text-muted-foreground mb-1">Instructions:</p>
                      <p className="text-xs">{exam.instructions}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Exam Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Exam Calendar
              </CardTitle>
              <CardDescription>Overview of all scheduled exams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                        <span className="text-xs font-medium">
                          {new Date(exam.date).toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span className="text-sm font-bold">{new Date(exam.date).getDate()}</span>
                      </div>
                      <div>
                        <p className="font-medium">{exam.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {exam.subject} • {exam.startTime} - {exam.endTime}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{exam.totalMarks} marks</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{exam.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {/* Results Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Exam Results Summary
              </CardTitle>
              <CardDescription>Your recent exam performance and grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Exam</th>
                      <th className="text-left p-3 font-medium">Subject</th>
                      <th className="text-left p-3 font-medium">Date</th>
                      <th className="text-left p-3 font-medium">Marks</th>
                      <th className="text-left p-3 font-medium">Grade</th>
                      <th className="text-left p-3 font-medium">Rank</th>
                      <th className="text-left p-3 font-medium">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examResults.map((result) => (
                      <tr key={result.id} className="border-b">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{result.examName}</p>
                          </div>
                        </td>
                        <td className="p-3">{result.subject}</td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {new Date(result.date).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <div className="text-center">
                            <p className="font-medium">
                              {result.marksObtained}/{result.totalMarks}
                            </p>
                            <p className="text-xs text-muted-foreground">{result.percentage}%</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={getGradeColor(result.grade)}>{result.grade}</Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">#{result.rank}</Badge>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground max-w-xs">{result.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Grade Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>Your grades across different subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {subjectPerformance.map((subject) => (
                  <div key={subject.subject} className="text-center p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">{subject.subject}</h4>
                    <div className="text-2xl font-bold mb-1">{subject.percentage}%</div>
                    <Badge className={getGradeColor(subject.grade)}>{subject.grade}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Subject Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
                <CardDescription>Your performance across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                    <Bar dataKey="percentage" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>Your exam scores over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="exam" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                    <Line
                      type="monotone"
                      dataKey="percentage"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Performance Insights
              </CardTitle>
              <CardDescription>Analysis of your academic performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Consistent performance in English (88% average)</li>
                    <li>• Strong improvement trend over recent exams</li>
                    <li>• Excellent creative writing skills</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">Areas for Improvement</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Focus more on Physics practical applications</li>
                    <li>• Practice more complex mathematical problems</li>
                    <li>• Improve time management during exams</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
