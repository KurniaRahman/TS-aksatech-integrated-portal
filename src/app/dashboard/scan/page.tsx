import { ScannerClient } from "./scanner-client"
import { ScanLine, Navigation } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"

export default function ScanPage() {
  return (
    <div className="relative min-h-full p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
      
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
        title="Scan Presensi"
        titleHighlight="QR Code"
        icon={ScanLine}
        roleBadge="Presensi Digital"
        extraBadge={
          <span className="hidden sm:inline-flex text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200 items-center gap-1">
            <Navigation className="w-3 h-3 text-[#1F77C5]" />
            Geofence GPS Aktif (100m)
          </span>
        }
        description="Pastikan Anda berada di area kantor PT Aksa Tech. Arahkan kamera ke QR Code resmi kantor untuk memvalidasi kehadiran."
      />

      {/* 2. Main Scanner & 3D Map Card (Dominan Putih Bersih - Opsi A 2 Kolom) */}
      <div className="bg-white rounded-3xl shadow-[0_4px_25px_-5px_rgba(31,119,197,0.06)] border border-slate-200/90 overflow-hidden relative p-5 sm:p-7 lg:p-8">
        <div className="w-full">
          <ScannerClient redirectUrl="/dashboard" />
        </div>
      </div>

    </div>
  )
}
