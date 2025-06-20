import type { PasswordStrength } from "@/types/password"

export const calculatePasswordStrength = (password: string): PasswordStrength => {
  let score = 0

  // Criterios de evaluación
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (password.length >= 16) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  // Bonificaciones adicionales
  if (password.length >= 20) score++
  if (/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)) score++

  if (score <= 3) {
    return { text: "Débil", color: "bg-red-400" }
  } else if (score <= 6) {
    return { text: "Media", color: "bg-yellow-400" }
  } else {
    return { text: "Fuerte", color: "bg-green-400" }
  }
}
