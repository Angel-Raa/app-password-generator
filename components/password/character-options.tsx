import { Checkbox } from "@/components/ui/checkbox"
import type { PasswordOptions } from "@/types/password"

interface CharacterOptionsProps {
  options: PasswordOptions
  onOptionChange: (key: keyof PasswordOptions, value: boolean) => void
}

export const CharacterOptions = ({ options, onOptionChange }: CharacterOptionsProps) => {
  const characterOptions = [
    { key: "uppercase" as const, label: "Mayúsculas (A-Z)" },
    { key: "lowercase" as const, label: "Minúsculas (a-z)" },
    { key: "numbers" as const, label: "Números (0-9)" },
    { key: "symbols" as const, label: "Símbolos (!@#$%^&*)" },
  ]

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-700">Incluir caracteres:</h4>
      {characterOptions.map(({ key, label }) => (
        <div key={key} className="flex items-center space-x-3">
          <Checkbox id={key} checked={options[key]} onCheckedChange={(checked) => onOptionChange(key, !!checked)} />
          <label htmlFor={key} className="text-sm text-gray-600 cursor-pointer">
            {label}
          </label>
        </div>
      ))}
    </div>
  )
}
