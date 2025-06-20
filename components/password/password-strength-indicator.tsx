import type { PasswordStrength } from "@/types/password"

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength
}

export const PasswordStrengthIndicator = ({ strength }: PasswordStrengthIndicatorProps) => {
  const getStrengthLevel = () => {
    switch (strength.text) {
      case "Fuerte":
        return 5
      case "Media":
        return 3
      default:
        return 1
    }
  }

  const strengthLevel = getStrengthLevel()

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i < strengthLevel ? strength.color : "bg-gray-600"}`} />
        ))}
      </div>
      <span className="text-xs text-green-400 font-medium">{strength.text}</span>
    </div>
  )
}
