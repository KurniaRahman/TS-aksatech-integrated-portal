import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { UserHistoryView } from "./components/user-history-view"
import { CalendarDays } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"

export const metadata = {
  title: "Riwayat Presensi | HRIS Aksa Tech",
  description: "Rekap data kehadiran dan jam kerja karyawan",
}

export default async function HistoryPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const roleName = 
    session.user.role === 'ADMIN' ? 'Administrator' : 
    session.user.role === 'PM' ? 'Project Manager' : 
    session.user.role === 'MAGANG' ? 'Magang' : 
    'Engineer'

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
          title="Riwayat & Rekap Presensi"
          icon={CalendarDays}
          roleBadge={roleName}
          description="Pantau akumulasi kehadiran, jam kerja efektif harian, serta lembur yang telah tercatat dan disetujui."
        />

        {/* User History View Component */}

        {/* User History View Component */}
        <UserHistoryView />
      </div>
    </div>
  )
}
