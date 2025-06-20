"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { generateSecurePassword } from "@/lib/password/password-generator"
import { calculatePasswordStrength } from "@/lib/password/password-strength"
import type { PasswordOptions, PasswordStrength } from "@/types/password"

export const usePasswordGenerator = (options: PasswordOptions, length: number[]) => {
  const [password, setPassword] = useState("1hsgsy#a")
  const { toast } = useToast()

  const generatePassword = useCallback(() => {
    const newPassword = generateSecurePassword(options, length[0])
    setPassword(newPassword)
  }, [options, length])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(password)
      toast({
        title: "¡Copiado!",
        description: "La contraseña se ha copiado al portapapeles",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar la contraseña",
        variant: "destructive",
      })
    }
  }, [password, toast])

  const getPasswordStrength = useCallback((): PasswordStrength => {
    return calculatePasswordStrength(password)
  }, [password])

  return {
    password,
    generatePassword,
    copyToClipboard,
    getPasswordStrength,
  }
}
