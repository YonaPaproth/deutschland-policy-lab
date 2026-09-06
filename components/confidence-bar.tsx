interface ConfidenceBarProps {
  confidence: number | "unknown"
  className?: string
  lang?: "de" | "en"
}

function getBarColor(value: number): string {
  if (value > 70) return "bg-green-500"
  if (value >= 40) return "bg-yellow-400"
  return "bg-red-400"
}

function getTextColor(value: number): string {
  if (value > 70) return "text-green-700"
  if (value >= 40) return "text-yellow-700"
  return "text-red-600"
}

export default function ConfidenceBar({ confidence, className = "", lang = "en" }: ConfidenceBarProps) {
  const isUnknown = confidence === "unknown"
  const value = isUnknown ? 0 : confidence
  const label = lang === "de" ? "Konfidenz" : "Confidence"

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        <span
          className={`text-xs font-semibold tabular-nums ${
            isUnknown ? "text-slate-400" : getTextColor(value)
          }`}
        >
          {isUnknown ? "?" : `${value}%`}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        {isUnknown ? (
          <div
            className="h-full rounded-full bg-slate-300"
            style={{ width: "100%" }}
            aria-label="Confidence unknown"
          >
            <div className="h-full w-full animate-pulse bg-slate-300" />
          </div>
        ) : (
          <div
            className={`h-full rounded-full transition-all duration-300 ${getBarColor(value)}`}
            style={{ width: `${value}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Confidence: ${value}%`}
          />
        )}
      </div>
    </div>
  )
}
