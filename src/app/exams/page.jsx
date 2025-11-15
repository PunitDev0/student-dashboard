import { ExamsPage } from "@/components/exams-page"
import Navigation from "@/components/navigation"

export default function Exams() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <ExamsPage />
      </main>
    </div>
  )
}
