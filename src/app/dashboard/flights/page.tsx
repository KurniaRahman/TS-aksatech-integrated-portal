import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { FlightLogContainer } from "./components/flight-log-container"
import { getDrones } from "@/actions/drone-maintenance"
import { getDroneFlightLogs } from "@/actions/drone-flight"
import { getDateStringWIB } from "@/lib/attendance-utils"
import { PlaneTakeoff } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { MatraBadge } from "@/components/ui/matra-badge"

export const metadata = {
  title: "Log Penerbangan | Aksa Tech Integrated Portal",
  description: "Pencatatan riwayat penerbangan drone, jam take-off, landing, durasi, misi, dan nomor baterai",
}

export default async function FlightLogPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  // Khusus role STAFF (Engineer/Pilot), PM, GUEST, dan USER
  if (
    session.user.role !== "STAFF" && 
    session.user.role !== "PM" && 
    session.user.role !== "GUEST" &&
    session.user.role !== "USER"
  ) {
    if (session.user.role === "ADMIN") {
      redirect("/admin")
    }
    redirect("/dashboard")
  }

  const userRole = session.user.role as "STAFF" | "PM" | "GUEST" | "USER"
  const userMatra = (session.user as any).matra || null
  const isSupervisor = userRole === "PM"
  const isGuest = userRole === "GUEST"
  const isUser = userRole === "USER"

  const now = new Date()
  const todayStr = getDateStringWIB(now)
  const thirtyDaysAgo = new Date(now)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29)
  const startStr = getDateStringWIB(thirtyDaysAgo)

  // Fetch data awal secara paralel
  const [dronesRes, flightLogsRes] = await Promise.all([
    getDrones(),
    getDroneFlightLogs({ startDate: startStr, endDate: todayStr }),
  ])

  const initialDrones = dronesRes.success && dronesRes.data ? dronesRes.data : []
  const initialLogs = flightLogsRes.success && flightLogsRes.data ? flightLogsRes.data : []

  return (
    <div className="relative min-h-screen bg-slate-50/60 font-sans">
      {/* Background Ornaments: Aerospace Dot-Grid & Ambient Blue Glow */}
      <div 
        className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:radial-gradient(#0B2545_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none fixed -top-40 right-0 w-[32rem] h-[32rem] rounded-full bg-[#1F77C5]/12 blur-3xl" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none fixed top-1/2 -left-32 w-96 h-96 rounded-full bg-sky-400/8 blur-3xl" 
        aria-hidden="true" 
      />

      {/* Orbital Radar Rings Decoration */}
      <div 
        className="pointer-events-none fixed -top-24 right-12 w-96 h-96 rounded-full border border-blue-200/35" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none fixed -top-40 right-0 w-[34rem] h-[34rem] rounded-full border border-blue-100/25" 
        aria-hidden="true" 
      />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-5 sm:space-y-6 animate-fade-in pb-12">
        {/* Seamless Clean Header */}
        <PageHeader
          title="Log Penerbangan"
          icon={PlaneTakeoff}
          extraBadge={userMatra ? <MatraBadge matra={userMatra} size="sm" /> : undefined}
          description="Pencatatan riwayat setiap penerbangan drone: jam take-off, jam landing, total durasi, tipe misi, dan nomor baterai unit."
        />

        {/* Client Flight Log Container */}
        <FlightLogContainer
          userRole={userRole}
          userMatra={userMatra}
          currentUserId={session.user.id}
          initialDrones={initialDrones as any}
          initialLogs={initialLogs as any}
          initialStartDate={startStr}
          initialEndDate={todayStr}
          todayStr={todayStr}
        />
      </div>
    </div>
  )
}
