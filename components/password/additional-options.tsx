import { Checkbox } from "@/components/ui/checkbox"
import type { PasswordOptions } from "@/types/password"

interface AdditionalOptionsProps {
  options: PasswordOptions
  onOptionChange: (key: keyof PasswordOptions, value: boolean) => void
}

export const AdditionalOptions = ({ options, onOptionChange }: AdditionalOptionsProps) => {
  const additionalOptions = [
    { key: "excludeSimilar" as const, label: "Excluir caracteres similares" },
    { key: "excludeAmbiguous" as const, label: "Excluir caracteres ambiguos" },
    { key: "noDuplicate" as const, label: "Sin caracteres duplicados" },
  ]

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-700">Opciones adicionales:</h4>
      {additionalOptions.map(({ key, label }) => (
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
