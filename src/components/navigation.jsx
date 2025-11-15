"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BookOpen,
  Calendar,
  CheckSquare,
  FileText,
  Menu,
  User,
} from "lucide-react";

const navigationItems = [
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Calendar, label: "Timetable", href: "/timetable" },
  { icon: CheckSquare, label: "Attendance", href: "/attendance" },
  { icon: FileText, label: "Assignments", href: "/assignments" },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [student, setStudent] = useState(null);

  // 🧠 Load student data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("studentData");
      if (data) {
        setStudent(JSON.parse(data));
      }
    }
  }, []);

  // 🚪 Logout function
  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    router.push("/login");
  };

  const NavigationContent = () => (
    <nav className="space-y-2">
      {navigationItems.map((item) => (
        <Button
          key={item.label}
          variant={pathname === item.href ? "default" : "ghost"}
          className="w-full justify-start gap-3 text-left"
          asChild
        >
          <Link href={item.href}>
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* 📱 Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 border-b pb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold">Student Portal</span>
                </div>
                <NavigationContent />
              </div>
            </SheetContent>
          </Sheet>

          {/* 💻 Desktop logo */}
          <Link href="/" className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Student Portal</span>
          </Link>
        </div>

        {/* 🧭 Desktop navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant={pathname === item.href ? "default" : "ghost"}
              size="sm"
              className="gap-2"
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>

        {/* 👤 User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={student?.profileImage || "/student-avatar.png"}
                  alt={student?.fullName || "Student"}
                />
                <AvatarFallback>
                  {student?.fullName
                    ? student.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "NA"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              {student ? (
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{student.fullName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {student.currentClass?.className || "N/A"}{" "}
                    {student.currentClass?.sectionName
                      ? `• ${student.currentClass.sectionName}`
                      : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {student.studentId}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Loading...</p>
              )}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
