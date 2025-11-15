"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, FileText } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";

export function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState(""); // 🆕 Date filter

  const getStudentData = () => {
    try {
      const data = localStorage.getItem("studentData");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  const fetchAssignments = async () => {
    const student = getStudentData();
    if (!student?.currentClass?.classId || !student?.currentClass?.sectionId || !student?.institutionId) {
      setError("Missing student class or institution data. Please contact admin.");
      setLoading(false);
      return;
    }

    const { classId, sectionId } = student.currentClass;
    const institutionId = student.institutionId;

    try {
      const params = new URLSearchParams({
        institutionId,
        classId,
        sectionId,
      });

      // 🆕 If date selected, add it
      if (selectedDate) {
        params.append("createdDate", selectedDate);
      }

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/students/portal/assignments?${params.toString()}`
      );

      if (res.data.success) {
        setAssignments(res.data.data || []);
      } else {
        setError(res.data.message || "No assignments found.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load assignments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [selectedDate]); // 🆕 Refetch when date changes

  const resetFilters = () => {
    setSelectedSubject("all");
    setSelectedStatus("all");
    setSelectedDate("");
  };

  const filtered = assignments.filter((a) => {
    const subjectOk = selectedSubject === "all" || a.subject === selectedSubject;
    const statusOk = selectedStatus === "all" || a.status === selectedStatus;
    return subjectOk && statusOk;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        <FileText className="h-5 w-5 animate-pulse" />
        <span className="ml-2">Loading assignments...</span>
      </div>
    );

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Assignments</h1>
        <p className="text-muted-foreground">Filter and view assignments by subject, status, or date</p>
      </div>

      {error && (
        <Card className="border-red-300 bg-red-50 text-red-700 p-4">
          <CardDescription>{error}</CardDescription>
        </Card>
      )}

      {/* 🔽 Filter Section */}
      <div className="flex flex-wrap gap-3 items-end">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {[...new Set(assignments.map((a) => a.subject))].map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="not-completed">Pending</SelectItem>
          </SelectContent>
        </Select>

        {/* 🆕 Date Filter */}
        <div className="flex items-center gap-2 border rounded-md px-3 py-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <input
            type="date"
            className="text-sm outline-none bg-transparent"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <Button variant="outline" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>

      {/* 🔽 Assignment Grid */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            No assignments found.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((assignment) => (
            <Card
              key={assignment._id}
              className={`relative border ${
                assignment.status === "completed"
                  ? "border-green-300"
                  : "border-yellow-300"
              }`}
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  assignment.status === "completed" ? "bg-green-500" : "bg-yellow-500"
                }`}
              />
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <CardDescription className="text-sm">{assignment.subject}</CardDescription>
                  </div>
                  <Badge
                    className={
                      assignment.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {assignment.status === "completed" ? "Done" : "Pending"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {assignment.description || "No description"}
                </p>
                <div className="text-xs text-muted-foreground">
                  {assignment.className}{" "}
                  {assignment.sectionName && `• ${assignment.sectionName}`}
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Created on: {format(new Date(assignment.createdAt), "dd MMM yyyy")}
                </p>
                <Button
                  className="w-full mt-2"
                  variant={assignment.status === "completed" ? "outline" : "default"}
                >
                  {assignment.status === "completed" ? "View" : "Submit Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
