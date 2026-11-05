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
    blue: "bg-blue-50 text-[#1F77C5] border-blue-200/70",
    purple: "bg-purple-50 text-purple-700 border-purple-200/70",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    sky: "bg-sky-50 text-sky-700 border-sky-200/70",
  }[badgeTheme]

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-200/80 ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 text-[#1F77C5] border border-blue-100 shadow-2xs flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1F77C5]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">
              {title}{" "}
              {titleHighlight && (
                <span className="bg-gradient-to-r from-[#0B2545] via-[#1F77C5] to-sky-600 bg-clip-text text-transparent">
                  {titleHighlight}
                </span>
              )}
            </h1>

            {roleBadge && (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold border tracking-wide ${badgeClasses}`}
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
  )
}
