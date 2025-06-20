export interface PasswordOptions {
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
  excludeSimilar: boolean
  excludeAmbiguous: boolean
  noDuplicate: boolean
}

export interface PasswordStrength {
  text: "Débil" | "Media" | "Fuerte"
  color: string
}

export interface PasswordHistory {
  id: string
  password: string
  createdAt: Date
  strength: PasswordStrength
  length: number
  options: PasswordOptions
}
