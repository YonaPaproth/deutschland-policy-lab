type BadgeType = "FACT" | "EVIDENCE" | "ASSUMPTION" | "PROPOSAL" | "UNCERTAINTY"

const badgeStyles: Record<BadgeType, string> = {
  FACT: "bg-green-100 text-green-800",
  EVIDENCE: "bg-blue-100 text-blue-800",
  ASSUMPTION: "bg-yellow-100 text-yellow-800",
  PROPOSAL: "bg-slate-100 text-slate-800",
  UNCERTAINTY: "bg-orange-100 text-orange-800",
}

interface EvidenceBadgeProps {
  type: BadgeType
  className?: string
}

export function EvidenceBadge({ type, className = "" }: EvidenceBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${badgeStyles[type]} ${className}`}
    >
      {type}
    </span>
  )
}

type EvidenceStrength = "very-low" | "low" | "medium" | "high"

const strengthStyles: Record<EvidenceStrength, { dot: string; label: string; bg: string; text: string }> = {
  "very-low": {
    dot: "bg-slate-400",
    label: "Very Low",
    bg: "bg-slate-100",
    text: "text-slate-600",
  },
  low: {
    dot: "bg-yellow-500",
    label: "Low",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
  },
  medium: {
    dot: "bg-blue-500",
    label: "Medium",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  high: {
    dot: "bg-green-600",
    label: "High",
    bg: "bg-green-50",
    text: "text-green-700",
  },
}

interface EvidenceStrengthBadgeProps {
  evidenceStrength: EvidenceStrength
  className?: string
}

export function EvidenceStrengthBadge({ evidenceStrength, className = "" }: EvidenceStrengthBadgeProps) {
  const styles = strengthStyles[evidenceStrength]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-xs font-medium ${styles.bg} ${styles.text} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} aria-hidden="true" />
      {styles.label} evidence
    </span>
  )
}
