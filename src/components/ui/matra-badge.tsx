import React from "react"
import Image from "next/image"

export type MatraType = "TNI-AU" | "TNI-AL" | "TNI-AD" | string

interface MatraBadgeProps {
  matra?: MatraType | null
  size?: "sm" | "md" | "lg"
  showLogo?: boolean
  className?: string
}

const MATRA_CONFIG: Record<
  string,
  {
    name: string
    logo: string
    badgeClass: string
    textClass: string
  }
> = {
  "TNI-AU": {
    name: "TNI-AU",
    logo: "/images/matra/tni-au.png",
    badgeClass: "bg-sky-50/90 text-sky-800 border-sky-200/80 hover:bg-sky-100/70",
    textClass: "text-sky-800 font-bold",
  },
  "TNI-AL": {
    name: "TNI-AL",
    logo: "/images/matra/tni-al.png",
    badgeClass: "bg-blue-50/90 text-[#0B2545] border-blue-200/80 hover:bg-blue-100/70",
    textClass: "text-[#0B2545] font-bold",
  },
  "TNI-AD": {
    name: "TNI-AD",
    logo: "/images/matra/tni-ad.png",
    badgeClass: "bg-emerald-50/90 text-emerald-800 border-emerald-200/80 hover:bg-emerald-100/70",
    textClass: "text-emerald-800 font-bold",
  },
}

export function MatraBadge({
  matra,
  size = "sm",
  showLogo = true,
  className = "",
}: MatraBadgeProps) {
  if (!matra) return null

  const config = MATRA_CONFIG[matra] || {
    name: matra,
    logo: "",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    textClass: "text-slate-700 font-medium",
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] gap-1.5",
    md: "px-2.5 py-1 text-xs gap-2",
    lg: "px-3 py-1.5 text-sm gap-2.5 font-semibold",
  }

  const logoSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-2xs font-semibold tracking-wide transition-colors ${config.badgeClass} ${sizeClasses[size]} ${className}`}
    >
      {showLogo && config.logo && (
        <span className="relative flex-shrink-0 inline-block overflow-hidden rounded-full">
          <Image
            src={config.logo}
            alt={config.name}
            width={logoSizes[size]}
            height={logoSizes[size]}
            className="object-contain"
          />
        </span>
      )}
      <span className={config.textClass}>{config.name}</span>
    </span>
  )
}
