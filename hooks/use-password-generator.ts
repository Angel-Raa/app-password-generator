"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { generateSecurePassword } from "@/lib/password/password-generator"
import { calculatePasswordStrength } from "@/lib/password/password-strength"
import type { PasswordOptions } from "@/types/password"
import { savePassword } from "@/app/actions/password-actions"

export function usePasswordGenerator(options: PasswordOptions, length: number[]) {
  const [password, setPassword] = useState("1hsgsy#a")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const generatePassword = useCallback(() => {
    const newPassword = generateSecurePassword(length[0], options)
    setPassword(newPassword)
  }, [length, options])

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

  const savePasswordToDb = useCallback(
    async (label?: string) => {
      if (!password || password === "1hsgsy#a") {
        toast({
          title: "Error",
          description: "Genera una contraseña antes de guardarla",
          variant: "destructive",
        })
        return
      }

      setIsSaving(true)

      try {
        const result = await savePassword({
          value: password,
          label,
          length: length[0],
          options,
        })

        if (result.success) {
          toast({
            title: "¡Guardado!",
            description: result.message,
          })
        } else {
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error inesperado al guardar la contraseña",
          variant: "destructive",
        })
      } finally {
        setIsSaving(false)
      }
    },
    [password, length, options, toast],
  )

  const getPasswordStrength = useCallback(() => {
    return calculatePasswordStrength(password)
  }, [password])

  return {
    password,
    generatePassword,
    copyToClipboard,
    savePasswordToDb,
    isSaving,
    getPasswordStrength,
  }
}
