"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { deletePassword } from "@/app/actions/password-actions"

interface Password {
  id: number
  value: string
  label: string | null
  length: number
  hasLowerCase: boolean
  hasUpperCase: boolean
  hasNumbers: boolean
  hasSymbols: boolean
  createdAt: Date
}

interface PasswordHistoryProps {
  passwords: Password[]
  error?: string
}

export function PasswordHistory({ passwords, error }: PasswordHistoryProps) {
  const [visiblePasswords, setVisiblePasswords] = useState<Set<number>>(new Set())
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set())
  const { toast } = useToast()

  const togglePasswordVisibility = (id: number) => {
    const newVisible = new Set(visiblePasswords)
    if (newVisible.has(id)) {
      newVisible.delete(id)
    } else {
      newVisible.add(id)
    }
    setVisiblePasswords(newVisible)
  }

  const copyPassword = async (password: string) => {
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

  const handleDelete = async (id: number) => {
    setDeletingIds((prev) => new Set(prev).add(id))

    try {
      const result = await deletePassword(id)

      if (result.success) {
        toast({
          title: "¡Eliminado!",
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
        description: "Error inesperado al eliminar la contraseña",
        variant: "destructive",
      })
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (passwords.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">No hay contraseñas guardadas aún.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {passwords.map((password) => (
        <Card key={password.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{password.label}</span>
              <span className="text-sm text-gray-500">{new Date(password.createdAt).toLocaleDateString()}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-100 rounded p-3 font-mono">
                  {visiblePasswords.has(password.id) ? password.value : "•".repeat(password.length)}
                </div>
                <Button size="sm" variant="outline" onClick={() => togglePasswordVisibility(password.id)}>
                  {visiblePasswords.has(password.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button size="sm" variant="outline" onClick={() => copyPassword(password.value)}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(password.id)}
                  disabled={deletingIds.has(password.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-4 text-sm text-gray-600">
                <span>Longitud: {password.length}</span>
                <span>Mayúsculas: {password.hasUpperCase ? "✓" : "✗"}</span>
                <span>Minúsculas: {password.hasLowerCase ? "✓" : "✗"}</span>
                <span>Números: {password.hasNumbers ? "✓" : "✗"}</span>
                <span>Símbolos: {password.hasSymbols ? "✓" : "✗"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
