import { Shield } from "lucide-react"

export const PasswordHeader = () => {
  return (
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
  )
}
