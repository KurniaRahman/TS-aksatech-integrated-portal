import React from "react"
import { LucideIcon } from "lucide-react"

export interface PageHeaderProps {
  title: string
  titleHighlight?: string
  icon: LucideIcon
  roleBadge?: string | null
  badgeTheme?: "blue" | "purple" | "emerald" | "sky"
  extraBadge?: React.ReactNode
  description?: string
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  titleHighlight,
  icon: Icon,
  roleBadge,
  badgeTheme = "blue",
  extraBadge,
  description,
  actions,
  className = "",
}: PageHeaderProps) {
  const badgeClasses = {
    blue: "bg-blue-50/80 text-[#1F77C5] border-blue-200/70",
    purple: "bg-purple-50/80 text-purple-700 border-purple-200/70",
    emerald: "bg-emerald-50/80 text-emerald-700 border-emerald-200/70",
    sky: "bg-sky-50/80 text-sky-700 border-sky-200/70",
  }[badgeTheme]

  return (
    <div
      className={`bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-6 shadow-[0_4px_20px_-4px_rgba(31,119,197,0.06)] border border-blue-100/90 relative overflow-hidden ${className}`}
    >
      {/* Aksen Top Stripe Gradient Brand Aksa Tech */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B2545] via-[#1F77C5] to-sky-400" />

      {/* Ornamen Grafis Lingkaran Halus */}
      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-gradient-to-br from-blue-100/30 to-sky-50/20 rounded-full blur-xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 text-[#1F77C5] border border-blue-100/80 shadow-2xs flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1F77C5]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-2xl font-black text-slate-800 tracking-tight">
                {title}{" "}
                {titleHighlight && (
                  <span className="bg-gradient-to-r from-[#0B2545] via-[#1F77C5] to-sky-600 bg-clip-text text-transparent">
                    {titleHighlight}
                  </span>
                )}
              </h1>

              {roleBadge && (
                <span
                  className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold border tracking-wide ${badgeClasses}`}
                >
                  {roleBadge}
                </span>
              )}

              {extraBadge}
            </div>

            {description && (
              <p className="hidden sm:block text-xs sm:text-sm text-slate-500 line-clamp-1 mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
