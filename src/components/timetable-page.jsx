"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, BookOpen, ChevronLeft, ChevronRight, Coffee } from "lucide-react";

export default function TimetablePage() {
  const [timetable, setTimetable] = useState({});
  const [timeSlots, setTimeSlots] = useState([]); // Full timeline including breaks
  const [loading, setLoading] = useState(true);

  const daysFull = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const dayMap = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
  };

  useEffect(() => {
    async function loadData() {
      const stored = localStorage.getItem("studentData");
      if (!stored) {
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(stored);

      try {
        // Step 1: Get current class & section
        const allocRes = await axios.get(
          `http://localhost:3000/api/students/portal/me?institutionId=${parsed.institutionId}&studentId=${parsed.id}`
        );

        const { currentClass, currentSection } = allocRes.data.data;
        const classId = currentClass._id;
        const sectionId = currentSection._id;

        // Step 2: Fetch timetable + schedule config
        const ttRes = await axios.get(
          `http://localhost:3000/api/students/portal/timetable?instituteId=${parsed.institutionId}&classId=${classId}&sectionId=${sectionId}`
        );

        const { timetable: backendTimetable, scheduleConfig } = ttRes.data;

        // Save the full timeSlots (includes periods + lunch + breaks)
        setTimeSlots(scheduleConfig.timeSlots || []);

        // Convert backend { Mon: [...], Tue: [...] } → { Monday: [...], ... }
        const formatted = {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
        };

        Object.keys(backendTimetable).forEach((shortDay) => {
          const fullDay = dayMap[shortDay];
          if (fullDay && backendTimetable[shortDay]) {
            formatted[fullDay] = backendTimetable[shortDay].map((item) => ({
              period: item.period,
              subject: item.subject,
              teacher: item.teacher,
              room: item.room || "N/A",
            }));
          }
        });

        setTimetable(formatted);
      } catch (err) {
        console.error("Timetable load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Color mapping for subjects
  const getSubjectColor = (subject) => {
    const colors = {
      Hindi: "bg-red-100 text-red-800 border-red-300",
      English: "bg-green-100 text-green-800 border-green-300",
      Mathematics: "bg-blue-100 text-blue-800 border-blue-300",
      Science: "bg-yellow-100 text-yellow-800 border-yellow-300",
      Physics: "bg-purple-100 text-purple-800 border-purple-300",
      Chemistry: "bg-orange-100 text-orange-800 border-orange-300",
      Biology: "bg-pink-100 text-pink-800 border-pink-300",
      Social: "bg-indigo-100 text-indigo-800 border-indigo-300",
    };
    return colors[subject] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  if (loading) return <div className="text-center py-10">Loading timetable...</div>;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Class Timetable</h1>
        <p className="text-muted-foreground">Your weekly schedule with timings</p>
      </div>

      <Tabs defaultValue="Monday" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">Current Week</span>
            <Button variant="outline" size="sm" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Academic Year 2025–26
          </div>
        </div>

        <TabsList className="grid w-full grid-cols-6">
          {daysFull.map((day) => (
            <TabsTrigger key={day} value={day}>
              {day.slice(0, 3)}
            </TabsTrigger>
          ))}
        </TabsList>

        {daysFull.map((day) => (
          <TabsContent key={day} value={day} className="space-y-6">
            <div className="space-y-4">
              {timeSlots.length > 0 ? (
                timeSlots.map((slot, index) => {
                  const isBreak = slot.isBreak;
                  const periodData = !isBreak
                    ? timetable[day]?.find((p) => p.period === slot.id)
                    : null;

                  return (
                    <Card
                      key={index}
                      className={`overflow-hidden border-l-4 ${
                        isBreak
                          ? "border-l-orange-400 bg-orange-50"
                          : periodData
                          ? "border-l-transparent"
                          : "border-l-gray-200 bg-gray-50 opacity-75"
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {isBreak ? (
                              <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                                <Coffee className="h-3 w-3 mr-1" />
                                {slot.label.split(" ")[0]}
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                {periodData ? `Period ${slot.id}` : "Free Period"}
                              </Badge>
                            )}
                            <span className="text-sm font-medium text-muted-foreground">
                              {slot.startTime} – {slot.endTime}
                            </span>
                          </div>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>

                        {!isBreak && periodData ? (
                          <CardTitle className="text-xl mt-2">{periodData.subject}</CardTitle>
                        ) : isBreak ? (
                          <CardTitle className="text-xl mt-2 text-orange-700">{slot.label}</CardTitle>
                        ) : (
                          <CardTitle className="text-xl mt-2 text-gray-500 italic">
                            No Class
                          </CardTitle>
                        )}
                      </CardHeader>

                      {!isBreak && periodData && (
                        <CardContent className="space-y-3 pt-2">
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getSubjectColor(periodData.subject)}`}>
                            {periodData.subject}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {periodData.teacher}
                          </div>
                          {/* <div className="flex items-center gap-2 text-sm">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            Room: {periodData.room}
                          </div> */}
                        </CardContent>
                      )}
                    </Card>
                  );
                })
              ) : (
                <p className="text-center text-muted-foreground py-10">
                  No schedule configured for this institute yet.
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}