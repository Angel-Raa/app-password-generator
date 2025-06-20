import type { PasswordOptions } from "@/types/password"

export const generateSecurePassword = (options: PasswordOptions, length: number): string => {
  const charset = buildCharset(options)

  if (charset.length === 0) {
    throw new Error("Al menos una opción de caracteres debe estar seleccionada")
  }

  let password = ""
  const usedChars = new Set<string>()

  for (let i = 0; i < length; i++) {
    let char: string
    let attempts = 0
    const maxAttempts = charset.length * 2

    do {
      char = charset.charAt(Math.floor(Math.random() * charset.length))
      attempts++

      if (attempts > maxAttempts) {
        // Si no podemos encontrar un carácter único, relajamos la restricción
        break
      }
    } while (options.noDuplicate && usedChars.has(char) && usedChars.size < charset.length)

    if (options.noDuplicate) {
      usedChars.add(char)
    }
    password += char
  }

  return password
}

const buildCharset = (options: PasswordOptions): string => {
  let charset = ""

  if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz"
  if (options.numbers) charset += "0123456789"
  if (options.symbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

  if (options.excludeSimilar) {
    charset = charset.replace(/[il1Lo0O]/g, "")
  }

  if (options.excludeAmbiguous) {
    charset = charset.replace(/[{}[\]()/\\'"~,;.<>]/g, "")
  }

  return charset
}
