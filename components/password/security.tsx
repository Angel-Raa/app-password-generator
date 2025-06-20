import { Card, CardContent } from "@/components/ui/card"
import { Shield, AlertTriangle, CheckCircle, Info } from "lucide-react"

export const Security = () => {
  const tips = [
    {
      icon: CheckCircle,
      title: "Usa contraseñas únicas",
      description: "Nunca reutilices la misma contraseña en múltiples sitios web.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Shield,
      title: "Habilita 2FA",
      description: "Activa la autenticación de dos factores cuando esté disponible.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: AlertTriangle,
      title: "Evita información personal",
      description: "No uses fechas de nacimiento, nombres o información personal.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Info,
      title: "Usa un gestor de contraseñas",
      description: "Considera usar un gestor de contraseñas para almacenar de forma segura.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-green-600" />
          Consejos de Seguridad
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => {
            const IconComponent = tip.icon
            return (
              <div key={index} className={`p-4 rounded-lg ${tip.bgColor} border border-opacity-20`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full bg-white shadow-sm`}>
                    <IconComponent className={`w-4 h-4 ${tip.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${tip.color} mb-1`}>{tip.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 mb-1">¿Qué hace una contraseña segura?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Al menos 12 caracteres de longitud</li>
                <li>• Mezcla de mayúsculas, minúsculas, números y símbolos</li>
                <li>• No contiene palabras del diccionario</li>
                <li>• No incluye información personal identificable</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
