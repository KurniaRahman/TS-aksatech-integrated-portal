import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma as db } from "@/lib/prisma"
import { OvertimeForm } from "./components/overtime-form"
import { UserOvertimeHistory } from "./components/user-overtime-history"
import { Clock } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"

export default async function OvertimesPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  // Fetch overtime history for this user
  const overtimes = await db.overtime.findMany({
    where: {
      user_id: session.user.id
    },
    orderBy: {
      request_date: 'desc'
    },
    take: 15
  })

  return (
    <div className="relative min-h-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
      
      {/* Ornamen Ambient Background & Aerospace Radar Rings */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-gradient-to-br from-[#1F77C5]/12 via-sky-300/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-96 left-0 w-[420px] h-[420px] bg-gradient-to-tr from-sky-400/8 via-[#1F77C5]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      {/* Delicate Aerospace Orbital Radar Rings */}
      <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full border border-blue-200/35 pointer-events-none -z-10"></div>
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full border border-blue-100/25 pointer-events-none -z-10"></div>

      {/* Subtle Aerospace Tech Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1F77C515_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10 opacity-70"></div>

      {/* 1. Seamless Clean Header */}
      <PageHeader
        title="Pengajuan Lembur"
        titleHighlight="Kerja"
        icon={Clock}
        roleBadge="Lembur Karyawan"
        extraBadge={
          <span className="hidden sm:inline-flex text-[11px] font-semibold text-[#1F77C5] bg-blue-50/80 px-2.5 py-0.5 rounded-full border border-blue-100">
            Weekday maks 3j • Weekend maks 8j
          </span>
        }
        description="Ajukan surat tugas lembur hari kerja atau akhir pekan untuk ditinjau oleh Project Manager."
      />

      {/* 2. Main Grid: Formulir (Kiri) + Riwayat (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Kolom Kiri: Form Pengajuan */}
        <div className="lg:col-span-5">
          <OvertimeForm />
        </div>

        {/* Kolom Kanan: Riwayat Lembur */}
        <div className="lg:col-span-7">
          <UserOvertimeHistory overtimes={overtimes} />
        </div>
      </div>

    </div>
  )
}
