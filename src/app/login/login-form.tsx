"use client"

import { useState } from "react"
import { loginAction } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle, 
  ArrowRight 
} from "lucide-react"

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    try {
      const res = await loginAction(formData)
      if (res?.error) {
        setError(res.error)
        setLoading(false)
      }
    } catch (err: any) {
      if (err?.digest?.startsWith("NEXT_REDIRECT")) {
        // Biarkan loading tetap true karena sedang proses transisi redirect ke dashboard
        throw err
      }
      setError("Gagal terhubung ke server. Periksa koneksi Anda.")
      setLoading(false)
    }
  }

  const handleEmailInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    if (target.validity.valueMissing) {
      target.setCustomValidity("Silakan masukkan alamat email akun Anda.")
    } else if (target.validity.typeMismatch) {
      target.setCustomValidity("Format email tidak valid. Harap sertakan tanda '@' (contoh: nama@aksatech.com)")
    } else {
      target.setCustomValidity("Format alamat email belum sesuai.")
    }
  }

  const handlePasswordInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    if (target.validity.valueMissing) {
      target.setCustomValidity("Silakan masukkan kata sandi akun Anda.")
    } else {
      target.setCustomValidity("Kata sandi belum sesuai.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        {/* Input Email / Username */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1F77C5] transition-colors pointer-events-none">
            <Mail className="w-5 h-5" />
          </div>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="Masukkan alamat email akun" 
            required 
            autoComplete="email"
            onInvalid={handleEmailInvalid}
            onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
            className="rounded-full pl-12 pr-6 py-6 border-slate-200/90 bg-white/80 focus:bg-white focus:border-[#1F77C5] focus:ring-4 focus:ring-[#1F77C5]/15 text-slate-800 placeholder:text-slate-400 text-sm sm:text-base shadow-2xs transition-all duration-200"
          />
        </div>

        {/* Input Password dengan Toggle Show/Hide */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1F77C5] transition-colors pointer-events-none">
            <Lock className="w-5 h-5" />
          </div>
          <Input 
            id="password" 
            name="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Masukkan kata sandi akun" 
            required 
            autoComplete="current-password"
            onInvalid={handlePasswordInvalid}
            onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
            className="rounded-full pl-12 pr-12 py-6 border-slate-200/90 bg-white/80 focus:bg-white focus:border-[#1F77C5] focus:ring-4 focus:ring-[#1F77C5]/15 text-slate-800 placeholder:text-slate-400 text-sm sm:text-base shadow-2xs transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      
      {/* Error Alert Box */}
      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in duration-200 shadow-2xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
          <span className="font-medium leading-relaxed">{error}</span>
        </div>
      )}

      {/* Submit Button (Glassmorphic Elevated Tactical Button) */}
      <div className="pt-2">
        <Button 
          type="submit" 
          className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#1F77C5] via-[#1A6CB3] to-[#12528D] hover:from-[#1766A7] hover:via-[#145792] hover:to-[#0D406E] active:scale-[0.98] py-6 px-6 text-base font-extrabold text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 border border-sky-300/30 transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
          disabled={loading}
        >
          {/* Subtle Sheen Shine Animation on Hover */}
          <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            <>
              <span className="tracking-wide">Log In</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 group-hover:translate-x-1 transition-all duration-200">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
