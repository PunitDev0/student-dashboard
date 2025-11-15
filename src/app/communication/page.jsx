import { CommunicationPage } from "@/components/communication-page"
import Navigation from "@/components/navigation"

export default function Communication() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <CommunicationPage />
      </main>
    </div>
  )
}
