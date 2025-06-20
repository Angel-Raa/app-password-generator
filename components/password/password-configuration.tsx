import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"
import { PasswordLengthSlider } from "./password-length-slider"
import { CharacterOptions } from "./character-options"
import { AdditionalOptions } from "./additional-options"
import type { PasswordOptions } from "@/types/password"

interface PasswordConfigurationProps {
  length: number[]
  onLengthChange: (value: number[]) => void
  options: PasswordOptions
  onOptionChange: (key: keyof PasswordOptions, value: boolean) => void
}

export const PasswordConfiguration = ({
  length,
  onLengthChange,
  options,
  onOptionChange,
}: PasswordConfigurationProps) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-blue-600" />
          Opciones de Configuración
        </h3>

        <PasswordLengthSlider length={length} onLengthChange={onLengthChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CharacterOptions options={options} onOptionChange={onOptionChange} />
          <AdditionalOptions options={options} onOptionChange={onOptionChange} />
        </div>
      </CardContent>
    </Card>
  )
}
