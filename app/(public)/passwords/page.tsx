import { getPasswords } from "@/app/actions/password-actions"
import { PasswordHistory } from "@/components/password/password-history"

export default async function PasswordsPage() {
  const result = await getPasswords()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Historial de Contraseñas</h1>
          <p className="text-gray-600">Gestiona tus contraseñas guardadas</p>
        </div>

        <PasswordHistory
          passwords={result.success ? result.data : []}
          error={result.success ? undefined : result.message}
        />
      </div>
    </div>
  )
}
