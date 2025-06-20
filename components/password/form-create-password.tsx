"use client"

import { useState } from "react"
import { PasswordHeader } from "./password-header"
import { PasswordDisplay } from "./password-display"
import { PasswordConfiguration } from "./password-configuration"
import { Security } from "./security"
import { usePasswordGenerator } from "@/hooks/use-password-generator"
import { usePasswordOptions } from "@/hooks/use-password-options"

export const FormCreatePassword = () => {
  const [showPassword, setShowPassword] = useState(true)
  const { options, updateOption, length, setLength } = usePasswordOptions()
  const { password, generatePassword, copyToClipboard, getPasswordStrength } = usePasswordGenerator(options, length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto py-8 space-y-8">
        <PasswordHeader />

        <PasswordDisplay
          password={password}
          showPassword={showPassword}
          onToggleVisibility={() => setShowPassword(!showPassword)}
          onCopy={copyToClipboard}
          onGenerate={generatePassword}
          strength={getPasswordStrength()}
        />

        <PasswordConfiguration
          length={length}
          onLengthChange={setLength}
          options={options}
          onOptionChange={updateOption}
        />

        <Security />
      </div>
    </div>
  )
}
