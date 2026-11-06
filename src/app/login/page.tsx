import { LoginForm } from "./login-form"
import { ShieldCheck, Sparkles, Building2 } from "lucide-react"

export const metadata = {
  title: "Masuk | Integrated Defense UAV Portal",
  description: "Satu portal terpadu untuk monitoring armada drone, log perawatan & penerbangan, serta layanan operasional.",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>
}) {
  const { reason } = await searchParams

  return (
    <div className="flex min-h-screen w-full bg-slate-50/60 relative overflow-hidden">
      {/* Ornamen Ambient Background (Desktop & Mobile) untuk Menghidupkan Efek Frosted Glassmorphism */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-gradient-to-br from-[#1F77C5]/12 via-sky-400/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-gradient-to-tr from-sky-400/10 via-[#1F77C5]/6 to-indigo-500/6 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-gradient-to-tr from-indigo-500/8 via-[#1F77C5]/6 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#1F77C510_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10 opacity-70"></div>

      {/* Left Side - Login Form (Lebar Penuh di Mobile, 50% di Desktop) */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-8 md:w-1/2 lg:px-16 xl:px-24 relative py-8 sm:py-12 md:py-8 min-h-screen">
        
        {/* Top Header Logo: 3 Matra Emblems */}
        <div className="md:absolute md:top-8 md:left-8 lg:left-12 flex items-center justify-between gap-4 mb-6 md:mb-0">
          <div className="flex items-center gap-3 sm:gap-3.5" title="Matra TNI (AU • AL • AD)">
            <img
              src="/images/matra/tni-au.png"
              alt="TNI-AU"
              className="h-9 sm:h-11 w-auto object-contain drop-shadow-xs hover:scale-105 transition-transform"
              title="TNI Angkatan Udara"
            />
            <img
              src="/images/matra/tni-al.png"
              alt="TNI-AL"
              className="h-9 sm:h-11 w-auto object-contain drop-shadow-xs hover:scale-105 transition-transform"
              title="TNI Angkatan Laut"
            />
            <img
              src="/images/matra/tni-ad.png"
              alt="TNI-AD"
              className="h-9 sm:h-11 w-auto object-contain drop-shadow-xs hover:scale-105 transition-transform"
              title="TNI Angkatan Darat"
            />
          </div>
          {/* Badge Khusus Mobile */}
          <span className="md:hidden px-3 py-1 rounded-full text-[11px] font-extrabold uppercase bg-blue-50 text-[#1F77C5] border border-blue-200 shadow-2xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1F77C5] animate-pulse"></span>
            Defense UAV Portal
          </span>
        </div>

        {/* Glassmorphic Form Card Container */}
        <div className="mx-auto w-full max-w-[490px] sm:max-w-[510px] mt-2 sm:mt-4 md:mt-0 bg-white/75 backdrop-blur-xl p-8 sm:p-10 md:p-11 rounded-[32px] border border-white/90 shadow-[0_20px_50px_-12px_rgba(31,119,197,0.14),0_4px_20px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/5 animate-in fade-in duration-300 relative overflow-hidden">
          {/* Subtle Top Glow Highlight */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#1F77C5]/50 to-transparent"></div>

          {/* Mobile Illustration Banner Card */}
          <div className="md:hidden mb-6 relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md shadow-blue-500/5 aspect-[16/9] bg-slate-100">
            <img
              src="/background_login.png"
              alt="Operasional Armada"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Heading Teks Login Rebranded */}
          <div className="mb-7 space-y-2">
            <h2 className="text-xs sm:text-sm font-extrabold text-[#1F77C5] uppercase tracking-wider">
              Integrated Defense UAV Portal
            </h2>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Selamat Datang!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              Portal terpadu untuk monitoring armada drone, log perawatan & penerbangan, serta layanan operasional.
            </p>
          </div>

          {/* Alert Jika Sesi Telah Habis */}
          {reason === "expired" && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start space-x-3 animate-in fade-in duration-200 shadow-2xs backdrop-blur-xs">
              <span className="text-amber-600 font-bold text-base leading-none mt-0.5">⏱️</span>
              <div className="space-y-0.5 text-left">
                <p className="font-bold text-amber-900 text-xs uppercase tracking-wider">
                  Sesi Telah Berakhir
                </p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Demi keamanan akun, sesi login telah berakhir (masa aktif 7 hari). Silakan masuk kembali untuk melanjutkan.
                </p>
              </div>
            </div>
          )}

          {/* Form Interaktif */}
          <LoginForm />

          {/* Footer Security Badges Khusus Mobile */}
          <div className="md:hidden mt-8 pt-5 border-t border-slate-100 text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-50/80 px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Portal Terenkripsi & Aman</span>
            </div>
            <p className="text-[10px] text-slate-400">
              © {new Date().getFullYear()} Powered by PT Aksa Tech
            </p>
          </div>
        </div>

        {/* Desktop Footer Credit (Centered) */}
        <div className="hidden md:flex absolute bottom-6 lg:bottom-8 inset-x-0 justify-center items-center gap-2 text-xs text-slate-400 select-none">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>© {new Date().getFullYear()} Powered by PT Aksa Tech</span>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration (Tetap Penuh di Desktop seperti Semula) */}
      <div className="hidden w-1/2 bg-[#1F77C5] md:block relative">
        <img
          src="/background_login.png"
          alt="Login Illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
