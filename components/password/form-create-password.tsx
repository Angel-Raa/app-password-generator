"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, RefreshCw, Shield, Eye, EyeOff } from "lucide-react"
import { Security } from "./security"
import { useToast } from "@/hooks/use-toast"

export const FormCreatePassword = () => {
  const [password, setPassword] = useState("1hsgsy#a")
  const [length, setLength] = useState([12])
  const [showPassword, setShowPassword] = useState(true)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
    noDuplicate: false,
  })
  const { toast } = useToast()

  const generatePassword = () => {
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

    let newPassword = ""
    const usedChars = new Set()

    for (let i = 0; i < length[0]; i++) {
      let char
      do {
        char = charset.charAt(Math.floor(Math.random() * charset.length))
      } while (options.noDuplicate && usedChars.has(char) && usedChars.size < charset.length)

      if (options.noDuplicate) usedChars.add(char)
      newPassword += char
    }

    setPassword(newPassword)
  }

  const copyToClipboard = async () => {
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
  }

  const getPasswordStrength = () => {
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) return { text: "Débil", color: "bg-red-400" }
    if (score <= 4) return { text: "Media", color: "bg-yellow-400" }
    return { text: "Fuerte", color: "bg-green-400" }
  }

  const strength = getPasswordStrength()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto py-8 space-y-8">
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Password Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Genera contraseñas seguras y aleatorias con opciones personalizables
          </p>
        </header>

        {/* Generated Password Card */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-green-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Tu Password Generada:
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i <
                          Math.ceil(
                            (getPasswordStrength().text === "Fuerte"
                              ? 5
                              : getPasswordStrength().text === "Media"
                                ? 3
                                : 1) / 1,
                          )
                            ? strength.color
                            : "bg-gray-600"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs text-green-400 font-medium">{strength.text}</span>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-2xl font-mono text-white tracking-wider break-all">
                    {showPassword ? password : "•".repeat(password.length)}
                  </p>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                    onClick={copyToClipboard}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                  onClick={generatePassword}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generar Nueva
                </Button>
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  onClick={copyToClipboard}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Options */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              Opciones de Configuración
            </h3>

            {/* Password Length */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Longitud de la contraseña</label>
                <span className="text-sm font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">{length[0]}</span>
              </div>
              <Slider value={length} onValueChange={setLength} max={50} min={4} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>4</span>
                <span>50</span>
              </div>
            </div>

            {/* Character Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Incluir caracteres:</h4>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="uppercase"
                    checked={options.uppercase}
                    onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, uppercase: !!checked }))}
                  />
                  <label htmlFor="uppercase" className="text-sm text-gray-600 cursor-pointer">
                    Mayúsculas (A-Z)
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="lowercase"
                    checked={options.lowercase}
                    onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, lowercase: !!checked }))}
                  />
                  <label htmlFor="lowercase" className="text-sm text-gray-600 cursor-pointer">
                    Minúsculas (a-z)
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="numbers"
                    checked={options.numbers}
                    onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, numbers: !!checked }))}
                  />
                  <label htmlFor="numbers" className="text-sm text-gray-600 cursor-pointer">
                    Números (0-9)
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="symbols"
                    checked={options.symbols}
                    onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, symbols: !!checked }))}
                  />
                  <label htmlFor="symbols" className="text-sm text-gray-600 cursor-pointer">
                    Símbolos (!@#$%^&*)
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Opciones adicionales:</h4>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="exclude-similar"
                    checked={options.excludeSimilar}
                    onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, excludeSimilar: !!checked }))}
                  />
                  <label htmlFor="exclude-similar" className="text-sm text-gray-600 cursor-pointer">
                    Excluir caracteres similares
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="exclude-ambiguous"
                    checked={options.excludeAmbiguous}
                    onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, excludeAmbiguous: !!checked }))}
                  />
                  <label htmlFor="exclude-ambiguous" className="text-sm text-gray-600 cursor-pointer">
                    Excluir caracteres ambiguos
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="no-duplicate"
                    checked={options.noDuplicate}
                    onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, noDuplicate: !!checked }))}
                  />
                  <label htmlFor="no-duplicate" className="text-sm text-gray-600 cursor-pointer">
                    Sin caracteres duplicados
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Security />
      </div>
    </div>
  )
}
