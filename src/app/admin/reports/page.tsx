import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ReportsBoard } from "./components/reports-board"
import { getUsersForOverride } from "@/actions/admin-attendance"
import { FileSpreadsheet } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"

export const metadata = {
  title: "Laporan & Rekapitulasi Presensi | HRIS Aksa Tech",
  description: "Kelola data presensi harian, override manual, serta export laporan absensi ke Excel",
}

export default async function ReportsPage() {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') redirect('/dashboard')

  const staffUsers = await getUsersForOverride()

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
          title="Laporan & Rekapitulasi Presensi"
          icon={FileSpreadsheet}
          roleBadge="Administrator"
          badgeTheme="purple"
          description="Pantau presensi harian seluruh karyawan, lakukan koreksi manual, dan unduh rekap absensi (.xlsx)."
        />

        {/* Reports Board Component */}
        <ReportsBoard staffUsers={staffUsers} />
      </div>
    </div>
  )
}
