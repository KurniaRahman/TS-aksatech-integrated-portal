import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ActivitiesContainer } from "./components/activities-container"
import { 
  getActivityLogs, 
  getTeamActivityLogs, 
  getTeamMembersForFilter 
} from "@/actions/activity-logs"
import { getDateStringWIB } from "@/lib/attendance-utils"
import { ClipboardList, Users } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"

export const metadata = {
  title: "Log Aktivitas Tim & Harian | HRIS Aksa Tech",
  description: "Catatan tugas harian karyawan PT Aksa Tech Indonesia",
}

export default async function ActivitiesPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  // Khusus role STAFF (Engineer) dan PM. Admin dan Magang diarahkan kembali ke dashboard.
  if (session.user.role !== "STAFF" && session.user.role !== "PM") {
    if (session.user.role === "ADMIN") {
      redirect("/admin")
    }
    redirect("/dashboard")
  }

  const userRole = session.user.role as "STAFF" | "PM"
  const isSupervisor = userRole === "PM"
  
  const now = new Date()
  const todayStr = getDateStringWIB(now)
  const sevenDaysAgo = new Date(now)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
  const startStr = getDateStringWIB(sevenDaysAgo)

  // Fetch personal logs for initial 7-day range
  const personalRes = await getActivityLogs(startStr, todayStr)
  const initialPersonalLogs = personalRes.success && personalRes.data ? personalRes.data : []

  // Fetch team logs and member list if PM
  let initialTeamLogs: any[] = []
  let teamMembers: any[] = []

  if (isSupervisor) {
    const [teamRes, membersRes] = await Promise.all([
      getTeamActivityLogs(startStr, todayStr),
      getTeamMembersForFilter(),
    ])
    if (teamRes.success && teamRes.data) {
      initialTeamLogs = teamRes.data
    }
    if (membersRes.success && membersRes.data) {
      teamMembers = membersRes.data
    }
  }

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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-5 sm:space-y-6 animate-fade-in pb-8">
        {/* Seamless Clean Header */}
        <PageHeader
          title={isSupervisor ? "Log Aktivitas Tim" : "Log Aktivitas Harian"}
          icon={isSupervisor ? Users : ClipboardList}
          roleBadge={
            isSupervisor
              ? userRole === "PM"
                ? "Project Manager"
                : "Administrator"
              : "Engineer"
          }
          description={
            isSupervisor
              ? "Pantau dan review catatan aktivitas harian serta progres pengerjaan tugas seluruh anggota tim."
              : "Catat tugas dan progres pekerjaan yang Anda selesaikan setiap harinya untuk dokumentasi performa kerja."
          }
        />

        {/* Activity Log Board View Container */}
        <ActivitiesContainer
          userRole={userRole}
          initialDate={todayStr}
          initialStartDate={startStr}
          initialEndDate={todayStr}
          initialPersonalLogs={initialPersonalLogs}
          initialTeamLogs={initialTeamLogs}
          teamMembers={teamMembers}
        />
      </div>
    </div>
  )
}
