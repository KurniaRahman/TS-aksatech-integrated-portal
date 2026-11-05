import { getClients } from "./actions"
import { ClientTable } from "./client-table"
import { Building2, AlertCircle } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"

export const metadata = {
  title: "Manajemen Klien | HRIS Aksa Tech",
  description: "Kelola akun klien dan mitra eksternal untuk otorisasi akses portal dan logbook drone PT Aksa Tech",
}

export default async function AdminClientsPage() {
  const { data: clients, error } = await getClients()

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
          title="Manajemen Klien"
          titleHighlight="& Mitra Eksternal"
          icon={Building2}
          roleBadge="Administrator"
          badgeTheme="purple"
          description="Kelola akun tamu dan mitra bisnis PT Aksa Tech untuk akses monitoring logbook penerbangan drone."
        />

        {/* Content Section */}
        {error ? (
          <div className="bg-rose-50 text-rose-700 p-5 rounded-2xl border border-rose-200/80 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
            <p className="text-sm font-medium">Gagal memuat data klien: {error}</p>
          </div>
        ) : (
          <ClientTable clients={clients || []} />
        )}
      </div>
    </div>
  )
}
