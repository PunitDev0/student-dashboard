"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Award, Target, Users, Star, CheckCircle, BarChart3 } from "lucide-react"
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
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Academic progress data
const semesterProgress = [
  { month: "Sep", overall: 78, attendance: 92, assignments: 85, exams: 70 },
  { month: "Oct", overall: 82, attendance: 88, assignments: 90, exams: 75 },
  { month: "Nov", overall: 85, attendance: 85, assignments: 88, exams: 82 },
  { month: "Dec", overall: 87, attendance: 90, assignments: 92, exams: 80 },
  { month: "Jan", overall: 86, attendance: 85, assignments: 90, exams: 85 },
]

const subjectComparison = [
  { subject: "Mathematics", current: 85, previous: 78, target: 90, improvement: 7 },
  { subject: "Physics", current: 84, previous: 80, target: 88, improvement: 4 },
  { subject: "English", current: 88, previous: 85, target: 90, improvement: 3 },
  { subject: "Chemistry", current: 87, previous: 82, target: 90, improvement: 5 },
  { subject: "Biology", current: 88, previous: 86, target: 92, improvement: 2 },
]

const skillsRadar = [
  { skill: "Problem Solving", score: 85 },
  { skill: "Critical Thinking", score: 88 },
  { skill: "Communication", score: 90 },
  { skill: "Creativity", score: 82 },
  { skill: "Time Management", score: 78 },
  { skill: "Collaboration", score: 86 },
]

const performanceDistribution = [
  { name: "Excellent (90-100%)", value: 25, color: "#10b981" },
  { name: "Good (80-89%)", value: 45, color: "#3b82f6" },
  { name: "Average (70-79%)", value: 25, color: "#f59e0b" },
  { name: "Below Average (<70%)", value: 5, color: "#ef4444" },
]

const classRankingHistory = [
  { term: "Term 1", rank: 8, totalStudents: 45 },
  { term: "Term 2", rank: 6, totalStudents: 45 },
  { term: "Term 3", rank: 5, totalStudents: 45 },
  { term: "Current", rank: 5, totalStudents: 45 },
]

const goals = [
  {
    id: 1,
    title: "Improve Mathematics Score",
    target: 90,
    current: 85,
    deadline: "2024-03-15",
    status: "on-track",
    description: "Achieve 90% average in mathematics by end of term",
  },
  {
    id: 2,
    title: "Perfect Attendance",
    target: 100,
    current: 85,
    deadline: "2024-02-28",
    status: "behind",
    description: "Maintain 100% attendance for the month",
  },
  {
    id: 3,
    title: "Class Rank Top 3",
    target: 3,
    current: 5,
    deadline: "2024-04-30",
    status: "on-track",
    description: "Achieve top 3 position in class ranking",
  },
]

export function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("semester")
  const [selectedView, setSelectedView] = useState("overview")

  // Calculate overall statistics
  const currentOverall = semesterProgress[semesterProgress.length - 1].overall
  const previousOverall = semesterProgress[semesterProgress.length - 2].overall
  const overallTrend = currentOverall - previousOverall
  const currentRank = classRankingHistory[classRankingHistory.length - 1].rank
  const averageImprovement = Math.round(
    subjectComparison.reduce((sum, subject) => sum + subject.improvement, 0) / subjectComparison.length,
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Academic Progress Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights into your academic performance and growth</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Performance</CardTitle>
            {overallTrend > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentOverall}%</div>
            <p className="text-xs text-muted-foreground">
              {overallTrend > 0 ? "+" : ""}
              {overallTrend}% from last month
            </p>
            <Progress value={currentOverall} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{currentRank}</div>
            <p className="text-xs text-muted-foreground">Out of 45 students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Improvement</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{averageImprovement}%</div>
            <p className="text-xs text-muted-foreground">Across all subjects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/3</div>
            <p className="text-xs text-muted-foreground">Goals on track</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
            <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
            <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
          </TabsList>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Performance Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Trend
                </CardTitle>
                <CardDescription>Your academic progress over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={semesterProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="overall"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Overall"
                      dot={{ fill: "#10b981" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Attendance"
                      dot={{ fill: "#3b82f6" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="assignments"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Assignments"
                      dot={{ fill: "#f59e0b" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="exams"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Exams"
                      dot={{ fill: "#ef4444" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
                <CardDescription>Breakdown of your performance levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={performanceDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {performanceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Class Ranking History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Class Ranking Progress
              </CardTitle>
              <CardDescription>Your position in class over different terms</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={classRankingHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="term" />
                  <YAxis domain={[0, 45]} />
                  <Tooltip formatter={(value) => [`Rank ${value}`, "Position"]} />
                  <Bar dataKey="rank" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Performance Insights
              </CardTitle>
              <CardDescription>AI-powered analysis of your academic progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Strengths
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Consistent improvement in English and Biology</li>
                    <li>• Strong performance in creative assignments</li>
                    <li>• Good collaboration skills in group projects</li>
                    <li>• Excellent communication abilities</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Recommendations
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Focus on time management for better attendance</li>
                    <li>• Practice more complex mathematical problems</li>
                    <li>• Seek help in physics practical applications</li>
                    <li>• Set specific study schedules for each subject</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          {/* Subject Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Comparison</CardTitle>
              <CardDescription>Current vs previous performance with targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectComparison.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{subject.subject}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">Previous: {subject.previous}%</span>
                        <span className="font-medium">Current: {subject.current}%</span>
                        <span className="text-muted-foreground">Target: {subject.target}%</span>
                        <Badge
                          variant={subject.improvement > 0 ? "default" : "secondary"}
                          className={subject.improvement > 0 ? "bg-green-100 text-green-800" : ""}
                        >
                          {subject.improvement > 0 ? "+" : ""}
                          {subject.improvement}%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Progress value={subject.current} className="h-2" />
                      </div>
                      <div className="w-16 text-xs text-muted-foreground text-right">
                        {Math.round((subject.current / subject.target) * 100)}% of target
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Overview</CardTitle>
              <CardDescription>Visual comparison of all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="previous" fill="#94a3b8" name="Previous" />
                  <Bar dataKey="current" fill="#10b981" name="Current" />
                  <Bar dataKey="target" fill="#3b82f6" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          {/* Skills Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Skills Assessment
              </CardTitle>
              <CardDescription>Your performance across different skill areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={skillsRadar}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    name="Skills"
                    dataKey="score"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Skills Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Skills Development Plan</CardTitle>
              <CardDescription>Personalized recommendations for skill improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {skillsRadar.map((skill) => (
                  <div key={skill.skill} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{skill.skill}</h4>
                      <Badge variant={skill.score >= 85 ? "default" : skill.score >= 75 ? "secondary" : "outline"}>
                        {skill.score}%
                      </Badge>
                    </div>
                    <Progress value={skill.score} className="mb-2" />
                    <p className="text-xs text-muted-foreground">
                      {skill.score >= 85
                        ? "Excellent! Keep up the great work."
                        : skill.score >= 75
                          ? "Good progress. Focus on consistent practice."
                          : "Needs improvement. Consider additional practice."}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          {/* Goals Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={goal.status === "on-track" ? "default" : "destructive"}>
                      {goal.status === "on-track" ? "On Track" : "Behind"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Due: {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {goal.current}
                        {typeof goal.target === "number" && goal.target > 10 ? "%" : ""} / {goal.target}
                        {typeof goal.target === "number" && goal.target > 10 ? "%" : ""}
                      </span>
                    </div>
                    <Progress
                      value={typeof goal.target === "number" ? (goal.current / goal.target) * 100 : 0}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Set New Goal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Set New Academic Goal
              </CardTitle>
              <CardDescription>Create a new goal to track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Goal Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Improve Chemistry Grade"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Value</label>
                    <input type="number" placeholder="e.g., 90" className="w-full p-2 border rounded-md" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    placeholder="Describe your goal and how you plan to achieve it..."
                    rows={3}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deadline</label>
                  <input type="date" className="w-full p-2 border rounded-md" />
                </div>
                <Button>
                  <Target className="h-4 w-4 mr-2" />
                  Create Goal
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
