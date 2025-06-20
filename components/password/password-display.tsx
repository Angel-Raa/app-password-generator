"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, RefreshCw, Shield, Eye, EyeOff } from "lucide-react"
import { PasswordStrengthIndicator } from "./password-strength-indicator"
import type { PasswordStrength } from "@/types/password"

interface PasswordDisplayProps {
  password: string
  showPassword: boolean
  onToggleVisibility: () => void
  onCopy: () => void
  onGenerate: () => void
  strength: PasswordStrength
}

export const PasswordDisplay = ({
  password,
  showPassword,
  onToggleVisibility,
  onCopy,
  onGenerate,
  strength,
}: PasswordDisplayProps) => {
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-green-400 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Tu Password Generada:
            </p>
            <PasswordStrengthIndicator strength={strength} />
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
                onClick={onToggleVisibility}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={onCopy}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              onClick={onGenerate}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generar Nueva
            </Button>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              onClick={onCopy}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copiar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
