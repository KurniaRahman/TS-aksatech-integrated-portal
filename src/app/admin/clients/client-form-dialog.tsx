"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient, updateClient } from "./actions"
import { Loader2, Building2, UserPlus, ShieldCheck, Info } from "lucide-react"

type Client = {
  id: string
  full_name: string
  email: string
  role: string
  matra?: string | null
  is_active: boolean
}

export function ClientFormDialog({
  open,
  onOpenChange,
  clientToEdit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientToEdit?: Client | null
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formDataCache, setFormDataCache] = useState<FormData | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>("USER")

  useEffect(() => {
    setError(null)
    if (clientToEdit) {
      setSelectedRole(clientToEdit.role || "USER")
    } else {
      setSelectedRole("USER")
    }
  }, [clientToEdit, open])

  const onSubmitRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password && password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok")
      return
    }

    if (clientToEdit) {
      setFormDataCache(formData)
      setShowConfirm(true)
    } else {
      executeSubmit(formData)
    }
  }

  const executeSubmit = async (formData: FormData) => {
    setLoading(true)
    setError(null)

    try {
      let res
      if (clientToEdit) {
        res = await updateClient(clientToEdit.id, formData)
      } else {
        res = await createClient(formData)
      }

      if (res.error) {
        setError(res.error)
      } else {
        onOpenChange(false)
      }
    } catch {
      setError("Terjadi kesalahan jaringan atau server")
    } finally {
      setLoading(false)
      setShowConfirm(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xl relative max-w-lg max-h-[90vh] overflow-y-auto">
          {/* Top Stripe Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B2545] via-[#1F77C5] to-sky-400" />

          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-blue-50 text-[#1F77C5] border border-blue-100">
                {clientToEdit ? <Building2 className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
              </span>
              <DialogTitle className="text-xl font-extrabold text-slate-800">
                {clientToEdit ? "Perbarui Akun Klien" : "Tambah Klien / Mitra Baru"}
              </DialogTitle>
            </div>
            <p className="text-xs text-slate-500">
              {clientToEdit
                ? "Perbarui informasi nama klien/perusahaan atau reset kata sandi akses."
                : "Daftarkan akun klien/mitra eksternal untuk hak akses pantau logbook drone dan portal Aksa Tech."}
            </p>
          </DialogHeader>

          <form onSubmit={onSubmitRequest} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Nama Klien / Perusahaan / PIC
              </label>
              <Input
                name="fullName"
                defaultValue={clientToEdit?.full_name}
                required
                placeholder="Contoh: PT Mitra Dirgantara (PIC: Hendra)"
                onInvalid={(e) => {
                  if (e.currentTarget.validity.valueMissing) {
                    e.currentTarget.setCustomValidity("Silakan masukkan nama klien atau perusahaan.")
                  }
                }}
                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                className="rounded-xl border-slate-200 focus:border-[#1F77C5] text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Email Akun Akses
              </label>
              <Input
                name="email"
                type="email"
                defaultValue={clientToEdit?.email}
                required
                placeholder="client@perusahaan.com"
                onInvalid={(e) => {
                  const target = e.currentTarget
                  if (target.validity.valueMissing) {
                    target.setCustomValidity("Silakan masukkan alamat email akun.")
                  } else if (target.validity.typeMismatch) {
                    target.setCustomValidity("Format email tidak valid. Harap sertakan tanda '@'")
                  } else {
                    target.setCustomValidity("Format alamat email belum sesuai.")
                  }
                }}
                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                className="rounded-xl border-slate-200 text-sm focus:border-[#1F77C5]"
              />
              {clientToEdit && (
                <p className="text-[11px] text-slate-400">Pastikan alamat email aktif untuk akses login klien.</p>
              )}
            </div>

            {/* Pemilihan Jenis Peran Klien */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Jenis / Peran Klien
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedRole("USER")}
                  className={`flex flex-col items-start p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedRole === "USER"
                      ? "bg-sky-50/90 border-[#1F77C5] ring-2 ring-[#1F77C5]/20 shadow-xs"
                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <ShieldCheck className={`w-4 h-4 ${selectedRole === "USER" ? "text-[#1F77C5]" : "text-slate-400"}`} />
                    <span>User (Matra TNI)</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                    Personel resmi TNI (AU/AL/AD) dengan hak akses armada & lambang Matra.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("GUEST")}
                  className={`flex flex-col items-start p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedRole === "GUEST"
                      ? "bg-indigo-50/90 border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs"
                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <Building2 className={`w-4 h-4 ${selectedRole === "GUEST" ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>Guest (Mitra)</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                    Perusahaan rekanan, auditor, atau mitra proyek eksternal lain.
                  </p>
                </button>
              </div>
              <input type="hidden" name="role" value={selectedRole} />
            </div>

            {/* Input Matra (Hanya untuk Role USER Matra TNI) */}
            {selectedRole === "USER" && (
              <div className="space-y-1.5 animate-fade-in">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Matra Institusi TNI</span>
                  <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">Wajib</span>
                </label>
                <select
                  name="matra"
                  defaultValue={clientToEdit?.matra || "TNI-AU"}
                  required
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1F77C5]/20 focus:border-[#1F77C5] outline-none font-semibold bg-white text-slate-800"
                >
                  <option value="TNI-AU">TNI-AU (Angkatan Udara)</option>
                  <option value="TNI-AL">TNI-AL (Angkatan Laut)</option>
                  <option value="TNI-AD">TNI-AD (Angkatan Darat)</option>
                </select>
                <p className="text-[11px] text-slate-400">
                  User TNI hanya dapat memantau katalog armada dan logbook milik matra yang dipilih.
                </p>
              </div>
            )}

            {/* Hak Akses Info Banner */}
            {selectedRole === "USER" ? (
              <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200 flex items-start space-x-3">
                <ShieldCheck className="w-4 h-4 text-[#1F77C5] mt-0.5 flex-shrink-0" />
                <div className="text-xs text-sky-950 leading-relaxed">
                  <span className="font-bold block text-slate-900">Peran Akun: User (Klien Matra TNI)</span>
                  Akses terikat langsung dengan armada drone sesuai matra terpilih, dilengkapi visual co-branding resmi TNI dan lambang emblem avatar.
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-start space-x-3">
                <Info className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-indigo-900 leading-relaxed">
                  <span className="font-bold block text-indigo-950">Peran Akun: Guest (Mitra Eksternal)</span>
                  Akun pihak perusahaan rekanan atau pengamat eksternal non-TNI. Tidak terikat matra tertentu dan tidak memiliki hak akses data internal karyawan/absensi.
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {clientToEdit ? "Password Baru (Opsional)" : "Password Akun"}
              </label>
              <Input
                name="password"
                type="password"
                required={!clientToEdit}
                placeholder={clientToEdit ? "Kosongkan jika tidak ingin mengubah" : "Minimal 6 karakter"}
                onInvalid={(e) => {
                  if (e.currentTarget.validity.valueMissing) {
                    e.currentTarget.setCustomValidity("Silakan masukkan password akun.")
                  }
                }}
                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                className="rounded-xl border-slate-200 focus:border-[#1F77C5] text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Konfirmasi Password
              </label>
              <Input
                name="confirmPassword"
                type="password"
                required={!clientToEdit}
                placeholder={clientToEdit ? "Konfirmasi jika password baru diisi" : "Ketik ulang password"}
                className="rounded-xl border-slate-200 focus:border-[#1F77C5] text-sm"
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-medium border border-rose-200">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="rounded-xl text-xs sm:text-sm font-semibold border-slate-200 hover:bg-slate-50"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-[#103D6D] to-[#1F77C5] hover:from-[#0B2545] hover:to-[#155b99] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {clientToEdit ? "Simpan Perubahan" : "Buat Akun Klien"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Updates */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xl relative max-w-md">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B2545] via-[#1F77C5] to-sky-400" />
          <AlertDialogHeader className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1F77C5] flex items-center justify-center border border-blue-100 mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <AlertDialogTitle className="text-xl font-extrabold text-slate-800">
              Konfirmasi Perubahan Akun
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-slate-500 leading-relaxed">
              Apakah Anda yakin ingin memperbarui data akun klien <strong>{clientToEdit?.full_name}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 pt-2">
            <AlertDialogCancel
              disabled={loading}
              className="rounded-xl text-xs sm:text-sm font-semibold border-slate-200"
            >
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={loading}
              onClick={(e) => {
                e.preventDefault()
                if (formDataCache) executeSubmit(formDataCache)
              }}
              className="bg-gradient-to-r from-[#103D6D] to-[#1F77C5] hover:from-[#0B2545] hover:to-[#155b99] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ya, Simpan"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
