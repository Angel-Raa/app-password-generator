"use client"

import { Slider } from "@/components/ui/slider"

interface PasswordLengthSliderProps {
  length: number[]
  onLengthChange: (value: number[]) => void
}

export const PasswordLengthSlider = ({ length, onLengthChange }: PasswordLengthSliderProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">Longitud de la contraseña</label>
        <span className="text-sm font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">{length[0]}</span>
      </div>
      <Slider value={length} onValueChange={onLengthChange} max={50} min={4} step={1} className="w-full" />
      <div className="flex justify-between text-xs text-gray-500">
        <span>6</span>
        <span>40</span>
      </div>
    </div>
  )
}
