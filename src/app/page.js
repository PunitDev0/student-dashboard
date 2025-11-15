'use client'

import DashboardOverview from "@/components/dashboard-overview"
import Navigation from "@/components/navigation"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function HomePage() {
     const router = useRouter();

  useEffect(() => {
    router.push("/profile"); // jaha redirect karna ho
  }, [router]);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <DashboardOverview />
      </main>
    </div>
  )
}
