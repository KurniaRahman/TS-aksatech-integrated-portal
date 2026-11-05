import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma as db } from "@/lib/prisma"
import { OvertimeApprovalBoard } from "@/components/overtime-approval-board"
import { Clock } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"

export default async function AdminOvertimePage() {
  const session = await auth()
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  const overtimes = await db.overtime.findMany({
    include: {
      user: {
        select: {
          full_name: true,
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
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
        title="Manajemen"
        titleHighlight="Lembur"
        icon={Clock}
        roleBadge="Administrator"
        badgeTheme="purple"
        description="Kelola, setujui, tolak, atau pantau seluruh tiket pengajuan lembur karyawan PT Aksa Tech."
      />

      {/* 2. Board Approval Lembur */}
      <div className="w-full">
        <OvertimeApprovalBoard overtimes={overtimes} />
      </div>

    </div>
  )
}
