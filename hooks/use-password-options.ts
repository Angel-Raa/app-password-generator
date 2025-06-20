"use client"

import { useState, useCallback } from "react"
import type { PasswordOptions } from "@/types/password"

const defaultOptions: PasswordOptions = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeSimilar: false,
  excludeAmbiguous: false,
  noDuplicate: false,
}

export const usePasswordOptions = () => {
  const [options, setOptions] = useState<PasswordOptions>(defaultOptions)
  const [length, setLength] = useState([12])

  const updateOption = useCallback((key: keyof PasswordOptions, value: boolean) => {
    setOptions((prev) => ({ ...prev, [key]: value }))
  }, [])

  return {
    options,
    updateOption,
    length,
    setLength,
  }
}
