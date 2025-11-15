import { AssignmentsPage } from "@/components/assignments-page"
import Navigation from "@/components/navigation"

export default function Assignments() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <AssignmentsPage />
      </main>
    </div>
  )
}
