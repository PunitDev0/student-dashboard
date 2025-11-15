import Navigation from "@/components/navigation"
import { ProfilePage } from "@/components/profile-page"

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <ProfilePage />
      </main>
    </div>
  )
}
