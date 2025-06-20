"use server"

import prisma from "@/lib/database/prisma"
import type { PasswordOptions } from "@/types/password"
import { revalidatePath } from "next/cache"

export async function savePassword(data: {
  value: string
  label?: string
  length: number
  options: PasswordOptions
}) {
  try {
    const encryptedPassword = Buffer.from(data.value).toString("base64")

    const savedPassword = await prisma.password.create({
      data: {
        value: data.value,
        label: data.label || `Password ${new Date().toLocaleDateString()}`,
        encryptedPassword,
        length: data.length,
        hasLowerCase: data.options.lowercase,
        hasUpperCase: data.options.uppercase,
        hasNumbers: data.options.numbers,
        hasSymbols: data.options.symbols,
      },
    })

    revalidatePath("/passwords")

    return {
      success: true,
      data: savedPassword,
      message: "Contraseña guardada exitosamente",
    }
  } catch (error) {
    console.error("Error saving password:", error)
    return {
      success: false,
      message: "Error al guardar la contraseña",
    }
  }
}

export async function getPasswords() {
  try {
    const passwords = await prisma.password.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10, // Limitar a las últimas 10 contraseñas
    })

    return {
      success: true,
      data: passwords,
    }
  } catch (error) {
    console.error("Error fetching passwords:", error)
    return {
      success: false,
      data: [],
      message: "Error al obtener las contraseñas",
    }
  }
}

export async function deletePassword(id: number) {
  try {
    await prisma.password.delete({
      where: { id },
    })

    revalidatePath("/passwords")

    return {
      success: true,
      message: "Contraseña eliminada exitosamente",
    }
  } catch (error) {
    console.error("Error deleting password:", error)
    return {
      success: false,
      message: "Error al eliminar la contraseña",
    }
  }
}
