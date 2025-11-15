import  AttendancePage  from "@/components/attendance-page"
import Navigation from "@/components/navigation"

export default function Attendance() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <AttendancePage />
      </main>
    </div>
  )
}
