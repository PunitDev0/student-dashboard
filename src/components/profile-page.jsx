"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  BookOpen,
} from "lucide-react";

export function ProfilePage() {
  const [student, setStudent] = useState(null);
  const [currentClass, setCurrentClass] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("studentData");
    if (!stored) {
      setLoading(false);
      return;
    }

    const parsed = JSON.parse(stored);

    async function loadStudent() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/students/portal/me?institutionId=${parsed.institutionId}&studentId=${parsed.id}`
        );

        console.log("Profile API:", res.data);

        if (res.data.success) {
          setStudent(res.data.data.student);
          setCurrentClass(res.data.data.currentClass);
          setCurrentSection(res.data.data.currentSection);
        }
      } catch (err) {
        console.log("Axios error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStudent();
  }, []);

  if (loading) return <p>Loading student data...</p>;
  if (!student) return <p>No student data found.</p>;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Student Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal & academic details
        </p>
      </div>

      {/* Personal Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Details
          </CardTitle>
          <CardDescription>Your profile information</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={student.studentPhoto || "/student-avatar.png"}
                alt="Student Photo"
              />
              <AvatarFallback>
                {student.firstName?.[0]}
                {student.lastName?.[0]}
              </AvatarFallback>
            </Avatar>

            <div>
              <h3 className="text-2xl font-semibold">
                {student.firstName} {student.lastName}
              </h3>

              {/* Show Class & Section from allocation */}
              {currentClass && currentSection && (
                <p className="text-muted-foreground">
                  {currentClass.name} – Section {currentSection.name}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Information Grid */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Left */}
            <div className="space-y-4">
              <Detail
                icon={<GraduationCap className="text-muted-foreground" />}
                label="Student ID"
                value={student.academicDetails?.studentId}
              />

              <Detail
                icon={<BookOpen className="text-muted-foreground" />}
                label="Admission Number"
                value={student.academicDetails?.admissionNumber}
              />

              <Detail
                icon={<Mail className="text-muted-foreground" />}
                label="Email"
                value={student.emailId}
              />
            </div>

            {/* Right */}
            <div className="space-y-4">
              <Detail
                icon={<Phone className="text-muted-foreground" />}
                label="Phone"
                value={student.phoneNumber}
              />

              {/* <Detail
                icon={<Calendar className="text-muted-foreground" />}
                label="Date of Birth"
                value={
                  student.dateOfBirth
                    ? new Date(student.dateOfBirth).toLocaleDateString()
                    : "Not provided"
                }
              /> */}

              <Detail
                icon={<MapPin className="text-muted-foreground" />}
                label="Address"
                value={student.address}
              />
            </div>

          </div>
        </CardContent>
      </Card>

    </div>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-5 h-5">{icon}</span>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
